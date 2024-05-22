<script>
    import { mapState } from 'pinia';
    import { useVehiclesStore } from '../stores/vehiclesStore';

    export default {
        props: {uvid: String},
        data() {
            return {
            }
        },
        computed: {
            vehicleData() {
                return this.getVehicle(this.uvid)
            },
            ...mapState(useVehiclesStore, ['getVehicle']),
        },
        methods: {
        }
    }
</script>

<template>
    <div class="vehicle__card">
        <div class="card__header">
            <h3 class="header">{{ vehicleData.brand }} {{ vehicleData.model }}</h3>
        </div>
        <div class="card__subheading">
            <h5>{{ vehicleData.year }}</h5>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .vehicle__card {
        border: 2px solid lightgray;
        border-radius: 10px;
        height: 7rem;
        width: 20rem;
        margin: 1rem 1rem 1rem 0;
        cursor: pointer;
        .card__header {
            margin-left: 2rem;
            font-size: 20px;
            font-weight: 700;
            .header {
                margin-bottom: 0;
            }
        }
        .card__subheading {
            margin-left: 2rem;
        }
        &:hover {
            background-color: #F6F6F6;
        }
    }
</style>
