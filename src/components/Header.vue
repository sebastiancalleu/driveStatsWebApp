<script>
    import { mapState } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';
    import Menu from './Menu.vue';

    export default {
    components: {
        Menu
    },
    computed: {
        displayUsername() {
            return this.username.includes('@')
                ? this.username.split('@')[0]
                : this.username
        },
        ...mapState(useGlobalStore, ['username'])
    },
}
</script>

<template>
    <div class="dashboard__header">
        <div class="header__title">
            DriveStats<sup>®</sup>
        </div>
        <h2 class="header__username"> {{ displayUsername }} </h2>
        <Menu/>
    </div>
</template>
<style scoped lang="scss">
.dashboard__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #535981;
    height: 3rem;
    color: white;
    .header__title {
        font-size: 25px;
        font-weight: 700;
        margin-left: 1rem;
    }
    .header__username {
        font-size: 20px;
        font-weight: 400;
        margin-left: auto;
        margin-right: 2rem;
    }
}
</style>
