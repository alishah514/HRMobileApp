import {
  FETCH_EVENT_START,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
  CLEAR_EVENT_STATE,
  POST_EVENT_START,
  POST_EVENT_SUCCESS,
  POST_EVENT_FAILURE,
  PATCH_EVENT_STATUS_START,
  PATCH_EVENT_STATUS_SUCCESS,
  PATCH_EVENT_STATUS_FAILURE,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  eventData: null,
  patchSuccess: false,
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case FETCH_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_EVENT_STATE:
      return initialState;
    case POST_EVENT_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        eventData: action.payload,
      };
    case POST_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case PATCH_EVENT_STATUS_START:
      return {
        ...state,
        isLoading: true,
        patchSuccess: false,
        error: null,
      };
    case PATCH_EVENT_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patchSuccess: true,
        data: state.data.map(event =>
          event.id === action.payload.id ? action.payload : event,
        ),
      };
    case PATCH_EVENT_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        patchSuccess: false,
        error: action.payload,
      };
    case DELETE_EVENT_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: state.data.filter(event => event.id !== action.payload),
      };
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EventReducer;
