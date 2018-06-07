import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../UI/TextFieldGroup';
import TextAreaFieldGroup from '../../UI/TextAreaFieldGroup';
import InputGroup from '../../UI/InputGroup';
import SelectListroup from '../../UI/SelectListGroup';
import { createProfile } from '../../../actions/profileAction';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.validation });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    // Propaties
    const profileData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };

    // Create Profile
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Create Your KYC</h1>
        <p>Please, Please, Please, submit your Info</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="*first name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            error={errors.firstName}
            info="This is for first Name"
          />
          <TextFieldGroup
            placeholder="*last name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
            error={errors.lastName}
            info="This is for last Name"
          />
          <small>* is required</small>
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
