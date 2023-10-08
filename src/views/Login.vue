<script>
    import { auth } from '../firebase/firebase';
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { mapActions } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';

    const provider = new GoogleAuthProvider();

    export default {
    data() {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        loginWithGoogleProvider() {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                    console.log({result, token})
                    this.setUsername(result.user.displayName, result.user.uid)
                    this.$router.push('/Dashboard');
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
        },
        ...mapActions(useGlobalStore, ['setUsername'])
    },
}
</script>

<template>
    <div class="login">
        <h1 class="login__header">Authenticate Yourself!</h1>

        <div class="userdata__container">
            <h2>Username: </h2>
            <input type="text" v-model="username">
        </div>
        <div class="userdata__container">
            <h2>Password: </h2>
            <input type="text" v-model="password">
        </div>

        <button @click="loginEmailAndPassword()">Login</button>        
        <div class="login__google__provider">
            <button @click="loginWithGoogleProvider()">Login with Google</button>
        </div>
    </div>
</template>
<style>
    .login__header {
        margin-bottom: 5rem;
    }
    .userdata__container {
    display: flex;
    }
</style>
