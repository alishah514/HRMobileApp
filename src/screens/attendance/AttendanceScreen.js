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
import {fetchWeeklyUserAttendance} from '../../redux/attendance/AttendanceActions';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {useLoginData} from '../../hooks/useLoginData';
import WeeklyCalendarComponent from './components/WeeklyCalendarComponent';
import {useAttendanceData} from '../../hooks/useAttendanceData';

import RNFS from 'react-native-fs';
import {Alert, Platform} from 'react-native';
import ExcelJS from 'exceljs';
import {shareFile} from '../../components/ReusableComponents/ShareComponent';
import {CalculateTotalTime} from '../../components/utils/CalculateTotalTime';

export default function AttendanceScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {userId, role} = useLoginData();

  const employeeId = route?.params?.employeeId;
  const passedDate = route?.params?.selectedDate;
  const employeeName = route?.params?.employeeName;

  const {isUserWeeklyAttendanceLoading, weeklyUserAttendanceData} =
    useAttendanceData();

  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [totalTimeWorked, setTotalTimeWorked] = useState('00:00:00');
  const [weekDates, setWeekDates] = useState({firstDate: null, lastDate: null});

  useEffect(() => {
    getAttendance(weekDates);
  }, [weekDates, route]);

  const getAttendance = weekDates => {
    if (role === 'Employee') {
      dispatch(
        fetchWeeklyUserAttendance(
          userId,
          weekDates?.firstDate,
          weekDates?.lastDate,
        ),
      );
    } else {
      dispatch(
        fetchWeeklyUserAttendance(
          employeeId,
          weekDates?.firstDate,
          weekDates?.lastDate,
        ),
      );
    }
  };

  useEffect(() => {
    if (role === 'Employee') {
      setDate(today);
    } else {
      setDate(passedDate);
    }
  }, [weeklyUserAttendanceData, route]);

  const setDate = date => {
    const filteredData = weeklyUserAttendanceData?.filter(item => {
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

  const exportToExcel = async () => {
    try {
      const downloadPath =
        Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath || RNFS.ExternalStorageDirectoryPath
          : RNFS.DocumentDirectoryPath;

      if (!downloadPath) {
        throw new Error(
          'Unable to determine the download path. Please check your device permissions.',
        );
      }

      const filePath = `${downloadPath}/Attendance_${employeeName.trim()}_${selectedDate}.xlsx`;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Attendance');

      createTitleRow(worksheet);
      worksheet.addRow([]);
      addEmployeeDetails(worksheet, employeeName, employeeId);
      addTableHeaders(worksheet);
      addAttendanceData(worksheet, filteredAttendance);

      const totalTime = CalculateTotalTime(filteredAttendance);

      addTotalTimeRow(worksheet, totalTime);

      const buffer = await workbook.xlsx.writeBuffer();
      const base64 = buffer.toString('base64');

      await RNFS.writeFile(filePath, base64, 'base64');

      const shareOptions = {
        url: `file://${filePath}`,
        title: `${employeeName}'s Daily Attendance Report - ${selectedDate}`,
        message: 'Please find the attached attendance file.',
      };

      await shareFile(shareOptions);
    } catch (error) {
      console.error('Error:', error);

      Alert.alert(
        'An error occurred',
        error.message || 'Something went wrong. Please try again.',
      );
    }
  };

  const createTitleRow = worksheet => {
    worksheet.mergeCells('A1:D1');
    const titleCell = worksheet.getCell('A1');

    titleCell.value = 'Employee Daily Attendance';

    titleCell.alignment = {horizontal: 'center', vertical: 'middle'};

    titleCell.font = {bold: true, size: 14};

    worksheet.getColumn(1).width = 25;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 25;

    worksheet.getColumn(1).alignment = {horizontal: 'center'};
    worksheet.getColumn(2).alignment = {horizontal: 'center'};
    worksheet.getColumn(3).alignment = {horizontal: 'center'};
    worksheet.getColumn(4).alignment = {horizontal: 'center'};
  };

  const addEmployeeDetails = (worksheet, employeeName, employeeId) => {
    const employeeNameRow = worksheet.addRow(['Employee Name', employeeName]);
    const employeeIdRow = worksheet.addRow(['Employee ID', employeeId]);
    const dateRow = worksheet.addRow(['Date', selectedDate]);

    employeeNameRow.font = {bold: true};
    employeeIdRow.font = {bold: true};
    dateRow.font = {bold: true};

    worksheet.addRow([]);
  };

  const addTableHeaders = worksheet => {
    const headerRow = worksheet.addRow(['Type', 'Time', 'Location', 'Image']);
    headerRow.font = {bold: true};
    headerRow.alignment = {horizontal: 'center'};

    worksheet.getColumn(1).width = 25;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 25;

    worksheet.getColumn(1).alignment = {horizontal: 'center'};
    worksheet.getColumn(2).alignment = {horizontal: 'center'};
    worksheet.getColumn(3).alignment = {horizontal: 'center'};
    worksheet.getColumn(4).alignment = {horizontal: 'center'};
  };

  const addAttendanceData = (worksheet, filteredAttendance) => {
    filteredAttendance.forEach(item => {
      const punchInData = processPunchData(
        item,
        'Punch In',
        item.latitude,
        item.longitude,
        item.imageUrl,
      );
      const punchInRow = worksheet.addRow(punchInData);

      formatRow(punchInRow, 3, item.latitude, item.longitude, item.imageUrl);

      // Process Punch Out data if available
      if (item.punchOut) {
        const punchOutData = processPunchData(
          item,
          'Punch Out',
          item.punchOutData?.latitude,
          item.punchOutData?.longitude,
          item.punchOutData?.imageUrl,
        );
        const punchOutRow = worksheet.addRow(punchOutData);

        // Apply location and image formatting for Punch Out
        formatRow(
          punchOutRow,
          3,
          item.punchOutData?.latitude,
          item.punchOutData?.longitude,
          item.punchOutData?.imageUrl,
        );
      }
    });
  };

  // Function to process punch data
  const processPunchData = (item, punchType, latitude, longitude, imageUrl) => {
    const locationLink =
      latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}`
        : 'N/A';

    return [
      punchType,
      item.punchIn || item.punchOut || 'N/A',
      locationLink !== 'N/A' ? 'View Location' : 'N/A',
      imageUrl ? 'View Image' : 'No Image',
    ];
  };

  // Function to format the row with links and styles
  const formatRow = (row, locationCellIndex, latitude, longitude, imageUrl) => {
    const locationLink =
      latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}`
        : 'N/A';

    if (locationLink !== 'N/A') {
      const locationCell = row.getCell(locationCellIndex);
      locationCell.value = {
        text: 'View Location',
        hyperlink: locationLink,
      };
      locationCell.font = {color: {argb: 'FF0000FF'}, underline: true};
    }

    if (imageUrl) {
      const imageCell = row.getCell(4);
      imageCell.value = {
        text: 'View Image',
        hyperlink: imageUrl,
      };
      imageCell.font = {color: {argb: 'FF0000FF'}, underline: true};
    }
  };

  const addTotalTimeRow = (worksheet, totalTime) => {
    const totalRow = worksheet.addRow([
      'Total Time',
      `${totalTime} Hours`,
      '',
      '',
    ]);
    totalRow.font = {bold: true};
    totalRow.alignment = {horizontal: 'center'};

    worksheet.getColumn(1).width = 25;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 25;

    worksheet.getColumn(1).alignment = {horizontal: 'center'};
    worksheet.getColumn(2).alignment = {horizontal: 'center'};
    worksheet.getColumn(3).alignment = {horizontal: 'center'};
    worksheet.getColumn(4).alignment = {horizontal: 'center'};
  };

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };
  const handleBackIconPress = () => {
    navigation.goBack();
  };

  return (
    <CommonSafeAreaViewComponent>
      {isUserWeeklyAttendanceLoading && <LogoLoaderComponent />}
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
        onRightIconPressed={exportToExcel}
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
        setWeekDates={setWeekDates}
      />
    </CommonSafeAreaViewComponent>
  );
}
