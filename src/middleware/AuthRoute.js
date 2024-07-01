import React from 'react';
import { useSelector } from 'react-redux';
import AuthService from './AuthService';

const AuthRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);

    if (!token || !AuthService.isAuthenticated(token)) {
        return window.location.replace('/login')
    }

    return children;
};

export default AuthRoute;
