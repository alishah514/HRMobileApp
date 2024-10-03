import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from './redux/actions/actions';
import I18n from './i18n/i18n';
import AppNavigator from './navigation/AppNavigator';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language);

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
