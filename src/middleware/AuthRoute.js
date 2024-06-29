import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthService from './AuthService';

const AuthRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    return AuthService.isAuthenticated(token) ? children : <Navigate to="/login" />;
};

export default AuthRoute;
