import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Colors} from '../../components/common/Colors';
import {wp} from '../../components/common/Dimensions';
import CommonStyles from '../../components/common/CommonStyles';

// Configure the locale
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
  dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
};
LocaleConfig.defaultLocale = 'en';

const EventCalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState('2019-01-01');

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        style={styles.parentStyle}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: Colors.orangeColor,
            disableTouchEvent: true,
          },
          // '2019-01-08': {
          //   marked: true,
          //   dotColor: Colors.orangeColor,
          // },
          // '2019-01-15': {marked: true, dotColor: Colors.orangeColor},
          // '2019-01-22': {marked: true, dotColor: Colors.orangeColor},
          // '2019-01-25': {marked: true, dotColor: Colors.orangeColor},
        }}
      />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>New event</Text>
        <View style={[CommonStyles.rowBetween, CommonStyles.paddingTop3]}>
          <Text style={styles.eventDate}>Start Date: Jan 1, 2024</Text>
          <Text style={styles.eventDate}>End Date: Jan 8, 2024</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentStyle: {
    borderWidth: wp(0.5),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    borderBottomRightRadius: wp(2.5),
    borderBottomLeftRadius: wp(2.5),
    borderColor: Colors.orangeColor,
  },
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: Colors.whiteColor,
  },
  eventDetails: {
    paddingVertical: wp(3.5),
  },
  eventTitle: {
    fontSize: wp(5),
    fontWeight: '600',
    paddingTop: wp(2),
  },
  eventDate: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: Colors.blackColor,
  },
});

export default EventCalendarComponent;
