import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './../services/auth.js'
import NotFound from './../components/NotFound/NotFound'

import Auth from '../pages/auth/auth.js'
import Home from './../pages/home/Home'
import Login from './../pages/login/Login'
import Logout from './../pages/logout/Logout'
import Register from './../pages/register/Register'
import Profile from './../pages/profile/Profile'
import Proposal from './../pages/proposal/Proposal'
import Proposals from './../pages/proposal/Proposals'

// Anúncios
import Portfolio from './../pages/adverts/portfolio/Portfolio'
import PortfolioAdvert from './../pages/adverts/portfolio/Advert'
import Adverts from './../pages/adverts/Adverts'
import Advert from './../pages/adverts/Advert'

// Imóveis
import Properties from './../pages/properties/Properties'
import Property from './../pages/properties/Property'

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
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile/:id' component={Profile} />
            <Route exact path='/adverts' component={Portfolio} />
            <Route exact path='/adverts/mine' component={Adverts} />
            <Route exact path='/advert/view/:id' component={PortfolioAdvert} />
            <Route exact path='/advert/new' component={() => <Advert type="new"/>} />
            <Route exact path='/advert/edit/:id' component={() => <Advert type="edit"/>} />
            <Route exact path='/properties' component={Properties} />
            <Route exact path='/property/new' component={() => <Property type="new"/>} />
            <Route exact path='/property/edit/:id' component={() => <Property type="edit"/>} />
            <Route exact path='/proposal/new/:id' component={Proposal} />
            <Route exact path='/proposals/mine' component={Proposals} />
            <Route component={NotFound} />
            <PrivateRoute exact path='/privateRouteExample' component={() => <h1>this page is private</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;