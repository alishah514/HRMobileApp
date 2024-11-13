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
} from '../actions/actionTypes';

const initialState = {
  punchInTime: null,
  punchOutTime: null,
  lastPunchInTime: null,
  lastPunchOutTime: null,
  timer: '00:00:00',
  punchInLocation: null,
  punchOutLocation: null,
  location: null,
  attendanceData: null,
  currentAttendance: null,
  isLoading: false,
  error: null,
  postResponse: null,
};

const AttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PUNCH_IN_TIME:
      return {
        ...state,
        punchInTime: action.payload || state.punchInTime,
      };
    case SAVE_PUNCH_OUT_TIME:
      return {
        ...state,
        punchOutTime: action.payload || state.punchOutTime,
      };
    case SAVE_LAST_PUNCH_IN_TIME:
      return {
        ...state,
        lastPunchInTime: action.payload || state.lastPunchInTime,
      };
    case SAVE_LAST_PUNCH_OUT_TIME:
      return {
        ...state,
        lastPunchOutTime: action.payload || state.lastPunchOutTime,
      };
    case SAVE_TIMER:
      return {
        ...state,
        timer: action.payload,
      };
    case SAVE_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case SAVE_PUNCH_IN_LOCATION:
      return {
        ...state,
        punchInLocation: action.payload,
      };
    case SAVE_PUNCH_OUT_LOCATION:
      return {
        ...state,
        punchOutLocation: action.payload,
      };

    case FETCH_ATTENDANCE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ATTENDANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        attendanceData: action.payload,
      };
    case FETCH_ATTENDANCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case FETCH_CURRENT_ATTENDANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentAttendance: action.payload,
      };
    case FETCH_CURRENT_ATTENDANCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case POST_ATTENDANCE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_ATTENDANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postResponse: action.payload,
      };
    case POST_ATTENDANCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CLEAR_ATTENDANCE_STATE:
      return {
        ...state,
        punchInTime: null,
        punchOutTime: null,
        lastPunchInTime: null,
        lastPunchOutTime: null,
        currentAttendance: null,
      };

    default:
      return state;
  }
};

export default AttendanceReducer;
