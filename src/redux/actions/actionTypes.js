// login
export const LOGIN_USER = 'LOGIN_USER';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SAVE_USER_DATA_AND_ROLE = 'SAVE_USER_DATA_AND_ROLE';
export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
// signup
export const SIGNUP_USER_START = 'SIGNUP_USER_START';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
// punch in/out timer
export const SAVE_PUNCH_IN_TIME = 'SAVE_PUNCH_IN_TIME';
export const SAVE_PUNCH_OUT_TIME = 'SAVE_PUNCH_OUT_TIME';
export const SAVE_TIMER = 'SAVE_TIMER';
export const SAVE_LOCATION = 'SAVE_LOCATION';
export const SAVE_PUNCH_IN_LOCATION = 'SAVE_PUNCH_IN_LOCATION';
export const SAVE_PUNCH_OUT_LOCATION = 'SAVE_PUNCH_OUT_LOCATION';
export const SAVE_LAST_PUNCH_IN_TIME = 'SAVE_LAST_PUNCH_IN_TIME';
export const SAVE_LAST_PUNCH_OUT_TIME = 'SAVE_LAST_PUNCH_OUT_TIME';
// attendance
export const FETCH_ALL_ATTENDANCE_START = 'FETCH_ALL_ATTENDANCE_START';
export const FETCH_ALL_ATTENDANCE_SUCCESS = 'FETCH_ALL_ATTENDANCE_SUCCESS';
export const FETCH_ALL_ATTENDANCE_FAILURE = 'FETCH_ALL_ATTENDANCE_FAILURE';
export const FETCH_ATTENDANCE_START = 'FETCH_ATTENDANCE_START';
export const FETCH_ATTENDANCE_SUCCESS = 'FETCH_ATTENDANCE_SUCCESS';
export const FETCH_ATTENDANCE_FAILURE = 'FETCH_ATTENDANCE_FAILURE';
export const POST_ATTENDANCE_START = 'POST_ATTENDANCE_START';
export const POST_ATTENDANCE_SUCCESS = 'POST_ATTENDANCE_SUCCESS';
export const POST_ATTENDANCE_FAILURE = 'POST_ATTENDANCE_FAILURE';
export const CLEAR_ATTENDANCE_STATE = 'CLEAR_ATTENDANCE_STATE';
export const FETCH_CURRENT_ATTENDANCE_FAILURE =
  'FETCH_CURRENT_ATTENDANCE_FAILURE';
export const FETCH_CURRENT_ATTENDANCE_SUCCESS =
  'FETCH_CURRENT_ATTENDANCE_SUCCESS';
export const FETCH_ADMIN_CURRENT_ATTENDANCE_START =
  'FETCH_ADMIN_CURRENT_ATTENDANCE_START';
export const FETCH_ADMIN_CURRENT_ATTENDANCE_SUCCESS =
  'FETCH_ADMIN_CURRENT_ATTENDANCE_SUCCESS';
export const FETCH_ADMIN_CURRENT_ATTENDANCE_FAILURE =
  'FETCH_ADMIN_CURRENT_ATTENDANCE_FAILURE';
