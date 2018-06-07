import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profileAction';
import Spinner from '../../UI/Spinner';

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { profile, loading } = this.props.profile;

    // Profile COntens
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        profileContent = (
          <div>
            <p>The Document is submitted for your KYC Process</p>
            <p>{profile.Profile.firstName}</p>
            <p>{profile.Profile.lastName}</p>
          </div>
        );
      } else {
        // User is logined in but has no profile
        profileContent = (
          <div>
            <p> Welcome </p>
            <p>You have not yet setup a kyc info, please add info</p>
            <Link to="/dashboard/profile/create-profile">
              FILL KYC/AML FORM
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <h1>Profile</h1>
        {profileContent}
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
