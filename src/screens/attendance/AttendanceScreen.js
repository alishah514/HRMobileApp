import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import {hp, wp} from '../../components/common/Dimensions';
import moment from 'moment';
import CommonStyles from '../../components/common/CommonStyles';

import {data} from './AttendaceRecord/data';
import Record from './AttendaceRecord/Record';
import styles from './styles';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function AttendanceScreen({navigation}) {
  const today = moment().format('YYYY-MM-DD'); // Get today's date in 'YYYY-MM-DD' format
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));

  const getWeekDates = weekStart => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push({
        day: weekDays[i],
        date: moment(weekStart).add(i, 'days').format('YYYY-MM-DD'),
      });
    }
    return weekDates;
  };

  const prevWeek = () => {
    setCurrentWeek(moment(currentWeek).subtract(1, 'week'));
  };

  const nextWeek = () => {
    setCurrentWeek(moment(currentWeek).add(1, 'week'));
  };

  const weekDates = getWeekDates(currentWeek);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title="Attendance"
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants?.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topSmall
        topChild={
          <View style={[CommonStyles.alignSelf, CommonStyles.fullWidth]}>
            <View
              style={[
                CommonStyles.rowBetween,
                CommonStyles.alignItemsCenter,
                CommonStyles.paddingHor5,
              ]}>
              <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
                {moment(selectedDate).format('MMMM, YYYY')}
              </Text>
              <Ionicons
                name="calendar-outline"
                size={Constants?.SIZE.largeIcon}
                color={Colors.whiteColor}
              />
            </View>

            <View style={[CommonStyles.centerView, CommonStyles.paddingTop7]}>
              <FlatList
                data={weekDates}
                keyExtractor={item => item.date}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => setSelectedDate(item.date)}>
                    <View style={[CommonStyles.alignItemsCenter]}>
                      <View
                        style={[
                          styles.calendarDateView,
                          {
                            backgroundColor:
                              selectedDate === item.date
                                ? Colors.whiteColor
                                : Colors.blueColor,
                          },
                        ]}>
                        <Text
                          style={[
                            CommonStyles.lessBold4P,
                            {
                              color:
                                selectedDate === item.date
                                  ? Colors.blackColor
                                  : Colors.whiteColor,
                            },
                          ]}>
                          {item.day}
                        </Text>
                        <Text
                          style={[
                            CommonStyles.lessBold4P,
                            {
                              color:
                                selectedDate === item.date
                                  ? Colors.blackColor
                                  : Colors.whiteColor,
                            },
                          ]}>
                          {item.date.split('-')[2]}
                        </Text>
                      </View>
                      {item.date === today && (
                        <View style={[styles.currentDayDot]} />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        }
        bottomChild={
          <>
            <View style={CommonStyles.mainPadding}>
              <View style={[CommonStyles.rowBetween]}>
                <TouchableOpacity
                  style={CommonStyles.flexRow}
                  onPress={prevWeek}>
                  <View style={styles.arrowBox}>
                    <Ionicons
                      name="arrow-back"
                      size={Constants?.SIZE.medIcon}
                      color={Colors.yellowColor}
                    />
                  </View>
                  <View style={CommonStyles.justifyCenter}>
                    <Text
                      style={[
                        CommonStyles.lessBold5,
                        CommonStyles.textYellow,
                        CommonStyles.paddingLeft3,
                      ]}>
                      {'Previous'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={CommonStyles.flexRow}
                  onPress={nextWeek}>
                  <View style={CommonStyles.justifyCenter}>
                    <Text
                      style={[
                        CommonStyles.lessBold5,
                        CommonStyles.textYellow,
                        CommonStyles.paddingRight3,
                      ]}>
                      {'Next '}
                    </Text>
                  </View>
                  <View style={styles.arrowBox}>
                    <Ionicons
                      name="arrow-forward"
                      size={Constants?.SIZE.medIcon}
                      color={Colors.yellowColor}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Record data={data} />
          </>
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
