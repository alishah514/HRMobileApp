import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CLEAR_PROFILE_STATE,
} from '../actions/actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
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
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_PROFILE_STATE:
      return initialState;
    default:
      return state;
  }
};

export default ProfileReducer;
