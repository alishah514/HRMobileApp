import {
  FETCH_LEAVES_START,
  FETCH_LEAVES_SUCCESS,
  FETCH_LEAVES_FAILURE,
  CLEAR_LEAVES_STATE,
  POST_LEAVE_START,
  POST_LEAVE_SUCCESS,
  POST_LEAVE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const LeaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEAVES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_LEAVES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case FETCH_LEAVES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_LEAVES_STATE:
      return initialState;
    case POST_LEAVE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        leaveData: action.payload,
      };
    case POST_LEAVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default LeaveReducer;
