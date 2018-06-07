import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/index';
import { compose } from 'redux';
import { connect } from 'react-redux';

const renderInput = field => (
  <div>
    <input
      {...field.input}
      type={field.type}
      autoComplete={field.autoComplete}
    />
    {field.meta.touched &&
      field.meta.error && <span className="error">{field.meta.error}</span>}
  </div>
);

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <label>Email</label>
          <Field
            name="email"
            component={renderInput}
            type="email"
            autoComplete="email"
          />
          <label>Password</label>
          <Field
            name="password"
            component={renderInput}
            type="password"
            autoComplete="new-password"
          />
          <label>Confirm Password</label>
          <Field
            name="passwordConfirm"
            component={renderInput}
            type="password"
            autoComplete="new-password"
          />
        </div>
        {this.renderAlert()}
        <button action="submit">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confrimation';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

const mapStateToProps = state => ({
  auth: state.auth,
  errorMessage: state.auth.error
});

export default compose(
  reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate: validate
  }),
  connect(mapStateToProps, actions)
)(Signup);
