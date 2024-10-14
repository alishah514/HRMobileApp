import LeaveService from '../../services/api/LeaveService';
import {
  FETCH_LEAVES_START,
  FETCH_LEAVES_SUCCESS,
  FETCH_LEAVES_FAILURE,
  CLEAR_LEAVES_STATE,
  POST_LEAVE_START,
  POST_LEAVE_SUCCESS,
  POST_LEAVE_FAILURE,
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

export const fetchLeaves = () => async dispatch => {
  dispatch(fetchLeavesStart());
  try {
    const response = await LeaveService.fetchLeaves();
    dispatch(fetchLeavesSuccess(response));
  } catch (error) {
    dispatch(fetchLeavesFailure(error));
  }
};

export const fetchPaginatedLeaves = options => async dispatch => {
  dispatch(fetchLeavesStart());
  try {
    const response = await LeaveService.fetchPaginatedLeaves(options);
    dispatch(fetchLeavesSuccess(response));
  } catch (error) {
    dispatch(fetchLeavesFailure(error));
  }
};

export const postLeaveRequest = leaveData => async dispatch => {
  dispatch(postLeaveStart());
  try {
    const response = await LeaveService.postLeave(leaveData);
    dispatch(postLeaveSuccess(response));

    return {success: true, response};
  } catch (error) {
    dispatch(postLeaveFailure(error.message));

    return {success: false, error: error.message};
  }
};
