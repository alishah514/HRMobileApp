import {
  CLEAR_ANNOUNCEMENTS_STATE,
  POST_ANNOUNCEMENTS_START,
  POST_ANNOUNCEMENTS_SUCCESS,
  POST_ANNOUNCEMENTS_FAILURE,
  FETCH_ALL_ANNOUNCEMENTS_START,
  FETCH_ALL_ANNOUNCEMENTS_SUCCESS,
  FETCH_ALL_ANNOUNCEMENTS_FAILURE,
  PATCH_ANNOUNCEMENTS_START,
  PATCH_ANNOUNCEMENTS_SUCCESS,
  PATCH_ANNOUNCEMENTS_FAILURE,
  DELETE_ANNOUNCEMENTS_START,
  DELETE_ANNOUNCEMENTS_SUCCESS,
  DELETE_ANNOUNCEMENTS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  announcements: [],
  isLoading: false,
  error: null,
  postSuccess: false,
  patchSuccess: false,
  deleteSuccess: false,
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
    case PATCH_ANNOUNCEMENTS_START:
      return {
        ...state,
        isLoading: true,
        patchSuccess: false,
        error: null,
      };
    case PATCH_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patchSuccess: true,
        announcements: state.announcements.map(announcement =>
          announcement.id === action.payload.id
            ? {...announcement, ...action.payload}
            : announcement,
        ),
      };
    case PATCH_ANNOUNCEMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        patchSuccess: false,
        error: action.payload,
      };
    case DELETE_ANNOUNCEMENTS_START:
      return {
        ...state,
        isLoading: true,
        deleteSuccess: false,
        error: null,
      };
    case DELETE_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteSuccess: true,
        announcements: state.announcements.filter(
          announcement => announcement.id !== action.payload,
        ),
      };
    case DELETE_ANNOUNCEMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        deleteSuccess: false,
        error: action.payload,
      };
    case CLEAR_ANNOUNCEMENTS_STATE:
      return initialState;
    default:
      return state;
  }
};

export default AnnouncementsReducer;
