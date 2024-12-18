import React, {useEffect, useState} from 'react';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import moment from 'moment';
import Record from './AttendanceRecord/Record';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';
import {fetchAttendance} from '../../redux/attendance/AttendanceActions';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {useFocusEffect} from '@react-navigation/native';
import {useLoginData} from '../../hooks/useLoginData';
import WeeklyCalendarComponent from './components/WeeklyCalendarComponent';
import {useAttendanceData} from '../../hooks/useAttendanceData';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function AttendanceScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {userId, role} = useLoginData();

  const employeeId = route?.params?.employeeId;
  const passedDate = route?.params?.selectedDate;
  const employeeName = route?.params?.employeeName;

  const {attendanceData, attendanceLoading} = useAttendanceData();

  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [totalTimeWorked, setTotalTimeWorked] = useState('00:00:00');

  useFocusEffect(
    React.useCallback(() => {
      getAttendance();
    }, [route]),
  );

  const getAttendance = () => {
    if (role === 'Employee') {
      dispatch(fetchAttendance(userId));
    } else {
      dispatch(fetchAttendance(employeeId));
    }
  };

  useEffect(() => {
    if (role === 'Employee') {
      setDate(today);
    } else {
      setDate(passedDate);
    }
  }, [attendanceData, route]);

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
    let currentRecord = null;

    filteredData?.forEach(item => {
      const time = new Date(item.creationDate).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      if (item.type === 'PunchIn') {
        if (currentRecord && !currentRecord.punchOut) {
          attendanceRecords.push({...currentRecord});
        }

        currentRecord = {...item, punchIn: time, punchOut: null};
      } else if (
        item.type === 'PunchOut' &&
        currentRecord &&
        currentRecord.punchIn
      ) {
        currentRecord.punchOut = time;
        currentRecord.punchOutData = {...item};
        attendanceRecords.push({...currentRecord});
        currentRecord = null;
      }
    });

    if (currentRecord && !currentRecord.punchOut) {
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

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };
  const handleBackIconPress = () => {
    navigation.goBack();
  };

  return (
    <CommonSafeAreaViewComponent>
      {attendanceLoading && <LogoLoaderComponent />}
      <Header
        title={I18n.t('attendance')}
        onLeftIconPressed={
          role === 'Admin' ? handleBackIconPress : handleDrawerOpen
        }
        leftIcon={
          role === 'Admin' ? (
            <AntDesign
              name="arrowleft"
              size={Constants.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          ) : (
            <Ionicons
              name="menu"
              size={Constants.SIZE.medIcon}
              color={Colors.whiteColor}
            />
          )
        }
      />

      <WeeklyCalendarComponent
        setDate={setDate}
        selectedDate={selectedDate}
        filteredAttendance={filteredAttendance}
        totalTimeWorked={totalTimeWorked}
        employeeName={employeeName}
      />
    </CommonSafeAreaViewComponent>
  );
}
