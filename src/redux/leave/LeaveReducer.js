import {
  FETCH_LEAVES_START,
  FETCH_LEAVES_SUCCESS,
  FETCH_LEAVES_FAILURE,
  CLEAR_LEAVES_STATE,
  POST_LEAVE_START,
  POST_LEAVE_SUCCESS,
  POST_LEAVE_FAILURE,
  PATCH_LEAVE_STATUS_START,
  PATCH_LEAVE_STATUS_SUCCESS,
  PATCH_LEAVE_STATUS_FAILURE,
  DELETE_LEAVE_START,
  DELETE_LEAVE_SUCCESS,
  DELETE_LEAVE_FAILURE,
  FETCH_ALL_LEAVES_START,
  FETCH_ALL_LEAVES_SUCCESS,
  FETCH_ALL_LEAVES_FAILURE,
  FETCH_PAGINATED_LEAVES_START,
  FETCH_PAGINATED_LEAVES_SUCCESS,
  FETCH_PAGINATED_LEAVES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  data: [],
  allLeaves: [],
  isLoading: false,
  error: null,
  leaveData: null,
  patchSuccess: false,
  paginatedLeaves: [],
  loadingPaginatedLeaves: false,
  paginatedError: null,
};

const LeaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_LEAVES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ALL_LEAVES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allLeaves: action.payload,
      };
    case FETCH_ALL_LEAVES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
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
    case FETCH_PAGINATED_LEAVES_START:
      return {
        ...state,
        loadingPaginatedLeaves: true,
        paginatedError: null,
      };
    case FETCH_PAGINATED_LEAVES_SUCCESS:
      return {
        ...state,
        loadingPaginatedLeaves: false,
        paginatedLeaves: action.payload,
      };
    case FETCH_PAGINATED_LEAVES_FAILURE:
      return {
        ...state,
        loadingPaginatedLeaves: false,
        paginatedError: action.payload,
      };
    case CLEAR_LEAVES_STATE:
      return initialState;
    case POST_LEAVE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_LEAVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leaveData: action.payload,
      };
    case POST_LEAVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case PATCH_LEAVE_STATUS_START:
      return {
        ...state,
        isLoading: true,
        patchSuccess: false,
        error: null,
      };
    case PATCH_LEAVE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patchSuccess: true,
        data: state.data.map(leave =>
          leave.id === action.payload.id ? action.payload : leave,
        ),
      };
    case PATCH_LEAVE_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        patchSuccess: false,
        error: action.payload,
      };
    case DELETE_LEAVE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_LEAVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: state.data.filter(leave => leave.id !== action.payload),
      };
    case DELETE_LEAVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default LeaveReducer;
