<script>
    import { auth } from '../firebase/firebase';
    import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
    import { mapActions } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';

    const provider = new GoogleAuthProvider();

    export default {
    data() {
        return {
            username: null,
            password: null,
            loginStatus: null,
            error: null,
            errorMessages: {
                401: 'password provided is wrong',
                404: 'user not found'
            }
        }
    },
    methods: {
        async loginWithGoogleProvider() {
            await signInWithRedirect(auth, provider);
        },
        async loginEmailAndPassword() {
            if (this.username && this.password) {
                this.loginStatus = await this.loginUser(this.username, this.password)
            }

            if (this.loginStatus.status !== 'success') {
                this.error = true;
            }
        },
        ...mapActions(useGlobalStore, ['setUsername', 'loginUser', 'loginUserProvider'])
    },
    watch: {
        username: {
            handler() {
                this.error = false
            }
        },
        password: {
            handler() {
                this.error = false
            }
        }

    }
}
</script>

<template>
    <div class="login__sign__in">
        <div class="data__header">
            <h1>
                Login Account
            </h1>
        </div>
        <div class="userdata__container">
            <input class="data__input" type="text" placeholder="Email" v-model="username">
        </div>
        <div class="userdata__container">
            <input class="data__input" type="text" placeholder="Password" v-model="password">
        </div>
        <div v-if="this.error" class="error__container">
            <h5> {{ errorMessages[loginStatus.code] }}</h5>
        </div>
        <div class="login__submit">
            <button @click="loginEmailAndPassword()">Login</button>
        </div>
        <h5>Or authenticate using your google account</h5>
        <div class="login__google__provider">
            <img class="google__logo" src="../assets/logos/pngwing.com.png" width="30" alt="google-logo" @click="loginWithGoogleProvider()">
        </div>
    </div>
</template>
<style scoped lang="scss">
    .login__sign__in {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: white;
        .data__header {
            margin-bottom: 5rem;
        }
        .userdata__container {
            display: flex;
            width: 100%;
            .data__input {
                background-color: rgb(250, 250, 250);
                width: 100%;
                box-sizing: border-box;
                border: none;
                border-left: 5px solid black;
                font-size: 16px;
                padding: 12px 10px 12px 10px;
                margin-bottom: 2rem;
            }
        }
        .login__submit {
            button {
                background-color: white; /* Green */
                border: none;
                border-radius: 30px;
                color: black;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                cursor: pointer;
                &:active {
                    font-size: 12px;
                    padding: 17px 37px;
                }
            }
        }
        .google__logo {
            cursor: pointer;
            &:active {
                width: 35px;
            }
        }
    }
</style>
