import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CLEAR_PROFILE_STATE,
  PATCH_PROFILE_START,
  PATCH_PROFILE_SUCCESS,
  PATCH_PROFILE_FAILURE,
  FETCH_ALL_PROFILE_START,
  FETCH_ALL_PROFILE_SUCCESS,
  FETCH_ALL_PROFILE_FAILURE,
  POST_PROFILE_START,
  POST_PROFILE_SUCCESS,
  POST_PROFILE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  allProfileData: null,
  data: null,
  isLoading: false,
  error: null,
  isPosting: false,
  postError: null,
  postSuccess: false,
  isPatching: false,
  patchError: null,
  patchSuccess: false,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PROFILE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ALL_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allProfileData: action.payload,
        error: null,
      };
    case FETCH_ALL_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_PROFILE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_PROFILE_STATE:
      return initialState;

    case POST_PROFILE_START:
      return {
        ...state,
        isPosting: true,
        postError: null,
        postSuccess: false,
      };
    case POST_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isPosting: false,
        postError: null,
        postSuccess: true,
      };
    case POST_PROFILE_FAILURE:
      return {
        ...state,
        isPosting: false,
        postError: action.payload,
        postSuccess: false,
      };

    case PATCH_PROFILE_START:
      return {
        ...state,
        isPatching: true,
        patchError: null,
        patchSuccess: false,
      };
    case PATCH_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isPatching: false,
        patchError: null,
        patchSuccess: true,
      };
    case PATCH_PROFILE_FAILURE:
      return {
        ...state,
        isPatching: false,
        patchError: action.payload,
        patchSuccess: false,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
