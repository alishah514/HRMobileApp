import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Constants from './components/common/Constants';
import {getData} from './services/StorageService';
import {setLanguage} from './redux/actions/actions';
import I18n from './i18n/i18n';
import AppNavigator from './navigation/AppNavigator';

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeLanguage = async () => {
      const storedLanguage = await getData(Constants.SELECTED_LANGUAGE);
      if (storedLanguage) {
        dispatch(setLanguage(storedLanguage));
        I18n.locale = storedLanguage === 'English' ? 'en' : 'ja';
      }
    };
    initializeLanguage();
  }, [dispatch]);

  return <AppNavigator />;
};

export default AppWrapper;
