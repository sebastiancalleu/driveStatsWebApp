<script>
    import { mapActions, mapState } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';
    import { signOut } from 'firebase/auth';
    import { auth } from '../firebase/firebase';
    import AddData from '@/components/AddData.vue'
    import Vehicles from '@/components/Vehicles.vue'
    import Statistics from '@/components/Statistics.vue'
    import Header from '@/components/Header.vue'
    import Sidebar from '@/components/Sidebar.vue';
import { useVehiclesStore } from '../stores/vehiclesStore';

    export default {
    data() {
        return {
            componentToRender: null
        }
    },
    components: {
        Vehicles,
        Header,
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
        },
        ...mapActions(useVehiclesStore, ['getVehicles'])
    },
    async created() {
        this.getVehicles();
    }
}
</script>

<template>
    <div class="dashboard">
        <Header />
        <div class="dashboard__body">
            <div class="body__main">
                <Vehicles />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">

.dashboard {
    display: flex;
    flex-direction: column;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    .dashboard__body {
        display: flex;
        flex-direction: row;
    }
}



</style>
