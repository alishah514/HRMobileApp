import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import moment from 'moment';
import CommonStyles from '../../components/common/CommonStyles';
import Record from './AttendanceRecord/Record';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';
import {fetchAttendance} from '../../redux/attendance/AttendanceActions';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function AttendanceScreen({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const userId = useSelector(state => state.login.userId);
  const attendanceData = useSelector(state => state.attendance.attendanceData);
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [totalTimeWorked, setTotalTimeWorked] = useState('00:00:00');

  useEffect(() => {
    getAttendance();
  }, []);

  useEffect(() => {
    setDate(today);
  }, [attendanceData]);

  const getAttendance = () => {
    dispatch(fetchAttendance(userId));
  };

  const setDate = date => {
    const filteredData = attendanceData?.filter(item => {
      const creationDate = new Date(item.creationDate);
      const selected = new Date(date);
      return (
        creationDate.getFullYear() === selected.getFullYear() &&
        creationDate.getMonth() === selected.getMonth() &&
        creationDate.getDate() === selected.getDate()
      );
    });

    filteredData?.sort(
      (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
    );

    const attendanceRecords = [];
    let currentRecord = {punchIn: null, punchOut: null};

    filteredData?.forEach(item => {
      const time = new Date(item.creationDate).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      if (item.type === 'PunchIn') {
        if (currentRecord.punchIn && !currentRecord.punchOut) {
          attendanceRecords.push({...currentRecord});
        }
        currentRecord = {punchIn: time, punchOut: null};
      } else if (item.type === 'PunchOut' && currentRecord.punchIn) {
        currentRecord.punchOut = time;
        attendanceRecords.push({...currentRecord});
        currentRecord = {punchIn: null, punchOut: null};
      }
    });

    if (currentRecord.punchIn && !currentRecord.punchOut) {
      attendanceRecords.push(currentRecord);
    }

    const totalTimeWorked = calculateTotalTimeWorked(filteredData);
    setSelectedDate(date);
    setFilteredAttendance(attendanceRecords);
    setTotalTimeWorked(totalTimeWorked);
  };

  const calculateTotalTimeWorked = filteredData => {
    let totalMilliseconds = 0;

    for (let i = 0; i < filteredData?.length - 1; i++) {
      const currentRecord = filteredData[i];
      const nextRecord = filteredData[i + 1];

      if (currentRecord.type === 'PunchIn' && nextRecord.type === 'PunchOut') {
        const punchInTime = new Date(currentRecord.creationDate);
        const punchOutTime = new Date(nextRecord.creationDate);
        totalMilliseconds += punchOutTime - punchInTime;
        i++;
      }
    }

    const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`;
  };

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
        title={I18n.t('attendance')}
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
                      {I18n.t('previous')}
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
                      {I18n.t('next')}
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
            <Record data={filteredAttendance} time={totalTimeWorked} />
          </>
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
