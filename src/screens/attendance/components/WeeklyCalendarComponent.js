import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import {Colors} from '../../../components/common/Colors';
import CommonStyles from '../../../components/common/CommonStyles';
import Constants from '../../../components/common/Constants';
import moment from 'moment';
import CustomerBackgroundComponent from '../../../components/ReusableComponents/CustomerBackgroundComponent';
import I18n from '../../../i18n/i18n';
import Record from '../AttendanceRecord/Record';
import {useLoginData} from '../../../hooks/useLoginData';
import AttendanceList from '../Admin/AttendanceList';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function WeeklyCalendarComponent({
  setDate,
  selectedDate,
  filteredAttendance,
  totalTimeWorked,
  employeeList,
  status,
  employeeName,
}) {
  const {role} = useLoginData();

  const today = moment().format('YYYY-MM-DD');
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

  const filteredEmployeeList = () => {
    if (status === 1) {
      return employeeList;
    } else if (status === 2) {
      return employeeList.filter(item => item?.isPresent === true);
    } else if (status === 3) {
      return employeeList.filter(item => item?.isPresent === false);
    } else {
      return employeeList;
    }
  };

  return (
    <CustomerBackgroundComponent
      topSmall
      topChild={
        <>
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
                size={Constants.SIZE.largeIcon}
                color={Colors.whiteColor}
              />
            </View>

            <View style={[CommonStyles.centerView, CommonStyles.paddingTop7]}>
              <FlatList
                data={weekDates}
                keyExtractor={item => item.date}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => setDate(item.date)}>
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
        </>
      }
      bottomChild={
        <>
          <View style={CommonStyles.mainPadding}>
            <View style={[CommonStyles.rowBetween]}>
              <TouchableOpacity style={CommonStyles.flexRow} onPress={prevWeek}>
                <View style={styles.arrowBox}>
                  <Ionicons
                    name="arrow-back"
                    size={Constants.SIZE.medIcon}
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
                    {I18n.t('previous')}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={CommonStyles.flexRow} onPress={nextWeek}>
                <View style={CommonStyles.justifyCenter}>
                  <Text
                    style={[
                      CommonStyles.lessBold5,
                      CommonStyles.textYellow,
                      CommonStyles.paddingRight3,
                    ]}>
                    {I18n.t('next')}
                  </Text>
                </View>
                <View style={styles.arrowBox}>
                  <Ionicons
                    name="arrow-forward"
                    size={Constants.SIZE.medIcon}
                    color={Colors.yellowColor}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {role === 'Employee' || (role === 'Admin' && employeeName) ? (
            <Record
              data={filteredAttendance}
              time={totalTimeWorked}
              employeeName={employeeName}
            />
          ) : (
            <AttendanceList
              data={filteredEmployeeList()}
              status={status}
              selectedDate={selectedDate}
            />
          )}
        </>
      }
    />
  );
}
