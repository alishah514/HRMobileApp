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

export const fetchAttendance = userId => async dispatch => {
  dispatch(fetchAttendanceStart());
  try {
    const response = await AttendanceService.fetchUserAttendance(userId);
    dispatch(fetchAttendanceSuccess(response));
  } catch (error) {
    dispatch(fetchAttendanceFailure(error));
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
