import { TEST_DISPATCH } from './types';

export const testuser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
