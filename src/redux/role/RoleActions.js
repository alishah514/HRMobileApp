import {SET_USER_ROLE} from '../actions/actionTypes';

export const setUserRole = role => ({
  type: SET_USER_ROLE,
  payload: role,
});
