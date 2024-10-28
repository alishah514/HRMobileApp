import LeaveService from '../../services/api/leave/LeaveService';
import {
  FETCH_LEAVES_START,
  FETCH_LEAVES_SUCCESS,
  FETCH_LEAVES_FAILURE,
  CLEAR_LEAVES_STATE,
  POST_LEAVE_START,
  POST_LEAVE_SUCCESS,
  POST_LEAVE_FAILURE,
  PATCH_LEAVE_STATUS_START,
  PATCH_LEAVE_STATUS_SUCCESS,
  PATCH_LEAVE_STATUS_FAILURE,
} from '../actions/actionTypes';

export const fetchLeavesStart = () => ({
  type: FETCH_LEAVES_START,
});

export const fetchLeavesSuccess = leaves => ({
  type: FETCH_LEAVES_SUCCESS,
  payload: leaves,
});

export const fetchLeavesFailure = error => ({
  type: FETCH_LEAVES_FAILURE,
  payload: error,
});

export const clearLeavesState = () => ({
  type: CLEAR_LEAVES_STATE,
});

export const postLeaveStart = () => ({
  type: POST_LEAVE_START,
});

export const postLeaveSuccess = response => ({
  type: POST_LEAVE_SUCCESS,
  payload: response,
});

export const postLeaveFailure = error => ({
  type: POST_LEAVE_FAILURE,
  payload: error,
});

export const patchLeaveStatusStart = () => ({
  type: PATCH_LEAVE_STATUS_START,
});

export const patchLeaveStatusSuccess = response => ({
  type: PATCH_LEAVE_STATUS_SUCCESS,
  payload: response,
});

export const patchLeaveStatusFailure = error => ({
  type: PATCH_LEAVE_STATUS_FAILURE,
  payload: error,
});

export const fetchLeaves = () => async dispatch => {
  dispatch(fetchLeavesStart());
  try {
    const response = await LeaveService.fetchLeaves();
    dispatch(fetchLeavesSuccess(response));
  } catch (error) {
    dispatch(fetchLeavesFailure(error));
  }
};

export const fetchUserLeaves =
  (userId, options = {}) =>
  async dispatch => {
    dispatch(fetchLeavesStart());
    try {
      const response = await LeaveService.fetchUserLeaves(userId, options);
      dispatch(fetchLeavesSuccess(response));
    } catch (error) {
      dispatch(fetchLeavesFailure(error));
    }
  };

export const postLeaveRequest = leaveData => async dispatch => {
  dispatch(postLeaveStart());

  const response = await LeaveService.postLeave(leaveData);

  if (response.success) {
    dispatch(postLeaveSuccess(response.response));
  } else {
    dispatch(postLeaveFailure(response.error));
  }

  return response;
};

export const patchLeaveStatus = (leaveId, leaveData) => async dispatch => {
  dispatch(patchLeaveStatusStart());

  const response = await LeaveService.patchLeaveStatus(leaveId, leaveData);

  if (response.success) {
    dispatch(patchLeaveStatusSuccess(response.response));
  } else {
    dispatch(patchLeaveStatusFailure(response.error));
  }

  return response;
};
