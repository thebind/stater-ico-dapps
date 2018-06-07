import React, { Component } from "react";
//import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions/index";

class Verify extends Component {
  componentDidMount() {
    const secretToken = this.props.match.params.id;
    this.props.verifyEmail(secretToken);
  }

  // <Redirect to="/signin"/>

  render() {
    return <div>Email is verified. Now You may login.</div>;
  }
}

export default connect(null, actions)(Verify);
