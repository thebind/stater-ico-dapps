// Rendering Layer Control
// React Router

import React, { Component } from 'react';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import history from '../shared/history';
import RequireAuth from '../components/auth/authentication';

// Layout Parts
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';

// Account Signup & Signin
import Signin from '../components/auth/signin';
import Signup from '../components/auth/singup';
import Signout from '../components/auth/signout';
import Verify from '../components/auth/verify';

// Auth Free Pages
import Landing from '../components/pages/Landing';
import HelpPage from '../components/pages/HelpPage';
import NotFound404 from '../components/NotFound404';
import Contact from '../components/pages/Contact';
import TempolaryEntry from '../components/auth/tempolaryentry';

// Auth Pages
import Dashborad from '../components/dashboard/Dashboard';
import Profile from '../components/dashboard/profile/Profile';
import CreateProfile from '../components/dashboard/profile/CreateProfile';
import Auth from '../components/auth/Auth';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Router history={history}>
          <React.Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/verify/:id" component={Verify} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signout" component={Signout} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/help" component={HelpPage} />
              <Route exact path="/tempolaryentry" component={TempolaryEntry} />
              <Route exact path="/auth" component={RequireAuth(Auth)} />
              <Route
                exact
                path="/dashboard"
                component={RequireAuth(Dashborad)}
              />
              <Route
                exact
                path="/dashboard/profile"
                component={RequireAuth(Profile)}
              />
              <Route
                exact
                path="/dashboard/profile/create-profile"
                component={RequireAuth(CreateProfile)}
              />
              <Route exact path="/" component={Landing} />
              <Route component={NotFound404} />
            </Switch>
            <Footer />
          </React.Fragment>
        </Router>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(AppRouter);

// import PrivateRoute from './PrivateRoute';
// <Switch>
// <PrivateRoute
//   exact
//   path="/dashboard/profile"
//   component={Profile}
// />
// </Switch>
