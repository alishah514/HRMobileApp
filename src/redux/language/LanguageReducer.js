import {SET_LANGUAGE} from '../actions/actionTypes';
import I18n from '../../i18n/i18n';

const initialState = {
  language: 'en',
};

const LanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      I18n.locale = action.payload;
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default LanguageReducer;
