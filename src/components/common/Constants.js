import {wp} from './Dimensions';

const BASE_URL = 'http://13.230.3.194:51/api'; //qa base url
// const BASE_URL = 'https://api.m3logi.com/api'; //live base url
const FIREBASE_URL =
  'https://firestore.googleapis.com/v1/projects/hr-mobile-app-b0880/databases/(default)/documents';
const FIREBASE_POST_URL =
  'https://firestore.googleapis.com/v1/projects/hr-mobile-app-b0880/databases/(default)/documents:runQuery?';
const FIREBASE_KEY = 'AIzaSyAZMgFWsw1kyKfMcTIcW78YnnQOqoiIQjY';
const BEARER_TOKEN = 'bearer_token';
const USER_ID = 'user_id';
const USER_TYPE_ID = 'user_type_id';
const IS_LOGGED_IN = 'isLoggedIn';
const SELECTED_LANGUAGE = 'selectedLanguage';
const SELECTED_LANGUAGE_ITEM = 'selectedLanguageItem';
const TOGGLE_SWITCH = 'toggleSwitch';
const FCM_TOKEN = 'fcm_token';
const ROLE = 'role';
const TASKS = 'tasks';
const LEAVES = 'leaves';
const EMPLOYEES = 'employees';
const ATTENDANCE = 'attendance';
const DASHBOARD = 'dashboard';
const EVENTS = 'events';
const ROLE_STATUS = ['Admin', 'Staff'];
const ENCR_PASS = 'M3LOGI512';
const ENCR_SALT = 'XYZ';
const ENCR_COST = 5000;
const ENCR_LENGTH = 256;
const STRING_BYTE = 'CodeDecode@512';

const SIZE = {
  xxLargeIcon: wp('18'),
  xLargeIcon: wp('9'),
  largeIcon: wp('7'),
  medIcon: wp('6'),
  smallIcon: wp('5'),
  xSmallIcon: wp('4'),
};

export default Constants = {
  BASE_URL,
  FIREBASE_URL,
  FIREBASE_POST_URL,
  FIREBASE_KEY,
  BEARER_TOKEN,
  USER_ID,
  USER_TYPE_ID,
  IS_LOGGED_IN,
  SELECTED_LANGUAGE,
  SELECTED_LANGUAGE_ITEM,
  TOGGLE_SWITCH,
  FCM_TOKEN,
  ROLE,
  ROLE_STATUS,
  SIZE,
  TASKS,
  LEAVES,
  EMPLOYEES,
  ATTENDANCE,
  DASHBOARD,
  EVENTS,
  ENCR_PASS,
  ENCR_SALT,
  ENCR_COST,
  ENCR_LENGTH,
  STRING_BYTE,
};
