import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, role, currentRole, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                currentRole === role ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default ProtectedRoute;
