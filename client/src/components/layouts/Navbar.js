import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return (
        <li className="nav-item">
          <NavLink to="/signout">Sign Out</NavLink>
        </li>
      );
    } else {
      // show a link to sign in or sign up
      return [
        <li key={1}>
          <NavLink to="/signin">Login</NavLink>
        </li>,
        <li key={2}>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav>
        <NavLink to="/">Bind Boiler Plate</NavLink>
        <ul className="right">{this.renderLinks()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navbar);
