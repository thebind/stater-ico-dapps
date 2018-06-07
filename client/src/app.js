import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';

import AppRouter from './routers/AppRouter';

class App extends Component {
  render() {
    return <AppRouter />;
  }
}
export default connect(null, actions)(App);
