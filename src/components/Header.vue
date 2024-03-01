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
    background-color: rgb(0, 128, 255);
    height: 4rem;
    color: white;
    .header__title {
        font-size: 40px;
        font-weight: 700;
    }
    .header__username {
        margin-left: auto;
        margin-right: 2rem;
    }
}
</style>
