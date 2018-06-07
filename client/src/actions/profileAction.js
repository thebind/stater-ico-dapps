import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

import axios from '../shared/axios';
import history from '../shared/history';

// GET: Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// POST: Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard/profile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile Lodading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// export const updateProfile = fields => {
//   return dispatch => {
//     axios
//       .post('/api/profile/update', {
//         lastName: fields.lastName,
//         firstName: fields.firstName
//       })
//       .then(res => {
//         dispatch({ type: PROFILE_UPDATE });
//       })
//       .catch(err => {
//         dispatch({
//           type: PROFILE_ERROR,
//           payload: err
//         });
//       });
//   };
// };
