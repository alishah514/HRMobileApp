import {
  LOGIN_USER,
  CLEAR_USER_DATA,
  SAVE_USER_DATA_AND_ROLE,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  token: null,
  accessToken: null,
  userId: null,
  isLoggedIn: false,
};

const LoginReducer = (state = initialState, action) => {
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
        token: action.payload.token,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        accessToken: null,
        userId: null,
        isLoggedIn: false,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default LoginReducer;
