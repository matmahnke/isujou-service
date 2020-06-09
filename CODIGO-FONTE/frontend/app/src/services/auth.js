export const isAuthenticated = () => {
    var token = localStorage.getItem('Authorization')
    return token != null;
};