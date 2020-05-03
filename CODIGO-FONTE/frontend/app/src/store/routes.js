import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './../services/auth.js';
import NotFound from './../components/NotFound/NotFound';

import Home from './../pages/home';
import Login from './../pages/login';
import Register from './../pages/register';
import Adverts from './../pages/adverts';
import Advert from './../pages/advert';
import Properties from './../pages/properties';
import Profile from './../pages/profile';
import Auth from '../pages/auth/auth.js';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={props => (
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
        )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/auth' component={Auth} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/adverts' component={Adverts} />
            <Route exact path='/advert/:id' component={Advert} />
            <Route exact path='/properties' component={Properties} />
            <Route exact path='/profile/:id' component={Profile} />
            <Route component={NotFound} />
            <PrivateRoute exact path='/privateRouteExample' component={() => <h1>this page is private</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;