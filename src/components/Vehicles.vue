<script>
    import { mapActions, mapState } from 'pinia';
    import VehicleCard from './VehicleCard.vue';
    import mileageChart from './mileageChart.vue';
    import { useVehiclesStore } from '../stores/vehiclesStore';
    import { useMileageStore } from '../stores/mileageStore'
    import moment from 'moment';
    import _ from 'lodash';

    export default {
        components: {
            VehicleCard,
            mileageChart
        },
        data() {
            return {
                formActive: false,
                selectedVehicleId: null,
                vehicleFormData: {
                    brand: null,
                    model: null,
                    year: null,
                },
                vehicleMileageData: {
                    date: moment().format("YYYY-MM-DD"),
                    mileage: null,
                    mileageUnit: 'km',
                    gas: null,
                    gasUnit: 'Gal',
                    mileageMeasure: 'Abs'
                },
                registrationDataValidationError: null,
                mileageDataValidationError: null,
            }
        },
        computed: {
            selectedVehicle() {
                return this.getVehicle(this.selectedVehicleId);
            },
            vehicleMileage() {
                if (this.selectedVehicleId) {
                    return this.getVehicleMileage(this.selectedVehicleId)
                } else {
                    return false
                }
            },
            ...mapState(useVehiclesStore, ['vehicles', 'getVehicle']),
            ...mapState(useMileageStore, ['getVehicleMileage'])
        },
        methods: {
            registerCar() {
                this.formActive = true;
                this.selectedVehicleId = null;
            },
            sendVehicleRegistrationData() {
                if (this.validateRegistrationData()) {
                    this.addVehicle(this.vehicleFormData)
                } else {
                    this.registrationDataValidationError = 'All registration fields should be filled'
                }
            },
            validateRegistrationData() {
                return !Object.values(this.vehicleFormData).some((value) => _.isNil(value) || value === '');
            },
            sendVehicleMileageData() {
                if (this.validateMileageData()) {
                    this.addMileageData(this.selectedVehicleId, this.vehicleMileageData)
                } else {
                    this.mileageDataValidationError = 'All required fields should be filled'
                }
            },
            validateMileageData() {
                return (this.selectedVehicleId && !Object.values(this.vehicleMileageData).some((value) => _.isNil(value) || value === ''));
            },
            selectVehicle(uvid) {
                this.formActive = false;
                this.selectedVehicleId = uvid;
            },
            formatDataToDisplay(field) {
                return this.vehicleMileage.map((mileageRegister) => mileageRegister[field])
            },
            formatLabelsToDisplay() {
                return this.vehicleMileage.map((mileageRegister) => moment(mileageRegister.date).format('MMM-DD'))
            },
            ...mapActions(useVehiclesStore, ['addVehicle']),
            ...mapActions(useMileageStore, ['addMileageData'])
        },
        watch: {
            vehicleFormData: {
                deep: true,
                handler() {
                    this.registrationDataValidationError = null;
                }
            },
            vehicleMileageData: {
                deep: true,
                handler() {
                    this.mileageDataValidationError = null;
                }
            }
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
                <button class="register__button" @click="sendVehicleRegistrationData">Register Vehicle</button>
                <div v-if="registrationDataValidationError" class="validation__error">
                    <h3>{{ registrationDataValidationError }}</h3>
                </div>
            </div>
            <div v-else-if="selectedVehicleId" class="vehicle__data">
                <div class="vehicle__information">
                    <div class="card__header">
                        <h2 class="header">{{ selectedVehicle?.brand }} {{ selectedVehicle?.model }}</h2>
                    </div>
                    <div class="card__subheading">
                        <h3>{{ selectedVehicle?.year }}</h3>
                    </div>
                    <div class="data__input__container">
                        <div class="vehicle__input">
                            <div class="input__label">Date</div>
                            <input class="input__field date" type="date" v-model="vehicleMileageData.date">
                        </div>
                        <div class="vehicle__input">
                            <div class="input__label">Gas</div>
                            <input class="input__field" type="number" v-model="vehicleMileageData.gas">
                            <div class="input__companion">Unit</div>
                            <select class="input__field companion" v-model="vehicleMileageData.gasUnit">
                                <option value="Gal">Gal</option>
                                <option value="L">L</option>
                            </select>
                        </div>
                        <div class="vehicle__input">
                            <div class="input__label">Mileage</div>
                            <input class="input__field" type="number" v-model="vehicleMileageData.mileage">
                            <div class="input__companion">Unit</div>
                            <select class="input__field companion" v-model="vehicleMileageData.mileageUnit">
                                <option value="km">km</option>
                                <option value="mi">mi</option>
                            </select>
                            <div class="input__companion">Measure</div>
                            <select class="input__field companion" v-model="vehicleMileageData.mileageMeasure">
                                <option value="Abs">Abs</option>
                                <option value="Rel">Rel</option>
                            </select>
                        </div>
                        <button class="register__button" @click="sendVehicleMileageData">Add Data</button>
                        <div v-if="mileageDataValidationError" class="validation__error">
                            <h3>{{ mileageDataValidationError }}</h3>
                        </div>
                    </div>
                </div>
                <div class="vehicle__data__display">
                    <h2>Data Charts</h2>
                    <div v-if="vehicleMileage" class="charts__container">
                        <mileageChart chartTitle="Mileage" :values="formatDataToDisplay('mileage')" :labels="formatLabelsToDisplay()" :key="vehicleMileage"/>
                        <mileageChart chartTitle="Gas" :values="formatDataToDisplay('gas')" :labels="formatLabelsToDisplay()" :key="vehicleMileage"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .vehicles {
        width: 100vw;
        padding-bottom: 3rem;
        .section__header {
            margin-left: 1rem;
        }
        .section__body {
            padding: 0 1rem;
            .vehicles__display {
                display: flex;
                overflow-x: auto;
                scroll-behavior: smooth;
                max-width: calc(100vw - 64px);
                .add__buton {
                    border: 2px solid lightgray;
                    border-radius: 10px;
                    margin: 1rem;
                    height: 7rem;
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
            .vehicle__data {
                .vehicle__information {
                    .data__input__container {
                        .vehicle__input {
                            display: flex;
                            margin-bottom: 2rem;
                            align-items: center;
                            .input__label {
                                width: 4rem;
                                margin-right: 1rem;
                            }
                            .input__companion {
                                margin: 0 1rem;
                                &.button {
                                    height: 2rem;
                                    width: 4rem;
                                    background-color: #F2EEEE;
                                    color: black;
                                    font-weight: bold;
                                    border: 1.5px solid lightgray;
                                    border-radius: 15px;
                                    cursor: pointer;
                                }
                            }
                            .input__field {
                                border: 1px solid lightgray;
                                border-radius: 2px;
                                height: 1.5rem;
                                width: 10rem;
                                &.companion {
                                    width: auto;
                                    height: 1.7rem;
                                }
                                &.date {
                                    height: 2rem;
                                }
                            }
                        }
                        .register__button {
                            height: 2rem;
                            width: 6rem;
                            background-color: #005BCF;
                            color: white;
                            font-weight: bold;
                            border: 1.5px solid lightgray;
                            border-radius: 10px;
                            cursor: pointer;
                        }
                        .validation__error {
                            color: red;
                        }
                    }
                }
                .vehicle__data__display {
                    margin: 1rem 0rem;
                    padding: 1rem 3rem;
                    background-color: #F3F2F2;
                    border-radius: 20px;
                    @media only screen and (max-width: 600px) {
                        padding: 1rem 1rem;
                    }
                    .charts__container {
                        display: flex;
                        justify-content: space-between;
                        @media only screen and (max-width: 900px) {
                            display: flex;
                            flex-direction: column;
                        }
                    }
                }
            }
        }
    }
</style>
