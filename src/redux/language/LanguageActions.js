import {SET_LANGUAGE} from '../actions/actionTypes';

export const setLanguage = language => ({
  type: SET_LANGUAGE,
  payload: language,
});
