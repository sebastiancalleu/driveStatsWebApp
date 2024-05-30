import { useGlobalStore } from "../stores/globalStore";

export const isAuthenticated = async (to, from, next) => {
    const authToken = localStorage.getItem('DSauthToken')
    if (authToken) {
        const globalStore = useGlobalStore();
        const authValidation = await globalStore.validateUser(authToken);
        authValidation === 'success' ? next() : next('/')
    } else {
        next('/')
    }
}
