import EventService from '../../services/api/events/EventService';
import {
  FETCH_EVENT_START,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
  CLEAR_EVENT_STATE,
  POST_EVENT_START,
  POST_EVENT_SUCCESS,
  POST_EVENT_FAILURE,
  PATCH_EVENT_STATUS_START,
  PATCH_EVENT_STATUS_SUCCESS,
  PATCH_EVENT_STATUS_FAILURE,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
} from '../actions/actionTypes';

export const fetchEventsStart = () => ({
  type: FETCH_EVENT_START,
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENT_SUCCESS,
  payload: events,
});

export const fetchEventsFailure = error => ({
  type: FETCH_EVENT_FAILURE,
  payload: error,
});

export const clearEventsState = () => ({
  type: CLEAR_EVENT_STATE,
});

export const postEventStart = () => ({
  type: POST_EVENT_START,
});

export const postEventSuccess = response => ({
  type: POST_EVENT_SUCCESS,
  payload: response,
});

export const postEventFailure = error => ({
  type: POST_EVENT_FAILURE,
  payload: error,
});

export const patchEventStatusStart = () => ({
  type: PATCH_EVENT_STATUS_START,
});

export const patchEventStatusSuccess = response => ({
  type: PATCH_EVENT_STATUS_SUCCESS,
  payload: response,
});

export const patchEventStatusFailure = error => ({
  type: PATCH_EVENT_STATUS_FAILURE,
  payload: error,
});

export const deleteEventStart = () => ({
  type: DELETE_EVENT_START,
});

export const deleteEventSuccess = eventId => ({
  type: DELETE_EVENT_SUCCESS,
  payload: eventId,
});

export const deleteEventFailure = error => ({
  type: DELETE_EVENT_FAILURE,
  payload: error,
});

export const fetchEvents = () => async dispatch => {
  dispatch(fetchEventsStart());
  try {
    const response = await EventService.fetchEvents();
    dispatch(fetchEventsSuccess(response));
  } catch (error) {
    dispatch(fetchEventsFailure(error));
  }
};

export const fetchUserEvents = userId => async dispatch => {
  dispatch(fetchEventsStart());
  try {
    const response = await EventService.fetchUserEvents(userId);
    dispatch(fetchEventsSuccess(response));
  } catch (error) {
    dispatch(fetchEventsFailure(error));
  }
};

export const postEventRequest = eventData => async dispatch => {
  dispatch(postEventStart());

  const response = await EventService.postEvent(eventData);

  if (response.success) {
    dispatch(postEventSuccess(response.response));
  } else {
    dispatch(postEventFailure(response.error));
  }

  return response;
};

export const patchEventStatus = (eventId, eventData) => async dispatch => {
  dispatch(patchEventStatusStart());

  const response = await EventService.patchEventStatus(eventId, eventData);

  if (response.success) {
    dispatch(patchEventStatusSuccess(response.response));
  } else {
    dispatch(patchEventStatusFailure(response.error));
  }

  return response;
};

export const deleteEvent = eventId => async dispatch => {
  dispatch(deleteEventStart());

  try {
    const response = await EventService.deleteEvent(eventId);

    if (response.success) {
      dispatch(deleteEventSuccess(eventId));
    } else {
      dispatch(deleteEventFailure(response.error));
    }

    return response;
  } catch (error) {
    dispatch(deleteEventFailure(error));
  }
};
