import {
  FETCH_SETTINGS_START,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE,
  CLEAR_SETTINGS_STATE,
  POST_SETTINGS_START,
  POST_SETTINGS_SUCCESS,
  POST_SETTINGS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  settings: [],
  isLoading: false,
  error: null,
  postSuccess: null,
};

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_START:
    case POST_SETTINGS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        settings: action.payload,
        error: null,
      };

    case POST_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postSuccess: action.payload,
        error: null,
      };

    case FETCH_SETTINGS_FAILURE:
    case POST_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CLEAR_SETTINGS_STATE:
      return initialState;

    default:
      return state;
  }
};

export default SettingsReducer;
