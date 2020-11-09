export const authMiddleWare = (history) => {
    if (localStorage.getItem('AuthToken') === null) {
        history.push("/login");
    }
};