// language
export const SET_LANGUAGE = 'SET_LANGUAGE';
// leaves
export const FETCH_ALL_LEAVES_START = 'FETCH_ALL_LEAVES_START';
export const FETCH_ALL_LEAVES_SUCCESS = 'FETCH_ALL_LEAVES_SUCCESS';
export const FETCH_ALL_LEAVES_FAILURE = 'FETCH_ALL_LEAVES_FAILURE';
export const FETCH_LEAVES_START = 'FETCH_LEAVES_START';
export const FETCH_LEAVES_SUCCESS = 'FETCH_LEAVES_SUCCESS';
export const FETCH_LEAVES_FAILURE = 'FETCH_LEAVES_FAILURE';
export const CLEAR_LEAVES_STATE = 'CLEAR_LEAVES_STATE';
export const POST_LEAVE_START = 'POST_LEAVE_START';
export const POST_LEAVE_SUCCESS = 'POST_LEAVE_SUCCESS';
export const POST_LEAVE_FAILURE = 'POST_LEAVE_FAILURE';
export const UPDATE_LEAVE_STATUS_START = 'UPDATE_LEAVE_STATUS_START';
export const UPDATE_LEAVE_STATUS_SUCCESS = 'UPDATE_LEAVE_STATUS_SUCCESS';
export const UPDATE_LEAVE_STATUS_FAILURE = 'UPDATE_LEAVE_STATUS_FAILURE';
export const PATCH_LEAVE_STATUS_START = 'PATCH_LEAVE_STATUS_START';
export const PATCH_LEAVE_STATUS_SUCCESS = 'PATCH_LEAVE_STATUS_SUCCESS';
export const PATCH_LEAVE_STATUS_FAILURE = 'PATCH_LEAVE_STATUS_FAILURE';
export const DELETE_LEAVE_START = 'DELETE_LEAVE_START';
export const DELETE_LEAVE_SUCCESS = 'DELETE_LEAVE_SUCCESS';
export const DELETE_LEAVE_FAILURE = 'DELETE_LEAVE_FAILURE';
// tasks
export const FETCH_TASKS_START = 'FETCH_TASKS_START';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const CLEAR_TASKS_STATE = 'CLEAR_TASKS_STATE';
export const POST_TASK_START = 'POST_TASK_START';
export const POST_TASK_SUCCESS = 'POST_TASK_SUCCESS';
export const POST_TASK_FAILURE = 'POST_TASK_FAILURE';
export const PATCH_TASK_STATUS_START = 'PATCH_TASK_STATUS_START';
export const PATCH_TASK_STATUS_SUCCESS = 'PATCH_TASK_STATUS_SUCCESS';
export const PATCH_TASK_STATUS_FAILURE = 'PATCH_TASK_STATUS_FAILURE';
// dashboard
export const FETCH_DASHBOARD_COUNT_START = 'FETCH_DASHBOARD_COUNT_START';
export const FETCH_DASHBOARD_COUNT_SUCCESS = 'FETCH_DASHBOARD_COUNT_SUCCESS';
export const FETCH_DASHBOARD_COUNT_FAILURE = 'FETCH_DASHBOARD_COUNT_FAILURE';
export const CLEAR_DASHBOARD_COUNT_STATE = 'CLEAR_DASHBOARD_COUNT_STATE';
// change password
export const CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
// profile
export const FETCH_PROFILE_START = 'FETCH_PROFILE_START';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const FETCH_ALL_PROFILE_START = 'FETCH_ALL_PROFILE_START';
export const FETCH_ALL_PROFILE_SUCCESS = 'FETCH_PROFILE_ALL_SUCCESS';
export const FETCH_ALL_PROFILE_FAILURE = 'FETCH_PROFILE_ALL_FAILURE';
export const CLEAR_PROFILE_STATE = 'CLEAR_PROFILE_STATE';
// profile
export const POST_PROFILE_START = 'POST_PROFILE_START';
export const POST_PROFILE_SUCCESS = 'POST_PROFILE_SUCCESS';
export const POST_PROFILE_FAILURE = 'POST_PROFILE_FAILURE';
export const PATCH_PROFILE_START = 'PATCH_PROFILE_START';
export const PATCH_PROFILE_SUCCESS = 'PATCH_PROFILE_SUCCESS';
export const PATCH_PROFILE_FAILURE = 'PATCH_PROFILE_FAILURE';
// events
export const FETCH_EVENT_START = 'FETCH_EVENT_START';
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';
export const CLEAR_EVENT_STATE = 'CLEAR_EVENT_STATE';
export const POST_EVENT_START = 'POST_EVENT_START';
export const POST_EVENT_SUCCESS = 'POST_EVENT_SUCCESS';
export const POST_EVENT_FAILURE = 'POST_EVENT_FAILURE';
export const PATCH_EVENT_STATUS_START = 'PATCH_EVENT_STATUS_START';
export const PATCH_EVENT_STATUS_SUCCESS = 'PATCH_EVENT_STATUS_SUCCESS';
export const PATCH_EVENT_STATUS_FAILURE = 'PATCH_EVENT_STATUS_FAILURE';
export const DELETE_EVENT_START = 'DELETE_EVENT_START';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';
// settings
export const FETCH_SETTINGS_START = 'FETCH_SETTINGS_START';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
export const FETCH_SETTINGS_FAILURE = 'FETCH_SETTINGS_FAILURE';
export const CLEAR_SETTINGS_STATE = 'CLEAR_SETTINGS_STATE';
export const POST_SETTINGS_START = 'POST_SETTINGS_START';
export const POST_SETTINGS_SUCCESS = 'POST_SETTINGS_SUCCESS';
export const POST_SETTINGS_FAILURE = 'POST_SETTINGS_FAILURE';
// account get user
export const GET_SPECIFIC_USER_START = 'GET_SPECIFIC_USER_START';
export const GET_SPECIFIC_USER_SUCCESS = 'GET_SPECIFIC_USER_SUCCESS';
export const GET_SPECIFIC_USER_FAILURE = 'GET_SPECIFIC_USER_FAILURE';
export const CLEAR_SPECIFIC_USER_DATA = 'CLEAR_SPECIFIC_USER_DATA';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
