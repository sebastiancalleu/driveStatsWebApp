<script>
    import { mapActions, mapState } from 'pinia';
    import VehicleCard from './VehicleCard.vue';
    import { useVehiclesStore } from '../stores/vehiclesStore';

    export default {
        components: {
            VehicleCard,
        },
        data() {
            return {
                formActive: false,
                vehicleSelected: null,
                vehicleFormData: {
                    brand: null,
                    model: null,
                    year: null,
                },
                registrationDataValidationError: null,
            }
        },
        computed: {
            ...mapState(useVehiclesStore, ['vehicles'])
        },
        methods: {
            registerCar() {
                this.formActive = true;
                this.vehicleSelected = null;
            },
            sendVehicleData() {
                if (this.validateRegistrationData()) {
                    this.addVehicle(this.vehicleFormData)
                } else {
                    this.registrationDataValidationError = 'All registration fields should be filled'
                }
            },
            validateRegistrationData() {
                const {
                    brand, model, year
                } = this.vehicleFormData
                return (brand && model && year);
            },
            selectVehicle(uvid) {
                this.formActive = false;
                this.vehicleSelected = uvid;
            },
            ...mapActions(useVehiclesStore, ['addVehicle'])
        },
        watch: {
            vehicleFormData: {
                deep: true,
                handler() {
                    this.registrationDataValidationError = null;
                }
            },
        }
    }
</script>

<template>
    <div class="vehicles">
        <div class="section__header">
            <h1>My vehicles</h1>
        </div>
        <div class="section__body">
            <div class="vehicles__display">
                <div v-for="vehicle in vehicles">
                    <VehicleCard :uvid="vehicle.uvid" @click="selectVehicle(vehicle.uvid)"/>
                </div>
                <div class="register__vehicle">
                    <button class="add__buton" @click="registerCar">Add</button>
                </div>
            </div>
            <div v-if="formActive" class="vehicle__form">
                <h1>Vehicle Registration</h1>
                <div class="vehicle__input">
                    <div class="input__label">Brand</div>
                    <input class="input__field" type="text" v-model="vehicleFormData.brand">
                </div>
                <div class="vehicle__input">
                    <div class="input__label">Model</div>
                    <input class="input__field" type="text" v-model="vehicleFormData.model">
                </div>
                <div class="vehicle__input">
                    <div class="input__label">Year</div>
                    <input class="input__field" type="text" v-model="vehicleFormData.year">
                </div>
                <button class="register__button" @click="sendVehicleData">Register Vehicle</button>
                <div v-if="registrationDataValidationError" class="validation__error">
                    <h3>{{ registrationDataValidationError }}</h3>
                </div>
            </div>
            <div v-else class="vehicle__data">
                <h1>{{ vehicleSelected }}</h1>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .vehicles {
        .section__header {
            margin-left: 2rem;
        }
        .section__body {
            padding: 0 2rem;
            .vehicles__display {
                display: flex;
                overflow-x: auto;
                max-width: calc(100vw - 280px);
                .add__buton {
                    border: 1px solid lightgray;
                    border-radius: 10px;
                    height: 10rem;
                    margin: 1rem;
                    margin-left: 2rem;
                    width: 10rem;
                    font-size: 30px;
                    font-weight: 600;
                    background-color: transparent;
                    cursor: pointer;
                    &:hover {
                        background-color: #F6F6F6;
                    }
                    &:active {
                        font-size: 35px;
                    }
                }
            }
            .vehicle__form {
                display: flex;
                flex-direction: column;
                align-items: center;
                .vehicle__input {
                    display: flex;
                    margin-bottom: 2rem;
                    align-items: center;
                    .input__label {
                        width: 4rem;
                        margin-right: 1rem;
                    }
                    .input__field {
                        border: 1px solid lightgray;
                        border-radius: 2px;
                        height: 1.5rem;
                    }
                }
                .register__button {
                    height: 2rem;
                    width: 10rem;
                    background-color: #005BCF;
                    color: white;
                    font-weight: bold;
                    border: 1.5px solid lightgray;
                    border-radius: 10px;
                }
                .validation__error {
                    color: red;
                }
            }
        }
    }
</style>
