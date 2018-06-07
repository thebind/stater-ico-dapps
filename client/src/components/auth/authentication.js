/*
 * HOC
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../shared/history';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  }

  return connect(mapStateToProps)(Authentication);
}
