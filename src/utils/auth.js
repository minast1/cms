
export const authMiddleWare = (history) => {
    if (localStorage.getItem('AuthToken') === null) {
        history.push("/login");
    }
};

export const handleLogout = (history) => {
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('UserType');
    history.push('/login');
}