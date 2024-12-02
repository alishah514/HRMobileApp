import SettingsService from '../../services/api/settings/SettingsService';
import {
  FETCH_SETTINGS_START,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE,
  CLEAR_SETTINGS_STATE,
  POST_SETTINGS_START,
  POST_SETTINGS_SUCCESS,
  POST_SETTINGS_FAILURE,
} from '../actions/actionTypes';

export const fetchSettingsStart = () => ({
  type: FETCH_SETTINGS_START,
});

export const fetchSettingsSuccess = settings => ({
  type: FETCH_SETTINGS_SUCCESS,
  payload: settings,
});

export const fetchSettingsFailure = error => ({
  type: FETCH_SETTINGS_FAILURE,
  payload: error,
});

export const clearSettingsState = () => ({
  type: CLEAR_SETTINGS_STATE,
});

export const postSettingsStart = () => ({
  type: POST_SETTINGS_START,
});

export const postSettingsSuccess = response => ({
  type: POST_SETTINGS_SUCCESS,
  payload: response,
});

export const postSettingsFailure = error => ({
  type: POST_SETTINGS_FAILURE,
  payload: error,
});

export const fetchSettings = () => async dispatch => {
  dispatch(fetchSettingsStart());
  try {
    const response = await SettingsService.fetchSettings();
    dispatch(fetchSettingsSuccess(response));
  } catch (error) {
    dispatch(fetchSettingsFailure(error));
  }
};

export const fetchAdminSettings = adminId => async dispatch => {
  dispatch(fetchSettingsStart());
  try {
    const response = await SettingsService.fetchAdminSettings(adminId);
    dispatch(fetchSettingsSuccess(response));
  } catch (error) {
    dispatch(fetchSettingsFailure(error));
  }
};

export const postSettingsRequest = settingsData => async dispatch => {
  dispatch(postSettingsStart());

  const response = await SettingsService.postSettings(settingsData);

  if (response.success) {
    dispatch(postSettingsSuccess(response.response));
  } else {
    dispatch(postSettingsFailure(response.error));
  }

  return response;
};
