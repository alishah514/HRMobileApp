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
  DELETE_LEAVE_START,
  DELETE_LEAVE_SUCCESS,
  DELETE_LEAVE_FAILURE,
  FETCH_ALL_LEAVES_START,
  FETCH_ALL_LEAVES_SUCCESS,
  FETCH_ALL_LEAVES_FAILURE,
  FETCH_USER_PAGINATED_LEAVES_START,
  FETCH_USER_PAGINATED_LEAVES_SUCCESS,
  FETCH_USER_PAGINATED_LEAVES_FAILURE,
  FETCH_ALL_PAGINATED_LEAVES_START,
  FETCH_ALL_PAGINATED_LEAVES_SUCCESS,
  FETCH_ALL_PAGINATED_LEAVES_FAILURE,
  SET_NO_MORE_ALL_LEAVES_RECORDS,
} from '../actions/actionTypes';

export const fetchAllLeavesStart = () => ({
  type: FETCH_ALL_LEAVES_START,
});

export const fetchAllLeavesSuccess = leaves => ({
  type: FETCH_ALL_LEAVES_SUCCESS,
  payload: leaves,
});

export const fetchAllLeavesFailure = error => ({
  type: FETCH_ALL_LEAVES_FAILURE,
  payload: error,
});

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

export const fetchUserPaginatedLeavesStart = () => ({
  type: FETCH_USER_PAGINATED_LEAVES_START,
});

export const fetchUserPaginatedLeavesSuccess = leaves => ({
  type: FETCH_USER_PAGINATED_LEAVES_SUCCESS,
  payload: leaves,
});

export const fetchUserPaginatedLeavesFailure = error => ({
  type: FETCH_USER_PAGINATED_LEAVES_FAILURE,
  payload: error,
});

export const fetchAllPaginatedLeavesStart = () => ({
  type: FETCH_ALL_PAGINATED_LEAVES_START,
});

export const fetchAllPaginatedLeavesSuccess = leaves => ({
  type: FETCH_ALL_PAGINATED_LEAVES_SUCCESS,
  payload: leaves,
});

export const fetchAllPaginatedLeavesFailure = error => ({
  type: FETCH_ALL_PAGINATED_LEAVES_FAILURE,
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

export const deleteLeaveStart = () => ({
  type: DELETE_LEAVE_START,
});

export const deleteLeaveSuccess = leaveId => ({
  type: DELETE_LEAVE_SUCCESS,
  payload: leaveId,
});

export const deleteLeaveFailure = error => ({
  type: DELETE_LEAVE_FAILURE,
  payload: error,
});

export const setNoMoreAllLeaveRecords = () => ({
  type: SET_NO_MORE_ALL_LEAVES_RECORDS,
  payload: true,
});

export const fetchAllLeaves = () => async dispatch => {
  dispatch(fetchAllLeavesStart());
  try {
    const response = await LeaveService.fetchLeaves();
    dispatch(fetchAllLeavesSuccess(response));
  } catch (error) {
    dispatch(fetchAllLeavesFailure(error));
  }
};

export const fetchUserLeaves =
  (userId, options = {}) =>
  async dispatch => {
    dispatch(fetchLeavesStart());
    try {
      const response = await LeaveService.fetchUserLeaves(userId, options);
      dispatch(fetchLeavesSuccess(response));
      return response;
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

export const deleteLeave = leaveId => async dispatch => {
  dispatch(deleteLeaveStart());

  try {
    const response = await LeaveService.deleteLeave(leaveId);

    if (response.success) {
      dispatch(deleteLeaveSuccess(leaveId));
    } else {
      dispatch(deleteLeaveFailure(response.error));
    }

    return response;
  } catch (error) {
    dispatch(deleteLeaveFailure(error));
  }
};

export const getUserPaginatedLeaves =
  ({userId, status, pageSize, pageCount}) =>
  async dispatch => {
    dispatch(fetchUserPaginatedLeavesStart());
    try {
      const response = await LeaveService.fetchUserPaginatedLeaves({
        userId,
        status,
        pageSize,
        pageCount,
        dispatch,
      });
      dispatch(fetchUserPaginatedLeavesSuccess(response));
    } catch (error) {
      dispatch(fetchUserPaginatedLeavesFailure(error));
    }
  };

export const getAllPaginatedLeaves =
  ({status, pageSize, pageCount}) =>
  async dispatch => {
    dispatch(fetchAllPaginatedLeavesStart());
    try {
      const response = await LeaveService.fetchAllPaginatedLeaves({
        status,
        pageSize,
        pageCount,
        dispatch,
      });

      dispatch(fetchAllPaginatedLeavesSuccess(response));
    } catch (error) {
      dispatch(fetchAllPaginatedLeavesFailure(error));
    }
  };
