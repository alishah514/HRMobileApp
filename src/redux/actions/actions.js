import {
  LOGIN_USER,
  SET_USER_ROLE,
  SAVE_USER_DATA_AND_ROLE,
  CLEAR_USER_DATA,
} from './actionTypes';

export const loginUser = () => ({
  type: LOGIN_USER,
});

export const setUserRole = role => ({
  type: SET_USER_ROLE,
  payload: role,
});

export const saveUserDataAndRole = (accessToken, userId, isLoggedIn, role) => ({
  type: SAVE_USER_DATA_AND_ROLE,
  payload: {accessToken, userId, isLoggedIn, role},
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});
