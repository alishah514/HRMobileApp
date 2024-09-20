import {
  LOGIN_USER,
  SET_USER_ROLE,
  SAVE_USER_DATA_AND_ROLE,
  CLEAR_USER_DATA,
  SAVE_PUNCH_IN_TIME,
  SAVE_PUNCH_OUT_TIME,
  SAVE_TIMER,
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

// Action to save punch-in time
export const savePunchInTime = time => ({
  type: SAVE_PUNCH_IN_TIME,
  payload: time,
});

// Action to save punch-out time
export const savePunchOutTime = time => ({
  type: SAVE_PUNCH_OUT_TIME,
  payload: time,
});

// Action to save timer value
export const saveTimer = time => ({
  type: SAVE_TIMER,
  payload: time,
});
