import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/index';
import { compose } from 'redux';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit } = this.props;

    const renderInput = field => (
      <div>
        <input
          {...field.input}
          type={field.type}
          autoComplete={field.autoComplete}
        />
        {field.meta.touched && field.meta.error}
        <span>{field.meta.error}</span>
      </div>
    );

    return (
      // Redux-Form - [Field]
      // https://redux-form.com/7.2.0/docs/api/field.md/#2-a-stateless-function
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <label>Email</label>
          <Field
            name="email"
            type="email"
            component={renderInput}
            autoComplete="email"
          />
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component={renderInput}
            autoComplete="current-password"
          />
        </div>
        {this.renderAlert()}
        <button action="submit">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errorMessage: state.auth.error
  };
}

// https://redux-form.com/7.2.0/docs/api/field.md/#2-a-stateless-function
export default compose(
  reduxForm({
    form: 'signin',
    fields: ['email', 'password']
  }),
  connect(mapStateToProps, actions)
)(Signin);
