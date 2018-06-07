import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lottery from '../ico-comps/TestContract';
import { Link, withRouter } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <p>Dashboard</p>
        <TestContract />
        <br />
        <Link to="/dashboard/profile">profile page</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
