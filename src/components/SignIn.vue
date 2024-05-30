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
        <div class="social__login__label"><span class="label__text">or</span></div>
        <div class="login__submit">
            <button class="google__loging" @click="loginWithGoogleProvider()">
                <img class="google__logo" src="../assets/logos/pngwing.com.png" width="30" alt="google-logo">
                &nbsp;Continue with Google
            </button>
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
                &:focus-visible {
                    outline: none;
                    border: 2px solid #2C8FFF;
                    border-radius: 10px;
                }

            }
        }
        .label__text {
            font-weight: bold;
        }
        .login__submit {
            width: 100%;
            button {
                margin: 1rem 0;
                background-color: #646DAB; /* Green */
                border: 1px solid darkgray;
                border-radius: 10px;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                font-weight: bold;
                width: inherit;
                max-height: 3rem;
                cursor: pointer;
                &:active {
                    font-size: 12px;
                    padding: 17px 37px;
                }
            }
            .google__loging {
                background-color: white;
                color: black;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
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
