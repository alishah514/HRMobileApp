import TaskService from '../../services/api/tasks/TaskService';
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
  FETCH_ALL_PAGINATED_TASKS_START,
  FETCH_ALL_PAGINATED_TASKS_SUCCESS,
  FETCH_ALL_PAGINATED_TASKS_FAILURE,
  SET_NO_MORE_ALL_TASKS_RECORDS,
  FETCH_USER_PAGINATED_TASKS_START,
  FETCH_USER_PAGINATED_TASKS_SUCCESS,
  FETCH_USER_PAGINATED_TASKS_FAILURE,
} from '../actions/actionTypes';

export const fetchAllTasksStart = () => ({
  type: FETCH_ALL_TASKS_START,
});

export const fetchAllTasksSuccess = tasks => ({
  type: FETCH_ALL_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchAllTasksFailure = error => ({
  type: FETCH_ALL_TASKS_FAILURE,
  payload: error,
});
export const fetchTasksStart = () => ({
  type: FETCH_TASKS_START,
});

export const fetchTasksSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = error => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const fetchAllPaginatedTasksStart = () => ({
  type: FETCH_ALL_PAGINATED_TASKS_START,
});

export const fetchAllPaginatedTasksSuccess = leaves => ({
  type: FETCH_ALL_PAGINATED_TASKS_SUCCESS,
  payload: leaves,
});

export const fetchAllPaginatedTasksFailure = error => ({
  type: FETCH_ALL_PAGINATED_TASKS_FAILURE,
  payload: error,
});

export const fetchUserPaginatedTasksStart = () => ({
  type: FETCH_USER_PAGINATED_TASKS_START,
});

export const fetchUserPaginatedTasksSuccess = leaves => ({
  type: FETCH_USER_PAGINATED_TASKS_SUCCESS,
  payload: leaves,
});

export const fetchUserPaginatedTasksFailure = error => ({
  type: FETCH_USER_PAGINATED_TASKS_FAILURE,
  payload: error,
});

export const clearTasksState = () => ({
  type: CLEAR_TASKS_STATE,
});

export const postTaskStart = () => ({
  type: POST_TASK_START,
});

export const postTaskSuccess = response => ({
  type: POST_TASK_SUCCESS,
  payload: response,
});

export const postTaskFailure = error => ({
  type: POST_TASK_FAILURE,
  payload: error,
});

export const patchTaskStatusStart = () => ({
  type: PATCH_TASK_STATUS_START,
});

export const patchTaskStatusSuccess = response => ({
  type: PATCH_TASK_STATUS_SUCCESS,
  payload: response,
});

export const patchTaskStatusFailure = error => ({
  type: PATCH_TASK_STATUS_FAILURE,
  payload: error,
});

export const setNoMoreAllTaskRecords = () => ({
  type: SET_NO_MORE_ALL_TASKS_RECORDS,
  payload: true,
});

export const fetchAllTasks = () => async dispatch => {
  dispatch(fetchAllTasksStart());
  try {
    const response = await TaskService.fetchTasks();

    dispatch(fetchAllTasksSuccess(response));
  } catch (error) {
    dispatch(fetchAllTasksFailure(error));
  }
};

export const fetchUserTasks =
  (userId, options = {}) =>
  async dispatch => {
    dispatch(fetchTasksStart());
    try {
      const response = await TaskService.fetchUserTasks(userId, options);
      dispatch(fetchTasksSuccess(response));
    } catch (error) {
      dispatch(fetchTasksFailure(error));
    }
  };

export const postTaskRequest = taskData => async dispatch => {
  dispatch(postTaskStart());

  const response = await TaskService.postTask(taskData);

  if (response.success) {
    dispatch(postTaskSuccess(response.response));
  } else {
    dispatch(postTaskFailure(response.error));
  }

  return response;
};

export const patchTaskStatus = (taskId, taskData) => async dispatch => {
  dispatch(patchTaskStatusStart());

  const response = await TaskService.patchTaskStatus(taskId, taskData);

  if (response.success) {
    dispatch(patchTaskStatusSuccess(response.response));
  } else {
    dispatch(patchTaskStatusFailure(response.error));
  }

  return response;
};

export const getUserPaginatedTasks =
  ({userId, status, pageSize, pageCount}) =>
  async dispatch => {
    dispatch(fetchUserPaginatedTasksStart());
    try {
      const response = await TaskService.fetchUserPaginatedTasks({
        userId,
        status,
        pageSize,
        pageCount,
        dispatch,
      });

      dispatch(fetchUserPaginatedTasksSuccess(response));
    } catch (error) {
      dispatch(fetchUserPaginatedTasksFailure(error));
    }
  };

export const getAllPaginatedTasks =
  ({status, pageSize, pageCount}) =>
  async dispatch => {
    dispatch(fetchAllPaginatedTasksStart());
    try {
      const response = await TaskService.fetchAllPaginatedTasks({
        status,
        pageSize,
        pageCount,
        dispatch,
      });

      dispatch(fetchAllPaginatedTasksSuccess(response));
    } catch (error) {
      dispatch(fetchAllPaginatedTasksFailure(error));
    }
  };
