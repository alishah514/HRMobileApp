import AnnouncementsService from '../../services/api/announcements/AnnouncementsService';
import {
  CLEAR_ANNOUNCEMENTS_STATE,
  POST_ANNOUNCEMENTS_START,
  POST_ANNOUNCEMENTS_SUCCESS,
  POST_ANNOUNCEMENTS_FAILURE,
  FETCH_ALL_ANNOUNCEMENTS_START,
  FETCH_ALL_ANNOUNCEMENTS_SUCCESS,
  FETCH_ALL_ANNOUNCEMENTS_FAILURE,
} from '../actions/actionTypes';

export const fetchAllAnnouncementsStart = () => ({
  type: FETCH_ALL_ANNOUNCEMENTS_START,
});

export const fetchAllAnnouncementsSuccess = announcements => ({
  type: FETCH_ALL_ANNOUNCEMENTS_SUCCESS,
  payload: announcements,
});

export const fetchAllAnnouncementsFailure = error => ({
  type: FETCH_ALL_ANNOUNCEMENTS_FAILURE,
  payload: error,
});

export const clearAnnouncementsState = () => ({
  type: CLEAR_ANNOUNCEMENTS_STATE,
});

export const postAnnouncementsStart = () => ({
  type: POST_ANNOUNCEMENTS_START,
});

export const postAnnouncementsSuccess = response => ({
  type: POST_ANNOUNCEMENTS_SUCCESS,
  payload: response,
});

export const postAnnouncementsFailure = error => ({
  type: POST_ANNOUNCEMENTS_FAILURE,
  payload: error,
});

export const fetchAllAnnouncements = () => async dispatch => {
  dispatch(fetchAllAnnouncementsStart());
  try {
    const response = await AnnouncementsService.fetchAnnouncements();
    dispatch(fetchAllAnnouncementsSuccess(response));
  } catch (error) {
    dispatch(fetchAllAnnouncementsFailure(error));
  }
};

export const postAnnouncements = data => async dispatch => {
  dispatch(postAnnouncementsStart());

  const response = await AnnouncementsService.postAnnouncement(data);

  if (response.success) {
    dispatch(postAnnouncementsSuccess(response.response));
  } else {
    dispatch(postAnnouncementsFailure(response.error));
  }

  return response;
};
