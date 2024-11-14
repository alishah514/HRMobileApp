import DashboardService from '../../services/api/dashboard/DashboardService';
import {
  FETCH_DASHBOARD_COUNT_START,
  FETCH_DASHBOARD_COUNT_SUCCESS,
  FETCH_DASHBOARD_COUNT_FAILURE,
  CLEAR_DASHBOARD_COUNT_STATE,
} from '../actions/actionTypes';

export const fetchDashboardCountStart = () => ({
  type: FETCH_DASHBOARD_COUNT_START,
});

export const fetchDashboardCountSuccess = count => ({
  type: FETCH_DASHBOARD_COUNT_SUCCESS,
  payload: count,
});

export const fetchDashboardCountFailure = error => ({
  type: FETCH_DASHBOARD_COUNT_FAILURE,
  payload: error,
});

export const clearDashboardCountState = () => ({
  type: CLEAR_DASHBOARD_COUNT_STATE,
});

export const fetchDashboardCount = () => async dispatch => {
  dispatch(fetchDashboardCountStart());
  try {
    const response = await DashboardService.fetchDashboardCount();
    dispatch(fetchDashboardCountSuccess(response));
  } catch (error) {
    const errorMessage = error.response ? error.response.data : 'Network error';
    dispatch(fetchDashboardCountFailure(errorMessage));
  }
};

export const fetchUserDashboardCount = userId => async dispatch => {
  dispatch(fetchDashboardCountStart());
  try {
    const response = await DashboardService.fetchUserDashboardCount(userId);
    dispatch(fetchDashboardCountSuccess(response));
  } catch (error) {
    const errorMessage = error.response ? error.response.data : 'Network error';
    dispatch(fetchDashboardCountFailure(errorMessage));
  }
};
