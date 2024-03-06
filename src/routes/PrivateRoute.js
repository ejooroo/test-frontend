import React from 'react';
import { Route } from 'react-router-dom';
import { getToken } from '../service/AuthService';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();

    if (getToken()) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
        navigate('/login');
        return null;
    }
}

export default PrivateRoute;



