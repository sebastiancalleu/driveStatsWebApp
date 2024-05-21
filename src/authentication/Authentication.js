import { useGlobalStore } from "../stores/globalStore";

export const isAuthenticated = async (to, from, next) => {
    const authToken = localStorage.getItem('DSauthToken')
    if (authToken) {
        const globalStore = useGlobalStore();
        await globalStore.validateUser(authToken);
        next()
    } else {
        next('/')
    }
}
