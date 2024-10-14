import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import I18n from './i18n/i18n';
import AppNavigator from './navigation/AppNavigator';
import {setLanguage} from './redux/language/LanguageActions';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);

  useEffect(() => {
    const initializeLanguage = async () => {
      if (currentLanguage) {
        dispatch(setLanguage(currentLanguage));
        I18n.locale = currentLanguage === 'Japanese' ? 'ja' : 'en';
      }
    };
    initializeLanguage();
  }, [dispatch]);

  return <AppNavigator />;
};

export default AppWrapper;
