import I18n from '../../i18n/i18n';
import {
  LOGIN_USER,
  SET_USER_ROLE,
  SAVE_USER_DATA_AND_ROLE,
  SAVE_PUNCH_IN_TIME,
  SAVE_PUNCH_OUT_TIME,
  SAVE_TIMER,
  SET_LANGUAGE,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  userRole: null,
  token: null,
  accessToken: null,
  userId: null,
  isLoggedIn: false,
  role: null,
  punchInTime: null,
  punchOutTime: null,
  timer: '00:00:00',
};

const userReducer = (state = initialState, action) => {
  console.log('action: ' + JSON.stringify(action));
  switch (action.type) {
    case SAVE_USER_DATA_AND_ROLE:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        userId: action.payload.userId,
        isLoggedIn: action.payload.isLoggedIn,
        role: action.payload.role,
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };
    case SAVE_PUNCH_IN_TIME:
      return {
        ...state,
        punchInTime: action.payload ? action.payload : state.punchInTime,
      };
    case SAVE_PUNCH_OUT_TIME:
      return {
        ...state,
        punchOutTime: action.payload ? action.payload : state.punchOutTime,
      };
    case SAVE_TIMER:
      return {
        ...state,
        timer: action.payload,
      };
    case SET_LANGUAGE:
      I18n.locale = action.payload; // Update the I18n locale when language is changed
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
