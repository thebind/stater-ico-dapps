import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducers';
import profileReducer from './profileReducers';
import errorReducer from './errorReducers';

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer
});

export default rootReducer;
