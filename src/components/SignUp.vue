<script>
    import { mapActions } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';
    import { isAuthenticated } from '@/authentication/Authentication'
import { routerKey } from 'vue-router';

    export default {
    data() {
        return {
            username: null,
            email: null,
            password: null,
            creationError: null,
        }
    },
    methods: {
        async validateAccountCreation() {
            if(this.username && this.email && this.password) {
                this.creationError = null;
                await this.createAccount(
                    this.username,
                    this.email,
                    this.password
                );
            } else {
                this.creationError = 'All the fields should be filled';
            }

            if (isAuthenticated) {
                this.$router.push('/Dashboard')
            }
        },
        ...mapActions(useGlobalStore, ['setUsername', 'createAccount'])
    },
}
</script>

<template>
    <div class="login__sign__in">
        <div class="data__header">
            <h1>
                Create Account
            </h1>
        </div>
        <div class="userdata__container">
            <input class="data__input" type="text" placeholder="Name" v-model="username">
        </div>
        <div class="userdata__container">
            <input class="data__input" type="text" placeholder="Email" v-model="email">
        </div>
        <div class="userdata__container">
            <input class="data__input" type="text" placeholder="Password" v-model="password">
        </div>
        <div class="login__submit">
            <button @click="validateAccountCreation()">Create</button>
        </div>
        <div class="error__message">
            <h4>{{ creationError }}</h4>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .login__sign__in {
        display: flex;
        flex-direction: column;
        align-items: center;
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
        .error__message {
            color: red;
        }
    }
</style>
