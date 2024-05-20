<script>
    import { mapState } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';
    import { signOut } from 'firebase/auth';
    import { auth } from '../firebase/firebase';
    import AddData from '@/components/AddData.vue'
    import Vehicles from '@/components/Vehicles.vue'
    import Statistics from '@/components/Statistics.vue'
    import Header from '@/components/Header.vue'
    import Sidebar from '@/components/Sidebar.vue';

    export default {
    data() {
        return {
            componentToRender: null
        }
    },
    components: {
        AddData,
        Vehicles,
        Statistics,
        Header,
        Sidebar
    },
    computed: {
        displayUsername() {
            return this.username.includes('@')
                ? this.username.split('@')[0]
                : this.username
        },
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
        <Header />
        <div class="dashboard__body">
            <Sidebar @renderComponent="renderComponent"/>
            <div class="body__main">
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
    flex-direction: column;
    height: 100%;
    width: 100vw;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    .dashboard__body {
        display: flex;
        flex-direction: row;
        height: 90%;
        .body__main {
            width: 100%;
        }
    }
}



</style>
