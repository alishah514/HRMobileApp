import AttendanceService from '../../services/api/attendance/AttendanceService';
import {
  SAVE_PUNCH_IN_TIME,
  SAVE_PUNCH_OUT_TIME,
  SAVE_TIMER,
  SAVE_PUNCH_IN_LOCATION,
  SAVE_PUNCH_OUT_LOCATION,
  SAVE_LOCATION,
  FETCH_ATTENDANCE_START,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAILURE,
  POST_ATTENDANCE_START,
  POST_ATTENDANCE_SUCCESS,
  POST_ATTENDANCE_FAILURE,
  CLEAR_ATTENDANCE_STATE,
  SAVE_LAST_PUNCH_IN_TIME,
  SAVE_LAST_PUNCH_OUT_TIME,
  FETCH_CURRENT_ATTENDANCE_SUCCESS,
  FETCH_CURRENT_ATTENDANCE_FAILURE,
  FETCH_ADMIN_CURRENT_ATTENDANCE_START,
  FETCH_ADMIN_CURRENT_ATTENDANCE_SUCCESS,
  FETCH_ADMIN_CURRENT_ATTENDANCE_FAILURE,
  FETCH_ALL_ATTENDANCE_START,
  FETCH_ALL_ATTENDANCE_SUCCESS,
  FETCH_ALL_ATTENDANCE_FAILURE,
  FETCH_USER_WEEKLY_ATTENDANCE_START,
  FETCH_USER_WEEKLY_ATTENDANCE_SUCCESS,
  FETCH_USER_WEEKLY_ATTENDANCE_FAILURE,
} from '../actions/actionTypes';

export const savePunchInTime = time => ({
  type: SAVE_PUNCH_IN_TIME,
  payload: time,
});

export const savePunchOutTime = time => ({
  type: SAVE_PUNCH_OUT_TIME,
  payload: time,
});

export const saveLastPunchInTime = time => ({
  type: SAVE_LAST_PUNCH_IN_TIME,
  payload: time,
});

export const saveLastPunchOutTime = time => ({
  type: SAVE_LAST_PUNCH_OUT_TIME,
  payload: time,
});

export const saveTimer = time => ({
  type: SAVE_TIMER,
  payload: time,
});

export const saveLocation = location => ({
  type: SAVE_LOCATION,
  payload: location,
});

export const savePunchInLocation = location => ({
  type: SAVE_PUNCH_IN_LOCATION,
  payload: location,
});

export const savePunchOutLocation = location => ({
  type: SAVE_PUNCH_OUT_LOCATION,
  payload: location,
});

export const fetchAllAttendanceStart = () => ({
  type: FETCH_ALL_ATTENDANCE_START,
});

export const fetchAllAttendanceSuccess = attendance => ({
  type: FETCH_ALL_ATTENDANCE_SUCCESS,
  payload: attendance,
});

export const fetchAllAttendanceFailure = error => ({
  type: FETCH_ALL_ATTENDANCE_FAILURE,
  payload: error,
});

export const fetchAttendanceStart = () => ({
  type: FETCH_ATTENDANCE_START,
});

export const fetchAttendanceSuccess = attendance => ({
  type: FETCH_ATTENDANCE_SUCCESS,
  payload: attendance,
});

export const fetchAttendanceFailure = error => ({
  type: FETCH_ATTENDANCE_FAILURE,
  payload: error,
});

export const fetchUserWeeklyAttendanceStart = () => ({
  type: FETCH_USER_WEEKLY_ATTENDANCE_START,
});

export const fetchUserWeeklyAttendanceSuccess = attendance => ({
  type: FETCH_USER_WEEKLY_ATTENDANCE_SUCCESS,
  payload: attendance,
});

export const fetchUserWeeklyAttendanceFailure = error => ({
  type: FETCH_USER_WEEKLY_ATTENDANCE_FAILURE,
  payload: error,
});

export const fetchCurrentAttendanceStart = () => ({
  type: FETCH_ATTENDANCE_START,
});

export const fetchCurrentAttendanceSuccess = currentAttendance => ({
  type: FETCH_CURRENT_ATTENDANCE_SUCCESS,
  payload: currentAttendance,
});

export const fetchCurrentAttendanceFailure = error => ({
  type: FETCH_CURRENT_ATTENDANCE_FAILURE,
  payload: error,
});

export const fetchAdminCurrentAttendanceStart = () => ({
  type: FETCH_ADMIN_CURRENT_ATTENDANCE_START,
});

export const fetchAdminCurrentAttendanceSuccess = currentAdminAttendance => ({
  type: FETCH_ADMIN_CURRENT_ATTENDANCE_SUCCESS,
  payload: currentAdminAttendance,
});

export const fetchAdminCurrentAttendanceFailure = error => ({
  type: FETCH_ADMIN_CURRENT_ATTENDANCE_FAILURE,
  payload: error,
});

export const clearAttendanceState = () => ({
  type: CLEAR_ATTENDANCE_STATE,
});

export const postAttendanceStart = () => ({
  type: POST_ATTENDANCE_START,
});

export const postAttendanceSuccess = response => ({
  type: POST_ATTENDANCE_SUCCESS,
  payload: response,
});

export const postAttendanceFailure = error => ({
  type: POST_ATTENDANCE_FAILURE,
  payload: error,
});

export const fetchAllAttendance = () => async dispatch => {
  dispatch(fetchAllAttendanceStart());
  try {
    const response = await AttendanceService.fetchAllAttendance();
    dispatch(fetchAllAttendanceSuccess(response));
  } catch (error) {
    dispatch(fetchAllAttendanceFailure(error));
  }
};

export const fetchAttendance = userId => async dispatch => {
  dispatch(fetchAttendanceStart());
  try {
    const response = await AttendanceService.fetchUserAttendance(userId);
    dispatch(fetchAttendanceSuccess(response));
  } catch (error) {
    dispatch(fetchAttendanceFailure(error));
  }
};

export const fetchWeeklyUserAttendance =
  (userId, firstDate, lastDate) => async dispatch => {
    dispatch(fetchUserWeeklyAttendanceStart());
    try {
      const response = await AttendanceService.fetchUserWeeklyAttendance(
        userId,
        firstDate,
        lastDate,
      );
      dispatch(fetchUserWeeklyAttendanceSuccess(response));
    } catch (error) {
      dispatch(fetchUserWeeklyAttendanceFailure(error));
    }
  };

export const fetchCurrentAttendance =
  (userId, currentDate) => async dispatch => {
    dispatch(fetchCurrentAttendanceStart());
    try {
      const response = await AttendanceService.fetchCurrentUserAttendance(
        userId,
        currentDate,
      );
      dispatch(fetchCurrentAttendanceSuccess(response));
    } catch (error) {
      dispatch(fetchCurrentAttendanceFailure(error));
    }
  };

export const fetchAdminCurrentAttendance = currentDate => async dispatch => {
  dispatch(fetchAdminCurrentAttendanceStart());
  try {
    const response = await AttendanceService.fetchAdminCurrentAttendance(
      currentDate,
    );
    dispatch(fetchAdminCurrentAttendanceSuccess(response));
  } catch (error) {
    dispatch(fetchAdminCurrentAttendanceFailure(error));
  }
};

export const postAttendance = attendanceData => async dispatch => {
  dispatch(postAttendanceStart());
  const response = await AttendanceService.postAttendance(attendanceData);
  if (response.success) {
    dispatch(postAttendanceSuccess(response.response));
  } else {
    dispatch(postAttendanceFailure(response.error));
  }
  return response;
};
