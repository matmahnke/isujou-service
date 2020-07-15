import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './../services/auth'
import NotFound from './../components/NotFound/NotFound'

import Auth from '../pages/auth/auth'
import Home from './../pages/home/Home'
import Login from './../pages/login/Login'
import Logout from './../pages/logout/Logout'
import Register from './../pages/register/Register'
import Profile from './../pages/profile/Profile'
import Settings from './../pages/settings/Settings'
import Rules from '../pages/rules/Rules'
import FeedBack from './../pages/feedback/FeedBack'

// Anúncios
import Portfolio from './../pages/adverts/portfolio/Portfolio'
import PortfolioAdvert from './../pages/adverts/portfolio/Advert'
import Adverts from './../pages/adverts/Adverts'
import Advert from './../pages/adverts/Advert'

// Imóveis
import Properties from './../pages/properties/Properties'
import Property from './../pages/properties/Property'

// Propostas
import Proposal from './../pages/proposal/Proposal'
import Proposals from './../pages/proposal/Proposals'
import Details from './../pages/proposal/Details'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={props => (
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
        )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/rules' component={Rules} />
            <Route exact path='/auth' component={Auth} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile/:id' component={props => <Profile {...props} />} />
            <Route exact path='/adverts' component={Portfolio} />
            <Route exact path='/advert/view/:id' component={props => <PortfolioAdvert {...props} />} />
            <PrivateRoute exact path='/settings' component={Settings} />
            <PrivateRoute exact path='/adverts/mine' component={Adverts} />
            <PrivateRoute exact path='/advert/new' component={() => <Advert type="new" />} />
            <PrivateRoute exact path='/advert/edit/:id' component={props => <Advert type="edit" {...props} />} />
            <PrivateRoute exact path='/properties' component={Properties} />
            <PrivateRoute exact path='/property/new' component={() => <Property type="new" />} />
            <PrivateRoute exact path='/property/edit/:id' component={props => <Property type="edit" {...props} />} />
            <PrivateRoute exact path='/proposal/new/:id' component={props => <Proposal {...props} />} />
            <PrivateRoute exact path='/proposals/mine' component={Proposals} />
            <PrivateRoute exact path='/proposal/detail/:id' component={props => <Details {...props} />} />
            <PrivateRoute exact path='/feedback/:proposal/:id' component={props => <FeedBack {...props} />} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;