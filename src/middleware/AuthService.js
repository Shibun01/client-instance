class AuthService {
    static isAuthenticated(token) {
        return !!token;
    }
}

export default AuthService;
