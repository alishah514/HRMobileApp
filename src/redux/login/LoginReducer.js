import {
  LOGIN_USER,
  CLEAR_USER_DATA,
  SAVE_USER_DATA_AND_ROLE,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  token: null,
  accessToken: null,
  userId: null,
  isLoggedIn: false,
  role: null,
  isLoading: false,
  error: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
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
        role: null,
        error: null,
      };
    default:
      return state;
  }
};

export default LoginReducer;
