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
    <div class="statistics">
        <h1>Statistics component</h1>
    </div>
</template>
<style scoped lang="scss">
</style>
