import {
  LOGIN_USER,
  SET_USER_ROLE,
  SAVE_USER_DATA_AND_ROLE,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  userRole: null,
  token: null,
  //
  accessToken: null,
  userId: null,
  isLoggedIn: false,
  role: null,
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
    default:
      return state;
  }
};

export default userReducer;
