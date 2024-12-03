import React, {useEffect} from 'react';
import GoogleCalendar from './GoogleCalendar';
import {SafeAreaView} from 'react-native';
import CommonStyles from '../../components/common/CommonStyles';
import Header from '../../components/ReusableComponents/Header/Header';
import I18n from '../../i18n/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSettings} from '../../redux/settings/SettingsAction';

export default function CalendarScreen({navigation}) {
  const dispatch = useDispatch();

<<<<<<< HEAD
  const {settings, isLoading: calendarLoading} = useSelector(
    state => state.settings,
  );
=======
  const {settings} = useSelector(state => state.settings);
>>>>>>> 302f3c41842252f18f7701df6aeb1d7ff45ccdad

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Header
        title={I18n.t('googleCalendar')}
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />

      <GoogleCalendar
        calendarId={settings[0]?.calendarId}
        timezone={settings[0]?.timezone}
<<<<<<< HEAD
        calendarLoading={calendarLoading}
=======
>>>>>>> 302f3c41842252f18f7701df6aeb1d7ff45ccdad
      />
    </SafeAreaView>
  );
}
