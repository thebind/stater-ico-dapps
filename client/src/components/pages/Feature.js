import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { Link, withRouter } from 'react-router-dom';

class Feature extends Component {
  componentWillMount() {
    //    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        {this.props.message}
        <div>Feature Page</div>
        <Link to="/dashboard">dashboard for ethereum example</Link>
        <br />
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
