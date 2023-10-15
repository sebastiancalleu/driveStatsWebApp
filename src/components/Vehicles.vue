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
    <div class="vehicles">
        <h1>Vehicles component</h1>
    </div>
</template>
<style scoped lang="scss">
</style>
