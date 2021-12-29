import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <CalendarScreen/>
                </Route>
                <Route exact path="/Login">
                    <LoginScreen/>
                </Route>

                <Redirect to="/" />
            </Switch>
        </Router>
    )
}
