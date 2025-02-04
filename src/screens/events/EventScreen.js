import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from '../../components/common/CommonStyles';
import Header from '../../components/ReusableComponents/Header/Header';
import I18n from '../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import EventCalendarComponent from './EventCalendarComponent';
import {fetchEvents, fetchMonthlyEvents} from '../../redux/events/EventActions';
import ManageEventModal from './modals/ManageEventModal';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {useEventData} from '../../hooks/useEventData';
import {useLoginData} from '../../hooks/useLoginData';

export default function EventScreen({navigation}) {
  const dispatch = useDispatch();
  const {role} = useLoginData();
  const {events, isLoading, monthlyEvents} = useEventData();
  const currentLanguage = useSelector(state => state.language.language);
  const [isManageEventModalVisible, setIsManageEventModalVisible] =
    useState(false);
  const [monthDates, setMonthDates] = useState({
    firstDate: null,
    lastDate: null,
  });

  useEffect(() => {
    if (monthDates) {
      getEvents();
    }
  }, [monthDates]);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const getEvents = () => {
    dispatch(fetchMonthlyEvents(monthDates));
  };

  const toggleManageEventModal = item => {
    setIsManageEventModalVisible(!isManageEventModalVisible);
  };

  return (
    <CommonSafeAreaViewComponent>
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
        onRightIconPressed={toggleManageEventModal}
        rightIcon={
          role === 'Admin' && (
            <MaterialCommunityIcons
              name="calendar-plus"
              size={Constants.SIZE.medIcon}
              color={Colors.whiteColor}
            />
          )
        }
      />
      {isLoading && <LogoLoaderComponent />}
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
            <EventCalendarComponent
              data={monthlyEvents}
              setMonthDates={setMonthDates}
              monthDates={monthDates}
            />
          </>
        }
      />
      <ManageEventModal
        isModalVisible={isManageEventModalVisible}
        toggleModal={toggleManageEventModal}
      />
    </CommonSafeAreaViewComponent>
  );
}
