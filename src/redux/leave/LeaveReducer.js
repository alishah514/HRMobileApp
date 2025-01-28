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
  FETCH_USER_PAGINATED_LEAVES_START,
  FETCH_USER_PAGINATED_LEAVES_SUCCESS,
  FETCH_USER_PAGINATED_LEAVES_FAILURE,
  FETCH_ALL_PAGINATED_LEAVES_START,
  FETCH_ALL_PAGINATED_LEAVES_SUCCESS,
  FETCH_ALL_PAGINATED_LEAVES_FAILURE,
  SET_NO_MORE_ALL_RECORDS,
} from '../actions/actionTypes';

const initialState = {
  data: [],
  allLeaves: [],
  isLoading: false,
  error: null,
  leaveData: null,
  patchSuccess: false,
  userPaginatedLeaves: [],
  isLoadingUserPaginatedLeaves: false,
  userPaginatedError: null,
  allPaginatedLeaves: [],
  isLoadingAllPaginatedLeaves: false,
  allPaginatedError: null,
  noMoreAllRecords: false,
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
    case FETCH_USER_PAGINATED_LEAVES_START:
      return {
        ...state,
        isLoadingUserPaginatedLeaves: true,
        userPaginatedError: null,
      };
    case FETCH_USER_PAGINATED_LEAVES_SUCCESS:
      return {
        ...state,
        isLoadingUserPaginatedLeaves: false,
        userPaginatedLeaves: [...state.userPaginatedLeaves, ...action.payload],
      };
    case FETCH_USER_PAGINATED_LEAVES_FAILURE:
      return {
        ...state,
        isLoadingUserPaginatedLeaves: false,
        userPaginatedError: action.payload,
      };
    case FETCH_ALL_PAGINATED_LEAVES_START:
      return {
        ...state,
        isLoadingAllPaginatedLeaves: true,
        allPaginatedError: null,
      };
    case FETCH_ALL_PAGINATED_LEAVES_SUCCESS:
      return {
        ...state,
        isLoadingAllPaginatedLeaves: false,
        allPaginatedLeaves: [...state.allPaginatedLeaves, ...action.payload],
      };
    case FETCH_ALL_PAGINATED_LEAVES_FAILURE:
      return {
        ...state,
        isLoadingAllPaginatedLeaves: false,
        allPaginatedError: action.payload,
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
    case SET_NO_MORE_ALL_RECORDS:
      return {
        ...state,
        noMoreAllRecords: action.payload,
      };
    default:
      return state;
  }
};

export default LeaveReducer;
