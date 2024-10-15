import {
  SIGNUP_USER_START,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  SAVE_USER_DATA_AND_ROLE,
} from './signupActions';

const initialState = {
  isLoading: false,
  user: null,
  error: null,
  token: null,
  id: null,
  role: null,
  isLoggedIn: false,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case SAVE_USER_DATA_AND_ROLE:
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
        isLoggedIn: action.payload.isLoggedIn,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

export default signupReducer;
