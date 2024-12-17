import GetUserService from '../../services/api/accounts/getUsers/GetUserService';
import SignupService from '../../services/api/accounts/signup/SignupService';
import UpdateUserService from '../../services/api/accounts/updateUser/UpdateUserService';
import {
  CLEAR_ALL_USERS_DATA,
  CLEAR_SPECIFIC_USER_DATA,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_SPECIFIC_USER_FAILURE,
  GET_SPECIFIC_USER_START,
  GET_SPECIFIC_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
} from '../actions/actionTypes';

export const fetchAllUsersStart = () => ({
  type: GET_ALL_USERS_START,
});

export const fetchAllUsersSuccess = userData => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: userData,
});

export const fetchAllUsersFailure = error => ({
  type: GET_ALL_USERS_FAILURE,
  payload: {error},
});

export const clearAllUsersData = () => ({
  type: CLEAR_ALL_USERS_DATA,
});

export const getSpecificUserStart = () => ({
  type: GET_SPECIFIC_USER_START,
});

export const getSpecificUserSuccess = userData => ({
  type: GET_SPECIFIC_USER_SUCCESS,
  payload: userData,
});

export const getSpecificUserFailure = error => ({
  type: GET_SPECIFIC_USER_FAILURE,
  payload: {error},
});

export const clearSpecificUserData = () => ({
  type: CLEAR_SPECIFIC_USER_DATA,
});

export const updateUserStart = () => ({
  type: UPDATE_USER_START,
});

export const updateUserSuccess = userData => ({
  type: UPDATE_USER_SUCCESS,
  payload: userData,
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const fetchAllUsers = () => async dispatch => {
  dispatch(fetchAllUsersStart());
  try {
    const response = await GetUserService.getAllUsers();

    dispatch(fetchAllUsersSuccess(response));
  } catch (error) {
    dispatch(fetchAllUsersFailure(error));
  }
};

export const getSpecificUser = userId => async dispatch => {
  dispatch(getSpecificUserStart());
  try {
    const response = await GetUserService.getSpecificUser(userId);
    if (response.success) {
      dispatch(getSpecificUserSuccess(response.data));
    } else {
      dispatch(getSpecificUserFailure(response.error));
    }
  } catch (error) {
    dispatch(
      getSpecificUserFailure(error.message || 'An unexpected error occurred.'),
    );
  }
};

export const updateOrEditUser = (userId, userData) => async dispatch => {
  dispatch(updateUserStart());

  try {
    const response = await UpdateUserService.updateUser(userId, userData);

    if (response.success) {
      dispatch(updateUserSuccess(response.response));
      return {success: true, data: response.response};
    } else {
      dispatch(updateUserFailure(response.error));
      return {success: false, error: response.error};
    }
  } catch (error) {
    dispatch(
      updateUserFailure(error.message || 'An unexpected error occurred.'),
    );
    return {
      success: false,
      error: error.message || 'An unexpected error occurred.',
    };
  }
};
