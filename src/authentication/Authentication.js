export const isAuthenticated = () => {
    const userInfo = sessionStorage.getItem('userInfo');

    return userInfo ? true : false;
}
