import { GET_PROFILE, PROFILE_LOADING } from '../actions/types';

import { updateObject } from '../shared/utility';

const intialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return updateObject(state, {
        loading: true
      });
    case GET_PROFILE:
      return updateObject(state, {
        profile: action.payload,
        loading: false
      });
    default:
      return state;
  }
}
