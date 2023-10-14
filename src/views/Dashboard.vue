<script>
    import { mapState } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';
    import { signOut } from 'firebase/auth';
    import { auth } from '../firebase/firebase';

    export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(useGlobalStore, ['username', 'uid'])
    },
    methods: {
        signOutm() {
            signOut(auth)
        }
    }
}
</script>

<template>
    <div class="dashboard">
        <h1 class="username__heading"> {{ username }} </h1>

        <h3>your uid is: {{ uid }}</h3>

        <button @click="signOutm()">sign out</button>
    </div>
</template>
<style scoped>
    .login__header {
        margin-bottom: 5rem;
    }
    .userdata__container {
    display: flex;
    }
</style>
