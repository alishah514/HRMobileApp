import {
  SAVE_PUNCH_IN_TIME,
  SAVE_PUNCH_OUT_TIME,
  SAVE_TIMER,
  SAVE_PUNCH_IN_LOCATION,
  SAVE_PUNCH_OUT_LOCATION,
  SAVE_LOCATION,
} from '../actions/actionTypes';

const initialState = {
  punchInTime: null,
  punchOutTime: null,
  timer: '00:00:00',
  punchInLocation: null,
  punchOutLocation: null,
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
    case SAVE_TIMER:
      return {
        ...state,
        timer: action.payload,
      };
    case SAVE_PUNCH_IN_LOCATION:
      return {
        ...state,
        punchInLocation: action.payload,
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
    default:
      return state;
  }
};

export default AttendanceReducer;
