import {
  CLEAR_ALL_USERS_DATA,
  CLEAR_SPECIFIC_USER_DATA,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_SPECIFIC_USER_FAILURE,
  GET_SPECIFIC_USER_START,
  GET_SPECIFIC_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  allUsersData: null,
  specificUserData: null,
  isLoading: false,
  error: null,
  isUpdating: false,
  patchSuccess: false,
  isDeleting: false,
  deleteError: null,
  deleteSuccess: false,
};

const AccountReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allUsersData: action.payload,
        error: null,
      };

    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case CLEAR_ALL_USERS_DATA:
      return {
        ...state,
        allUsersData: null,
        isLoading: false,
        error: null,
      };

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
    case DELETE_USER_START:
      return {
        ...state,
        isDeleting: true,
        deleteError: null,
        deleteSuccess: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        deleteError: null,
        deleteSuccess: true,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isDeleting: false,
        deleteError: action.payload,
        deleteSuccess: false,
      };

    default:
      return state;
  }
};

export default AccountReducers;
