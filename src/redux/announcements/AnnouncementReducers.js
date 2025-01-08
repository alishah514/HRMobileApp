import {
  CLEAR_ANNOUNCEMENTS_STATE,
  POST_ANNOUNCEMENTS_START,
  POST_ANNOUNCEMENTS_SUCCESS,
  POST_ANNOUNCEMENTS_FAILURE,
  FETCH_ALL_ANNOUNCEMENTS_START,
  FETCH_ALL_ANNOUNCEMENTS_SUCCESS,
  FETCH_ALL_ANNOUNCEMENTS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  announcements: [],
  isLoading: false,
  error: null,
  postSuccess: false,
};

const AnnouncementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ANNOUNCEMENTS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ALL_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        announcements: action.payload,
      };
    case FETCH_ALL_ANNOUNCEMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case POST_ANNOUNCEMENTS_START:
      return {
        ...state,
        isLoading: true,
        postSuccess: false,
        error: null,
      };
    case POST_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postSuccess: true,
        announcements: [...state.announcements, action.payload],
      };
    case POST_ANNOUNCEMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        postSuccess: false,
        error: action.payload,
      };
    case CLEAR_ANNOUNCEMENTS_STATE:
      return initialState;
    default:
      return state;
  }
};

export default AnnouncementsReducer;
