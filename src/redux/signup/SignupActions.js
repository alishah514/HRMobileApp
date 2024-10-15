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

export const signupAction = (userData, navigation) => async dispatch => {
  dispatch(signupUserStart());

  try {
    const response = await SignupService.signup(userData, navigation);

    if (response.success) {
      const {id, token, role} = response.data.fields;

      dispatch(signupUserSuccess(response.data));

      dispatch(
        saveUserDataAndRole(
          token.stringValue,
          id.integerValue,
          true,
          role.stringValue,
        ),
      );
    } else {
      dispatch(signupUserFailure(response.error));
    }
  } catch (error) {
    dispatch(
      signupUserFailure(error.message || 'An unexpected error occurred.'),
    );
  }
};
