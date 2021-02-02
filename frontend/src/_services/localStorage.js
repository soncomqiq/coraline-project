const AUTH_STATUS = "AUTH_STATUS";

const getAuthStatus = () => {
    return localStorage.getItem(AUTH_STATUS);
};

const removeAuthStatus = () => {
    localStorage.removeItem(AUTH_STATUS);
};

const setAuthStatus = () => {
    localStorage.setItem(AUTH_STATUS, "TRUE");
};

module.exports = {
    getAuthStatus,
    removeAuthStatus,
    setAuthStatus
};