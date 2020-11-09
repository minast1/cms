export const authMiddleWare = (history) => {
    const user = JSON.parse(localStorage.getItem('CMSData'));
    if (user === null) {
        history.push("/login");
    }
};