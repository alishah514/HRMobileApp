import AnnouncementsService from '../../services/api/announcements/AnnouncementsService';
import {
  CLEAR_ANNOUNCEMENTS_STATE,
  POST_ANNOUNCEMENTS_START,
  POST_ANNOUNCEMENTS_SUCCESS,
  POST_ANNOUNCEMENTS_FAILURE,
  FETCH_ALL_ANNOUNCEMENTS_START,
  FETCH_ALL_ANNOUNCEMENTS_SUCCESS,
  FETCH_ALL_ANNOUNCEMENTS_FAILURE,
  PATCH_ANNOUNCEMENTS_START,
  PATCH_ANNOUNCEMENTS_SUCCESS,
  PATCH_ANNOUNCEMENTS_FAILURE,
  DELETE_ANNOUNCEMENTS_START,
  DELETE_ANNOUNCEMENTS_SUCCESS,
  DELETE_ANNOUNCEMENTS_FAILURE,
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

export const patchAnnouncementsStart = () => ({
  type: PATCH_ANNOUNCEMENTS_START,
});

export const patchAnnouncementsSuccess = response => ({
  type: PATCH_ANNOUNCEMENTS_SUCCESS,
  payload: response,
});

export const patchAnnouncementsFailure = error => ({
  type: PATCH_ANNOUNCEMENTS_FAILURE,
  payload: error,
});

export const deleteAnnouncementsStart = () => ({
  type: DELETE_ANNOUNCEMENTS_START,
});

export const deleteAnnouncementsSuccess = leaveId => ({
  type: DELETE_ANNOUNCEMENTS_SUCCESS,
  payload: leaveId,
});

export const deleteAnnouncementsFailure = error => ({
  type: DELETE_ANNOUNCEMENTS_FAILURE,
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

export const patchAnnouncement =
  (announcementId, announcementData) => async dispatch => {
    dispatch(patchAnnouncementsStart());

    const response = await AnnouncementsService.patchAnnouncement(
      announcementId,
      announcementData,
    );

    if (response.success) {
      dispatch(patchAnnouncementsSuccess(response.response));
    } else {
      dispatch(patchAnnouncementsFailure(response.error));
    }

    return response;
  };

export const deleteAnnouncement = announcementId => async dispatch => {
  dispatch(deleteAnnouncementsStart());

  try {
    const response = await AnnouncementsService.deleteAnnouncement(
      announcementId,
    );

    if (response.success) {
      dispatch(deleteAnnouncementsSuccess(announcementId));
    } else {
      dispatch(deleteAnnouncementsFailure(response.error));
    }

    return response;
  } catch (error) {
    dispatch(deleteAnnouncementsFailure(error));
  }
};
