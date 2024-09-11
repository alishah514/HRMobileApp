import {wp} from './Dimensions';

const BASE_URL = 'http://13.230.3.194:51/api'; //qa base url
// const BASE_URL = 'https://api.m3logi.com/api'; //live base url
const BEARER_TOKEN = 'bearer_token';
const USER_ID = 'user_id';
const USER_TYPE_ID = 'user_type_id';
const IS_LOGGED_IN = 'isLoggedIn';
const SELECTED_LANGUAGE = 'selectedLanguage';
const SELECTED_LANGUAGE_ITEM = 'selectedLanguageItem';
const TOGGLE_SWITCH = 'toggleSwitch';
const FCM_TOKEN = 'fcm_token';
const ROLE = 'role';

const ROLE_STATUS = ['Transporter', 'Customer', 'Driver', 'Staff'];

const SIZE = {
  largeIcon: wp('7'),
  medIcon: wp('6'),
  smallIcon: wp('5'),
  xSmallIcon: wp('4'),
};

export default Constants = {
  BASE_URL,
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
};
