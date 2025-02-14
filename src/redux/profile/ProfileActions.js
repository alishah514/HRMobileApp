import ProfileService from '../../services/api/profile/ProfileService';
import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CLEAR_PROFILE_STATE,
  PATCH_PROFILE_START,
  PATCH_PROFILE_SUCCESS,
  PATCH_PROFILE_FAILURE,
  FETCH_ALL_PROFILE_START,
  FETCH_ALL_PROFILE_SUCCESS,
  FETCH_ALL_PROFILE_FAILURE,
  POST_PROFILE_START,
  POST_PROFILE_SUCCESS,
  POST_PROFILE_FAILURE,
  DELETE_PROFILE_START,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAILURE,
} from '../actions/actionTypes';

export const fetchProfileStart = () => ({type: FETCH_PROFILE_START});
export const fetchProfileSuccess = profile => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: profile,
});
export const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});
export const fetchAllProfileStart = () => ({type: FETCH_ALL_PROFILE_START});
export const fetchAllProfileSuccess = profile => ({
  type: FETCH_ALL_PROFILE_SUCCESS,
  payload: profile,
});
export const fetchAllProfileFailure = error => ({
  type: FETCH_ALL_PROFILE_FAILURE,
  payload: error,
});
export const clearProfileState = () => ({type: CLEAR_PROFILE_STATE});
export const postProfileStart = () => ({type: POST_PROFILE_START});
export const postProfileSuccess = response => ({
  type: POST_PROFILE_SUCCESS,
  payload: response,
});
export const postProfileFailure = error => ({
  type: POST_PROFILE_FAILURE,
  payload: error,
});
export const patchProfileStart = () => ({type: PATCH_PROFILE_START});
export const patchProfileSuccess = response => ({
  type: PATCH_PROFILE_SUCCESS,
  payload: response,
});
export const patchProfileFailure = error => ({
  type: PATCH_PROFILE_FAILURE,
  payload: error,
});
export const deleteProfileStart = () => ({type: DELETE_PROFILE_START});
export const deleteProfileSuccess = response => ({
  type: DELETE_PROFILE_SUCCESS,
  payload: response,
});
export const deleteProfileFailure = error => ({
  type: DELETE_PROFILE_FAILURE,
  payload: error,
});

export const fetchAllProfile = () => async dispatch => {
  dispatch(fetchAllProfileStart());
  try {
    const response = await ProfileService.fetchAllProfile();
    dispatch(fetchAllProfileSuccess(response));
  } catch (error) {
    dispatch(fetchAllProfileFailure(error));
  }
};

export const fetchProfile = userId => async dispatch => {
  dispatch(fetchProfileStart());
  try {
    const response = await ProfileService.fetchUserProfile(userId);
    dispatch(fetchProfileSuccess(response));
  } catch (error) {
    dispatch(fetchProfileFailure(error));
  }
};

export const postProfile = profileData => async dispatch => {
  dispatch(postProfileStart());
  try {
    const response = await ProfileService.postEmployeeProfile(profileData);
    if (response.success) {
      dispatch(postProfileSuccess(response));
      return response;
    } else {
      dispatch(postProfileFailure(response.error));
      return {success: false, error: response.error};
    }
  } catch (error) {
    const errorMessage = error.message || 'An unexpected error occurred.';
    dispatch(postProfileFailure(errorMessage));
    return {success: false, error: errorMessage};
  }
};

export const updateProfile = (profileId, profileData) => async dispatch => {
  dispatch(patchProfileStart());
  try {
    const response = await ProfileService.updateOrEditOProfile(
      profileId,
      profileData,
    );
    if (response.success) {
      dispatch(patchProfileSuccess(response));
      return {success: true, data: response.response};
    } else {
      dispatch(patchProfileFailure(response.error));
      return {success: false, error: response.error};
    }
  } catch (error) {
    const errorMessage = error.message || 'An unexpected error occurred.';
    dispatch(patchProfileFailure(errorMessage));
    return {success: false, error: errorMessage};
  }
};

export const deleteProfile = profileId => async dispatch => {
  dispatch(deleteProfileStart());
  try {
    const response = await ProfileService.deleteUserProfile(profileId);
    if (response.success) {
      dispatch(deleteProfileSuccess(response));
      return {success: true};
    } else {
      dispatch(deleteProfileFailure(response.error));
      return {success: false, error: response.error};
    }
  } catch (error) {
    const errorMessage = error.message || 'An unexpected error occurred.';
    dispatch(deleteProfileFailure(errorMessage));
    return {success: false, error: errorMessage};
  }
};
