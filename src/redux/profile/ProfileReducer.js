import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CLEAR_PROFILE_STATE,
  PATCH_PROFILE_START,
  PATCH_PROFILE_SUCCESS,
  PATCH_PROFILE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  isPatching: false,
  patchError: null,
  patchSuccess: false,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
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
