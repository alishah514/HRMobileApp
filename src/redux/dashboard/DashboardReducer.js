import {
  FETCH_DASHBOARD_COUNT_START,
  FETCH_DASHBOARD_COUNT_SUCCESS,
  FETCH_DASHBOARD_COUNT_FAILURE,
  CLEAR_DASHBOARD_COUNT_STATE,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  count: null,
  error: null,
};

const DashboardCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_COUNT_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_DASHBOARD_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        count: action.payload,
        error: null,
      };

    case FETCH_DASHBOARD_COUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        count: null,
        error: action.payload,
      };

    case CLEAR_DASHBOARD_COUNT_STATE:
      return initialState;

    default:
      return state;
  }
};

export default DashboardCountReducer;
