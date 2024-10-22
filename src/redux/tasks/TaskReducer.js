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
} from '../actions/actionTypes';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  taskData: null,
  patchSuccess: false,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default TaskReducer;
