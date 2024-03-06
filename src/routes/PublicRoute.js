import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getToken } from '../service/AuthService';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            element={!getToken() ? <Component /> : <Navigate replace to="/premium-content" />}
        />
    );
};

export default PublicRoute;



