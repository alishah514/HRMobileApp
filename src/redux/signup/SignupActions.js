import SignupService from '../../services/api/accounts/signup/SignupService';
import {
  SIGNUP_USER_START,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from '../actions/actionTypes';
import {saveUserDataAndRole} from '../login/LoginActions';

export const signupUserStart = () => ({
  type: SIGNUP_USER_START,
});

export const signupUserSuccess = userData => ({
  type: SIGNUP_USER_SUCCESS,
  payload: userData,
});

export const signupUserFailure = error => ({
  type: SIGNUP_USER_FAILURE,
  payload: error,
});

export const signupUser = userData => async dispatch => {
  dispatch(signupUserStart());

  try {
    const response = await SignupService.postNewUser(userData);

    if (response.success) {
      dispatch(signupUserSuccess(response.response));

      return response.response;
    } else {
      dispatch(signupUserFailure(response.error));
      throw new Error(response.error);
    }
  } catch (error) {
    dispatch(
      signupUserFailure(error.message || 'An unexpected error occurred.'),
    );
    throw error;
  }
};
