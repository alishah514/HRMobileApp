import {
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  error: null,
  userData: null,
};

export const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: action.payload,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
