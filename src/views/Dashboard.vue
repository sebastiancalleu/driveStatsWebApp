<script>
    import { mapState } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';
    import { signOut } from 'firebase/auth';
    import { auth } from '../firebase/firebase';
    import AddData from '@/components/AddData.vue'
    import Vehicles from '@/components/Vehicles.vue'
    import Statistics from '@/components/Statistics.vue'

    export default {
    data() {
        return {
            componentToRender: null
        }
    },
    components: {
        AddData,
        Vehicles,
        Statistics
    },
    computed: {
        ...mapState(useGlobalStore, ['username'])
    },
    methods: {
        renderComponent(component) {
            this.componentToRender = component
        },
        signOutm() {
            signOut(auth)
        }
    }
}
</script>

<template>
    <div class="dashboard">
        <div class="dashboard__card">
            <div class="dashboard__left__sidebar">
                <div class="sidebar__heading">
                    <h3>Hi</h3>
                    <h2 class="username__heading"> {{ username }} </h2>
                    <h5>What do you want to do today</h5>
                </div>
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
                <div class="logout">
                    <!-- <button @click="signOutm()">sign out</button> -->
                </div>
            </div>
            <div class="dashboard__body">
                <div  v-if="componentToRender">
                    <component :is="componentToRender" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">

.dashboard {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/images/dashboard-wallpaper.jpg');
    background-size: cover;
    height: 100vh;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    .dashboard__card {
        height: 50rem;
        width: 90rem;
        border-radius: 40px;
        background-color: rgb(255 255 255 / 0.7);
        backdrop-filter: blur(10px);
        background-blend-mode: overlay;
        display: flex;
        justify-content: space-between;
        padding: 2rem;
        .dashboard__left__sidebar {
            background-color: rgb(106, 123, 133);
            color: white;
            border-radius: 30px;
            padding: 1rem;
            margin-right: 2rem;
            flex: 1;
            .sidebar__heading {
                margin-bottom: 10rem;
            }
            .action__button {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 4rem;
                cursor: pointer;
                &:hover {
                    background-color: white;
                    color: black;
                    border-radius: 10px;
                }
                &:active {
                    font-size: 20px;
                }
            }
        }
        .dashboard__body {
            background-color: transparent;
            flex: 4;
            .slide-fade-enter-active {
                transition: all 0.3s ease-out;
            }
            .slide-fade-leave-active {
                transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
            }
            .slide-fade-enter-from,
            .slide-fade-leave-to {
                transform: translateX(20px);
                opacity: 0;
            }
        }
    }
}



</style>
