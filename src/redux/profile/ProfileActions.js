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
} from '../actions/actionTypes';

export const fetchProfileStart = () => ({
  type: FETCH_PROFILE_START,
});

export const fetchProfileSuccess = profile => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

export const fetchAllProfileStart = () => ({
  type: FETCH_ALL_PROFILE_START,
});

export const fetchAllProfileSuccess = profile => ({
  type: FETCH_ALL_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchAllProfileFailure = error => ({
  type: FETCH_ALL_PROFILE_FAILURE,
  payload: error,
});

export const clearProfileState = () => ({
  type: CLEAR_PROFILE_STATE,
});

export const patchProfileStart = () => ({
  type: PATCH_PROFILE_START,
});

export const patchProfileSuccess = response => ({
  type: PATCH_PROFILE_SUCCESS,
  payload: response,
});

export const patchProfileFailure = error => ({
  type: PATCH_PROFILE_FAILURE,
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

export const patchProfile = (profileId, profileData) => async dispatch => {
  dispatch(patchProfileStart());
  try {
    const response = await ProfileService.patchEditProfile(
      profileId,
      profileData,
    );
    if (response.success) {
      dispatch(patchProfileSuccess(response));
      return response;
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
