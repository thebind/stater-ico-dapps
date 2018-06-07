import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  SET_AUTH_REDIRECT_PATH
} from '../actions/types';

import { updateObject } from '../shared/utility';

const intialState = {
  error: null,
  message: null,
  authenticated: false,
  authRedirectPath: '/',
  user: {}
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return updateObject(state, {
        authenticated: true,
        user: action.payload
      });
    case UNAUTH_USER:
      return updateObject(state, { authenticated: false });
    case AUTH_ERROR:
      return updateObject(state, { error: action.payload });
    case FETCH_MESSAGE:
      return updateObject(state, { message: action.payload });
    case SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.path });
    default:
      return state;
  }
};

export default reducer;
