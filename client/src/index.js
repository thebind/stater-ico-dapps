/*
 * Materialize css
 * http://materializecss.com/getting-started.html
 * import 'materialize-css/dist/css/materialize.min.css';
 * 
 * Bootstratp css
 * https://github.com/facebook/create-react-app/issues/301
 * https://stackoverflow.com/questions/40037657/how-to-include-bootstrap-css-and-js-in-reactjs-app
 * import 'bootstrap/dist/css/bootstrap.css';
 * 
 */
import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './shared/store';
import App from './app';

import { AUTH_USER } from './actions/types';
import { Provider } from 'react-redux';

import { setCurrentUser } from './actions/authAction';
import setAuthToken from './shared/setAuthToken';
import jwt_decode from 'jwt-decode';

// Get Token from local storage
const token = localStorage.getItem('token');

// If we have a token, consider the user to be signed in
if (token) {
  // Set auth token header auth
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
