<script>
    export default {

    methods: {
        renderComponent(component) {
            this.$emit('renderComponent', component)
        },
    }
}
</script>

<template>
    <div class="sidebar">
        <div class="sidebar__actions">
            <div class="add_data action__button" @click="renderComponent('AddData')">
                <font-awesome-icon class="sidebar__icon" icon="plus" />
            </div>
            <div class="vehicles action__button" @click="renderComponent('Vehicles')">
                <font-awesome-icon class="sidebar__icon" icon="car-side" />
            </div>
            <div class="statistics action__button" @click="renderComponent('Statistics')">
                <font-awesome-icon class="sidebar__icon" icon="chart-simple" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.sidebar {
    display: flex;
    flex-direction: column;
    min-width: 10vw;
    height: calc(100vh - 48px);
    border-right: 1px solid lightgray;
    .sidebar__actions {
        display: flex;
        flex-direction: column;
        height: auto;
        background-color: rgb(240, 240, 240);
        height: inherit;
        font-weight: lighter;
        color: rgb(64, 64, 64);
        .action__button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 5rem;
            border-bottom: 1px solid lightgray;
            cursor: pointer;
            .sidebar__icon {
                height: 40px;
            }
        }
    }
}




</style>
