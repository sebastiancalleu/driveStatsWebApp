<script>
    import { mapState } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';

    export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState(useGlobalStore, ['mockData'])
    },
    methods: {
    }
}
</script>

<template>
    <div class="add__data">
        <div class="data__header">
            <h1>What kind of data do you want to register. . .</h1>
        </div>
        <div class="data__cards">
            <div class="fuel__data card">
                <h3>Fuel filling data</h3>
            </div>
            <div class="usage__data card">
                <h3>Only usage</h3>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.add__data {
    display: flex;
    flex-direction: column;
    .data__header {
        margin-bottom: 5rem;
    }
    .data__cards {
        width: 60%;
        align-self: center;
        display: flex;
        justify-content: space-around;
        .card {
            background-color: lightgray;
            border-radius: 10px;
            padding: 1rem;
            cursor: pointer;
        }
    }
}
</style>
