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
                <h3>Add data</h3>
            </div>
            <div class="vehicles action__button" @click="renderComponent('Vehicles')">
                <h3>My vehicles</h3>
            </div>
            <div class="statistics action__button" @click="renderComponent('Statistics')">
                <h3>My statistics</h3>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.sidebar {
    display: flex;
    flex-direction: column;
    min-width: 20vw;
    height: 100%;
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
            height: 6rem;
            border-bottom: 1px solid lightgray;
            cursor: pointer;
        }
    }
}




</style>
