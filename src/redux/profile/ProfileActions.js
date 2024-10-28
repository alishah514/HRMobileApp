import ProfileService from '../../services/api/profile/ProfileService';
import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CLEAR_PROFILE_STATE,
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

export const clearProfileState = () => ({
  type: CLEAR_PROFILE_STATE,
});

export const fetchProfile = userId => async dispatch => {
  dispatch(fetchProfileStart());
  try {
    const response = await ProfileService.fetchUserProfile(userId);
    dispatch(fetchProfileSuccess(response));
  } catch (error) {
    dispatch(fetchProfileFailure(error));
  }
};
