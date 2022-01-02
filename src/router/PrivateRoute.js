import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';


export const PrivateRoute = ({isAuthenticaded, 
    component: Component, 
    ...rest}) => {
    return (
        <Route {...rest}
        component = {(props) =>(
            (isAuthenticaded)
                ? (<Component {...props} />)
                : (<Redirect to = "Login" />)
        )} />
    )
}

PrivateRoute.propTypes = {
    isAuthenticaded: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}