import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../service/AuthService';

const PrivateWrapper = () => {
    const token = getToken();
    return token ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateWrapper;
