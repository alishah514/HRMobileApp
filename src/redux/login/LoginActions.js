import {
  LOGIN_USER,
  CLEAR_USER_DATA,
  SAVE_USER_DATA_AND_ROLE,
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
