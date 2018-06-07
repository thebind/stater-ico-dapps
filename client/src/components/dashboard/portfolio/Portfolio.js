//
// Please, Please, Check Redux-From version 6 out here!
// Redux-Form
// https://redux-form.com/7.3.0/docs/migrationguide.md/#-code-v6-code-
// https://redux-form.com/6.6.3/examples/syncvalidation/
//
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../../actions/index';
import { compose } from 'redux';
import { connect } from 'react-redux';

//
// @Desc  Define stateless component to render input and errors
//
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

//
// @Desc  Warning
//
const warn = values => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...';
  }
  return warnings;
};

//
// @Desc Validation
//
const validate = formProps => {
  const errors = {};
  if (!formProps.firstName) {
    errors.firstName = 'Required';
  }
  if (!formProps.lastName) {
    errors.lastName = 'Required';
  }
  if (!formProps.age) {
    errors.age = 'Required';
  } else if (isNaN(Number(formProps.age))) {
    errors.age = 'Must be a number';
  } else if (Number(formProps.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  }
  return errors;
};

//
// @Desc  Class extended from Component
//
class Portfolio extends Component {
  // @desc  handling the value from submit from
  // @parm  form
  // @note  calling the Action Creator
  handleFormSubmit = formProps => {
    this.props.updateProfile(formProps);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <Field
            name="firstName"
            type="text"
            component={renderField}
            label="First Name"
          />
          <Field
            name="lastName"
            type="text"
            component={renderField}
            label="Last Name"
          />
          <Field name="age" type="text" component={renderField} label="age" />
          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

//
// @Desc
//
const mapStateToProps = state => ({
  message: 'state.'
});

//
// @Desc
//
// export default compose(
//   reduxForm({
//     form: '',
//     validate: validate,
//     warn
//   }),
//   connect(mapStateToProps, actions)
// )(Portfolio);

export default reduxForm({
  form: 'Portfolio',
  validate,
  warn
})(Portfolio);

// REDUX-FORM
// https://stackoverflow.com/questions/46042096/should-i-use-redux-form-store-instead-of-component-state-and-redux-custom-store

// https://stackoverflow.com/questions/39839779/best-way-to-submit-form-data-with-react-redux

// データチェックが入る場合 vlidation
// C: 登録が必要な場合
// R: 参照が必要な場合
// U: 更新が必要な場合
// D: 削除が必要な場合
// CRUD: 登録・参照・更新・削除が必要な場合

// REDUX-FORM: フォームの検証用
//
