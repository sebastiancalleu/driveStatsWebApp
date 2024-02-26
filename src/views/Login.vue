<script>
    import { auth } from '../firebase/firebase';
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { mapActions } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';
    import SignIn from '../components/SignIn.vue';
    import SignUp from '../components/SignUp.vue';

    const provider = new GoogleAuthProvider();

    export default {
    components: {
        SignIn,
        SignUp
    },
    data() {
        return {
            signView: 'SignIn',
            username: null,
            password: null,
        }
    },
    created() {
        this.validateSession();
    },
    methods: {
        validateSession() {
            const authToken = sessionStorage.getItem('DSauthToken')
        },
        setLoginView(view) {
            this.signView = view;
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
                <component :is="signView"></component>
                <div class="login__view__switcher">
                    <h3
                        :class="{ active: signView === 'SignIn'}"
                        @click="setLoginView('SignIn')"
                    >
                        Sign In
                    </h3>
                    <h3
                        :class="{ active: signView === 'SignUp'}"
                        @click="setLoginView('SignUp')"
                    >
                        Sign Up
                    </h3>
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
                background-color: rgb(255 255 255 / 0.1);
                backdrop-filter: blur(20px);
                background-blend-mode: overlay;
                border-radius: 0px 30px 30px 0px;
                padding: 2rem 3rem;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .login__view__switcher {
                    color: white;
                    width: 60%;
                    margin-top: 2rem;
                    align-self: center;
                    justify-content: space-around;
                    display: flex;
                    cursor: pointer;
                    .active {
                        border-bottom: solid 1px white;
                    }
                    h3 {
                        &:active {
                            font-size: 20px;
                        }
                    }

                }
            }
        }
    }
</style>
