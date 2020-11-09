export const authMiddleWare = (history) => {
    const authToken = localStorage.getItem('CMSToken');
    if (authToken === null) {
        history.push("/");
    }
};