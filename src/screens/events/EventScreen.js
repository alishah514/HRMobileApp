import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import CommonStyles from '../../components/common/CommonStyles';
import Header from '../../components/ReusableComponents/Header/Header';
import I18n from '../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import EventCalendarComponent from './EventCalendarComponent';
import {fetchEvents} from '../../redux/events/EventActions';

export default function EventScreen({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const events = useSelector(state => state.events.data);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    getLeaves();
  }, []);

  const getLeaves = () => {
    dispatch(fetchEvents());
  };

  useEffect(() => {
    console.log('event:', events);
  }, [events]);

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Header
        title={I18n.t('events')}
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topVerySmall
        topChild={
          <View
            style={[
              CommonStyles.rowBetween,
              CommonStyles.width90,
              CommonStyles.alignItemsCenter,
            ]}>
            <Text style={[CommonStyles.lessBold5P, CommonStyles.textWhite]}>
              {I18n.t('events')}
            </Text>

            <Ionicons
              name={'calendar-clear-outline'}
              size={Constants.SIZE.xLargeIcon}
              color={Colors.whiteColor}
            />
          </View>
        }
        bottomChild={
          <>
            <View style={CommonStyles.paddingTop10} />
            <EventCalendarComponent />
          </>
        }
      />
    </SafeAreaView>
  );
}
