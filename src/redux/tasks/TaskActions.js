import TaskService from '../../services/api/task/TaskService';
import {
  FETCH_TASK_START,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILURE,
  CLEAR_TASK_STATE,
  POST_TASK_START,
  POST_TASK_SUCCESS,
  POST_TASK_FAILURE,
  PATCH_TASK_STATUS_START,
  PATCH_TASK_STATUS_SUCCESS,
  PATCH_TASK_STATUS_FAILURE,
} from '../actions/actionTypes';

export const fetchTaskStart = () => ({
  type: FETCH_TASK_START,
});

export const fetchTaskSuccess = tasks => ({
  type: FETCH_TASK_SUCCESS,
  payload: tasks,
});

export const fetchTaskFailure = error => ({
  type: FETCH_TASK_FAILURE,
  payload: error,
});

export const clearTaskState = () => ({
  type: CLEAR_TASK_STATE,
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

export const fetchTask = () => async dispatch => {
  dispatch(fetchTaskStart());
  try {
    const response = await TaskService.fetchTask();
    dispatch(fetchTaskSuccess(response));
  } catch (error) {
    dispatch(fetchTaskFailure(error));
  }
};

export const fetchPaginatedTask = options => async dispatch => {
  dispatch(fetchTaskStart());
  try {
    const response = await TaskService.fetchPaginatedTask(options);
    dispatch(fetchTaskSuccess(response));
  } catch (error) {
    dispatch(fetchTaskFailure(error));
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
