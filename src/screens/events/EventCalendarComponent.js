import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Colors} from '../../components/common/Colors';
import CommonStyles from '../../components/common/CommonStyles';
import styles from './styles';
import {useLoginData} from '../../hooks/useLoginData';
import ManageEventModal from './modals/ManageEventModal';
import {useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

export default function EventCalendarComponent({
  data,
  setMonthDates,
  monthDates,
}) {
  const {role} = useLoginData();
  const currentLanguage = useSelector(state => state.language.language);

  const [isManageEventModalVisible, setIsManageEventModalVisible] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [eventDetails, setEventDetails] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (!data || data.length === 0) return;

    const dates = {};
    data.forEach(event => {
      if (event.startDate && event.endDate) {
        const startDate = event.startDate.split('T')[0];
        const endDate = event.endDate.split('T')[0];

        let currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
          const formattedDate = currentDate.toISOString().split('T')[0];
          dates[formattedDate] = {
            marked: true,
            dotColor:
              formattedDate === selectedDate
                ? Colors.white
                : Colors.orangeColor,
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });

    if (selectedDate) {
      dates[selectedDate] = {
        ...dates[selectedDate],
        selected: true,
        selectedColor: Colors.orangeColor,
        disableTouchEvent: true,
      };
    }

    setMarkedDates(dates);
    handleDayPress({dateString: selectedDate});
  }, [data, selectedDate]);

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    const event = data.find(event => {
      const startDate = event?.startDate?.split('T')[0];
      const endDate = event?.endDate?.split('T')[0];
      return day.dateString >= startDate && day.dateString <= endDate;
    });
    setEventDetails(event || null);
  };

  const toggleManageEventModal = () => {
    setIsManageEventModalVisible(!isManageEventModalVisible);
  };

  const getMonthDates = dateString => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();

    const firstDate = new Date(Date.UTC(year, month, 1))
      .toISOString()
      .split('T')[0];

    const lastDate = new Date(Date.UTC(year, month + 1, 0))
      .toISOString()
      .split('T')[0];

    return {firstDate, lastDate};
  };

  useEffect(() => {
    if (setMonthDates) {
      setMonthDates(getMonthDates(currentMonth));
    }
  }, [currentMonth]);

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        style={styles.parentStyle}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        enableSwipeMonths
        onMonthChange={month => {
          const newMonth = new Date(month.dateString);
          setCurrentMonth(newMonth);
        }}
      />

      {eventDetails ? (
        <View style={styles.eventDetails}>
          <View
            style={[CommonStyles.rowBetween, CommonStyles.alignItemsCenter]}>
            <Text style={styles.eventTitle}>{eventDetails.title}</Text>
            {role === 'Admin' && (
              <TouchableOpacity onPress={toggleManageEventModal}>
                <Text
                  style={[
                    CommonStyles.textBlue,
                    CommonStyles.font4,
                    CommonStyles.underlineText,
                    CommonStyles.paddingRight3,
                  ]}>
                  Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={[
              CommonStyles.rowBetween,
              CommonStyles.paddingVertical3,
              CommonStyles.paddingRight3,
            ]}>
            <Text style={styles.eventDate}>
              {I18n.t('startDate')}:{' '}
              {new Date(eventDetails.startDate).toLocaleDateString()}
            </Text>
            <Text style={styles.eventDate}>
              {I18n.t('endDate')}:{' '}
              {new Date(eventDetails.endDate).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.eventDescription}>
            {eventDetails.description}
          </Text>
        </View>
      ) : (
        <View style={styles.eventDetails}>
          <Text style={styles.eventDate}>{I18n.t('noEventOnThisDate')}</Text>
        </View>
      )}

      <ManageEventModal
        isModalVisible={isManageEventModalVisible}
        toggleModal={toggleManageEventModal}
        isEdit
        data={eventDetails}
        monthDates={monthDates}
      />
    </View>
  );
}
