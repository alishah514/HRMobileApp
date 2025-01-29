import {
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CLEAR_TASKS_STATE,
  POST_TASK_START,
  POST_TASK_SUCCESS,
  POST_TASK_FAILURE,
  PATCH_TASK_STATUS_START,
  PATCH_TASK_STATUS_SUCCESS,
  PATCH_TASK_STATUS_FAILURE,
  FETCH_ALL_TASKS_START,
  FETCH_ALL_TASKS_SUCCESS,
  FETCH_ALL_TASKS_FAILURE,
  SET_NO_MORE_ALL_TASKS_RECORDS,
  FETCH_ALL_PAGINATED_TASKS_START,
  FETCH_ALL_PAGINATED_TASKS_SUCCESS,
  FETCH_ALL_PAGINATED_TASKS_FAILURE,
  FETCH_USER_PAGINATED_TASKS_START,
  FETCH_USER_PAGINATED_TASKS_SUCCESS,
  FETCH_USER_PAGINATED_TASKS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  data: [],
  allTasks: [],
  isLoading: false,
  error: null,
  taskData: null,
  patchSuccess: false,
  allPaginatedTasks: [],
  isLoadingAllPaginatedTasks: false,
  allPaginatedError: null,
  userPaginatedTasks: [],
  isLoadingUserPaginatedTasks: false,
  userPaginatedError: null,
  noMoreAllRecords: false,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TASKS_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ALL_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allTasks: action.payload,
      };
    case FETCH_ALL_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_TASKS_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_ALL_PAGINATED_TASKS_START:
      return {
        ...state,
        isLoadingAllPaginatedTasks: true,
        allPaginatedError: null,
      };
    case FETCH_ALL_PAGINATED_TASKS_SUCCESS:
      return {
        ...state,
        isLoadingAllPaginatedTasks: false,
        allPaginatedTasks: [...state.allPaginatedTasks, ...action.payload],
      };
    case FETCH_ALL_PAGINATED_TASKS_FAILURE:
      return {
        ...state,
        isLoadingAllPaginatedTasks: false,
        allPaginatedError: action.payload,
      };
    case FETCH_USER_PAGINATED_TASKS_START:
      return {
        ...state,
        isLoadingUserPaginatedTasks: true,
        userPaginatedError: null,
      };
    case FETCH_USER_PAGINATED_TASKS_SUCCESS:
      return {
        ...state,
        isLoadingUserPaginatedTasks: false,
        userPaginatedTasks: [...state.userPaginatedTasks, ...action.payload],
      };
    case FETCH_USER_PAGINATED_TASKS_FAILURE:
      return {
        ...state,
        isLoadingUserPaginatedTasks: false,
        userPaginatedError: action.payload,
      };
    case CLEAR_TASKS_STATE:
      return initialState;
    case POST_TASK_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        taskData: action.payload,
      };
    case POST_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case PATCH_TASK_STATUS_START:
      return {
        ...state,
        isLoading: true,
        patchSuccess: false,
        error: null,
      };
    case PATCH_TASK_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patchSuccess: true,
        data: state.data.map(task =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case PATCH_TASK_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        patchSuccess: false,
        error: action.payload,
      };
    case SET_NO_MORE_ALL_TASKS_RECORDS:
      return {
        ...state,
        noMoreAllRecords: action.payload,
      };

    default:
      return state;
  }
};

export default TaskReducer;
