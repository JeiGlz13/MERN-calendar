import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../redux/actions/authActions';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (checking) {
        return (
            <h1>
                Espere...
            </h1>
        )
    }

    return (
        <Router>
            <Switch>
                
                <PrivateRoute exact path="/" 
                    component={CalendarScreen}
                    isAuthenticaded={!!uid} />

                <PublicRoute exact path="/Login" 
                    component={LoginScreen}
                    isAuthenticated = {!!uid} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}
