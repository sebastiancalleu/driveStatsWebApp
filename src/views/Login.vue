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
        <div class="login__card">
            <div class="login__message">
                <div class="login__logo">
                    <h4 class="login__header">DriveStats<sup>®</sup></h4>
                </div>
                <div class="welcome__mesagge">
                    <h4 class="login__header">Nice to see you again</h4>
                    <h1 class="login__header">WELCOME BACK</h1>
                </div>
                <div class="login__disclaimer">
                    <p>DriveStats® is a web application designed to help drivers with the data handle of his car usage.</p>
                </div>
            </div>
            <div class="login__data">
                <div class="data__header">
                    <h1>
                        Login Account
                    </h1>
                </div>
                <div class="userdata__container">
                    <input class="data__input" type="text" placeholder="Username / Email" v-model="username">
                </div>
                <div class="userdata__container">
                    <input class="data__input" type="text" placeholder="Password" v-model="password">
                </div>

                <div class="login__submit">
                    <button @click="loginEmailAndPassword()">Login</button>
                </div>

                <h5>Or authenticate using your google account</h5>

                <div class="login__google__provider">
                    <img src="../assets/logos/pngwing.com.png" width="30" alt="google-logo" @click="loginWithGoogleProvider()">
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle, rgba(0,0,0,0.01) 0%, rgba(255,255,255,0.1) 80%), url('../assets/images/image.png');
        background-size: cover;
        filter: grayscale(10%);
        height: 100vh;
        .login__card {
            border-radius: 20px;
            height: 40rem;
            width: 60rem;
            display: flex;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            .login__message {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                padding: 3rem;
                background: url('../assets/images/colorfull-wallpaper.png');
                background-size: cover;
                flex: 1;
                border-radius: 30px 0px 0px 30px;
                .welcome__mesagge {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 10rem;
                }
                .login__disclaimer {
                    color: white;
                    margin-top: auto;
                    font-size: 11px;
                }
                .login__header {
                    margin: 0;
                    color: white;
                }
                h1 {
                    font-size: 45px;
                }
            }
            .login__data {
                display: flex;
                flex-direction: column;
                align-items: center;
                backdrop-filter: blur(20px);
                background-blend-mode: overlay;
                border-radius: 0px 30px 30px 0px;
                padding: 3rem;
                flex: 1;
                color: white;
                .data__header {
                    margin-top: 2rem;
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
                    }
                }
            }
        }
    }
</style>
