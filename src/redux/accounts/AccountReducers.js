import {
  CLEAR_SPECIFIC_USER_DATA,
  GET_SPECIFIC_USER_FAILURE,
  GET_SPECIFIC_USER_START,
  GET_SPECIFIC_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  specificUserData: null,
  isLoading: false,
  error: null,
  isUpdating: false,
  patchSuccess: false,
};

const AccountReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPECIFIC_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_SPECIFIC_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        specificUserData: action.payload,
        error: null,
      };

    case GET_SPECIFIC_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case CLEAR_SPECIFIC_USER_DATA:
      return {
        ...state,
        specificUserData: null,
        isLoading: false,
        error: null,
      };

    case UPDATE_USER_START:
      return {
        ...state,
        isUpdating: true,
        patchSuccess: false,
        error: null,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        patchSuccess: true,
        specificUserData: action.payload,
        error: null,
      };

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isUpdating: false,
        patchSuccess: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default AccountReducers;
