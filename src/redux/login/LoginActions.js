import {Alert} from 'react-native';
import LoginService from '../../services/api/accounts/login/LoginService';
import {
  LOGIN_USER,
  CLEAR_USER_DATA,
  SAVE_USER_DATA_AND_ROLE,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actions/actionTypes';

export const loginUser = token => ({
  type: LOGIN_USER,
  payload: {token},
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

export const saveUserDataAndRole = (accessToken, userId, isLoggedIn, role) => ({
  type: SAVE_USER_DATA_AND_ROLE,
  payload: {accessToken, userId, isLoggedIn, role},
});

export const loginUserStart = () => ({
  type: LOGIN_USER_START,
});

export const loginUserSuccess = userData => ({
  type: LOGIN_USER_SUCCESS,
  payload: userData,
});

export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: {error},
});

export const loginAction = (email, password, navigation) => async dispatch => {
  dispatch(loginUserStart());
  try {
    const response = await LoginService.login(email, password, navigation);
    if (response.success) {
      const {token, id, role} = response.data;
      dispatch(loginUserSuccess(response.data));
      dispatch(saveUserDataAndRole(token, id, true, role));
    } else {
      dispatch(loginUserFailure(response.error));
    }
  } catch (error) {
    dispatch(
      loginUserFailure(error.message || 'An unexpected error occurred.'),
    );
  }
};
