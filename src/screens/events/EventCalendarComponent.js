import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Colors} from '../../components/common/Colors';
import CommonStyles from '../../components/common/CommonStyles';
import styles from './styles';

// Ensure LocaleConfig is correctly defined
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
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Ensure this is correctly defined
  today: 'Today', // Add this field to avoid potential issues
};
LocaleConfig.defaultLocale = 'en'; // Ensure this matches the defined locale

export default function EventCalendarComponent({data}) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [eventDetails, setEventDetails] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (!data || data.length === 0) return;

    const dates = {};
    data.forEach(event => {
      if (event.startDate && event.endDate) {
        const startDate = event.startDate.split('T')[0];
        const endDate = event.endDate.split('T')[0];

        if (startDate === endDate) {
          dates[startDate] = {marked: true, dotColor: Colors.orangeColor};
        } else {
          let currentDate = new Date(startDate);
          const end = new Date(endDate);

          while (currentDate <= end) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            dates[formattedDate] = {marked: true, dotColor: Colors.orangeColor};
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      }
    });

    // Add selected date styling
    if (selectedDate) {
      dates[selectedDate] = {
        ...dates[selectedDate], // Preserve existing marking if any
        selected: true,
        selectedColor: Colors.orangeColor,
        disableTouchEvent: true,
      };
    }

    setMarkedDates(dates);
  }, [data, selectedDate]);

  const handleDayPress = day => {
    setSelectedDate(day.dateString);

    const event = data.find(event => {
      const startDate = event.startDate.split('T')[0];
      const endDate = event.endDate.split('T')[0];
      return day.dateString >= startDate && day.dateString <= endDate;
    });

    setEventDetails(event || null); // Reset if no event found
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        style={styles.parentStyle}
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />
      {eventDetails ? (
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{eventDetails.title}</Text>
          <View
            style={[
              CommonStyles.rowBetween,
              CommonStyles.paddingVertical3,
              CommonStyles.paddingRight3,
            ]}>
            <Text style={styles.eventDate}>
              Start Date:{' '}
              {new Date(eventDetails.startDate).toLocaleDateString()}
            </Text>
            <Text style={styles.eventDate}>
              End Date: {new Date(eventDetails.endDate).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.eventDescription}>
            {eventDetails.description || eventDetails.decription}{' '}
            {/* Handle typo */}
          </Text>
        </View>
      ) : (
        <View style={[styles.eventDetails]}>
          <Text style={styles.eventDate}>No Event on this Date</Text>
        </View>
      )}
    </View>
  );
}
