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
                    brand: 'toyota',
                    model: 'lc200',
                    year: '2024',
                }
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
                this.addVehicle(this.vehicleFormData)
            },
            selectVehicle(uvid) {
                this.formActive = false;
                this.vehicleSelected = uvid;
            },
            ...mapActions(useVehiclesStore, ['addVehicle'])
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
                <button @click="sendVehicleData">Register car</button>
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
                .add__buton {
                    border: 1px solid lightgray;
                    border-radius: 10px;
                    height: 10rem;
                    margin-left: 2rem;
                    width: 10rem;
                    font-size: 30px;
                    font-weight: 600;
                    background-color: transparent;
                    cursor: pointer;
                    &:hover {
                        background-color: #EEEEEE;
                    }
                    &:active {
                        font-size: 35px;
                    }
                }
            }
        }
    }
</style>
