import React, {useEffect, useState} from 'react';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import I18n from '../../i18n/i18n';
import {fetchAttendance} from '../../redux/attendance/AttendanceActions';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {useFocusEffect} from '@react-navigation/native';
import {useLoginData} from '../../hooks/useLoginData';
import WeeklyCalendarComponent from './components/WeeklyCalendarComponent';
import {useAttendanceData} from '../../hooks/useAttendanceData';

import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import ExcelJS from 'exceljs';

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

  const createTitleRow = worksheet => {
    worksheet.mergeCells('A1:C1');
    const titleCell = worksheet.getCell('A1');

    titleCell.value = 'Employee Daily Attendance';

    titleCell.alignment = {horizontal: 'center', vertical: 'middle'};

    titleCell.font = {bold: true, size: 14};

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
  };

  const addEmployeeDetails = (worksheet, employeeName, employeeId) => {
    worksheet.addRow(['Employee Name', employeeName]);
    worksheet.addRow(['Employee ID', employeeId]);
    worksheet.addRow(['Date', selectedDate]);
    worksheet.addRow([]);
  };

  const addTableHeaders = worksheet => {
    const headerRow = worksheet.addRow(['Type', 'Time', 'Location', 'Image']);
    headerRow.font = {bold: true};
    headerRow.alignment = {horizontal: 'center'};
  };

  const addAttendanceData = (worksheet, filteredAttendance) => {
    filteredAttendance.forEach(item => {
      const punchInLocationLink =
        item.latitude && item.longitude
          ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
          : 'N/A';

      const punchInRow = worksheet.addRow([
        'Punch In',
        item.punchIn || 'N/A',
        punchInLocationLink,
        item.imageUrl ? 'View Image' : 'No Image',
      ]);

      if (punchInLocationLink !== 'N/A') {
        const locationCell = punchInRow.getCell(3);
        locationCell.value = {
          text: punchInLocationLink,
          hyperlink: punchInLocationLink,
        };
        locationCell.font = {color: {argb: 'FF0000FF'}, underline: true};
      }

      if (item.imageUrl) {
        const imageCell = punchInRow.getCell(4);
        imageCell.value = {
          text: 'View Image',
          hyperlink: item.imageUrl,
        };
        imageCell.font = {color: {argb: 'FF0000FF'}, underline: true};
      }

      if (item.punchOut) {
        const punchOutLocationLink =
          item.punchOutData?.latitude && item.punchOutData?.longitude
            ? `https://www.google.com/maps?q=${item.punchOutData.latitude},${item.punchOutData.longitude}`
            : 'N/A';

        const punchOutRow = worksheet.addRow([
          'Punch Out',
          item.punchOut,
          punchOutLocationLink,
          item.punchOutData?.imageUrl ? 'View Image' : 'No Image',
        ]);

        if (punchOutLocationLink !== 'N/A') {
          const locationCell = punchOutRow.getCell(3);
          locationCell.value = {
            text: punchOutLocationLink,
            hyperlink: punchOutLocationLink,
          };
          locationCell.font = {color: {argb: 'FF0000FF'}, underline: true};
        }

        if (item.punchOutData?.imageUrl) {
          const imageCell = punchOutRow.getCell(4);
          imageCell.value = {
            text: 'View Image',
            hyperlink: item.punchOutData.imageUrl,
          };
          imageCell.font = {color: {argb: 'FF0000FF'}, underline: true};
        }
      }
    });
  };

  const importAsExcel = async () => {
    const downloadPath =
      Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath || RNFS.ExternalStorageDirectoryPath
        : RNFS.DocumentDirectoryPath;

    if (!downloadPath) {
      Alert.alert(
        'Unable to determine the download path. Please check your device permissions.',
      );
      return;
    }

    const filePath = `${downloadPath}/Attendance_${employeeName.trim()}_${selectedDate}.xlsx`;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    createTitleRow(worksheet);

    worksheet.addRow([]);

    addEmployeeDetails(worksheet, employeeName, employeeId);

    addTableHeaders(worksheet);

    addAttendanceData(worksheet, filteredAttendance);

    const buffer = await workbook.xlsx.writeBuffer();
    const base64 = buffer.toString('base64');

    RNFS.writeFile(filePath, base64, 'base64')
      .then(() => {
        console.log('Excel file written to:', filePath);
        shareFile(filePath);
      })
      .catch(error => {
        console.error('Error writing file:', error);
        Alert.alert(
          'An error occurred while writing the file. Please try again.',
        );
      });
  };

  const shareFile = async filePath => {
    try {
      await Share.open({
        url: `file://${filePath}`,
        title: `${employeeName}'s Daily Attendance Report - ${selectedDate}`,
        message: 'Please find the attached attendance file.',
      });
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.error('Error sharing file:', error);
        Alert.alert(
          'An error occurred while sharing the file. Please try again.',
        );
      }
    }
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
        onRightIconPressed={importAsExcel}
        rightIcon={
          role === 'Admin' &&
          employeeName && (
            <MaterialCommunityIcons
              name="microsoft-excel"
              size={Constants.SIZE.largeIcon}
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
