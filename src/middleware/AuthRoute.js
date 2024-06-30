import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthService from './AuthService';

const AuthRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);

    if (!token || !AuthService.isAuthenticated(token)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthRoute;
