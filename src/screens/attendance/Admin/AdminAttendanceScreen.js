import React, {useEffect, useState} from 'react';
import CommonSafeAreaViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../../components/ReusableComponents/Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../components/common/Colors';
import I18n from '../../../i18n/i18n';
import Constants from '../../../components/common/Constants';
import WeeklyCalendarComponent from '../components/WeeklyCalendarComponent';
import moment from 'moment';
import {useAttendanceData} from '../../../hooks/useAttendanceData';
import useProfileData from '../../../hooks/useProfileData';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchAllAttendance} from '../../../redux/attendance/AttendanceActions';

import RNFS from 'react-native-fs';
import {Alert, Platform} from 'react-native';
import ExcelJS from 'exceljs';
import {shareFile} from '../../../components/ReusableComponents/ShareComponent';

export default function AdminAttendanceScreen({navigation}) {
  const dispatch = useDispatch();
  const today = moment().format('YYYY-MM-DD');
  const route = useRoute();
  const status = route?.params?.status ?? null;
  const [selectedDate, setSelectedDate] = useState(today);
  const [employeeList, setEmployeeList] = useState([]);
  const [currentAttendanceList, setCurrentAttendanceList] = useState([]);
  const [weekDates, setWeekDates] = useState({firstDate: null, lastDate: null});

  const {attendanceLoading, allAttendanceData, punchInTime, punchOutTime} =
    useAttendanceData();
  const {allProfile, profileLoading} = useProfileData();

  useEffect(() => {
    dispatch(fetchAllAttendance());
  }, [dispatch, punchInTime, punchOutTime]);

  useEffect(() => {
    setDate(today);
  }, [allAttendanceData]);

  const handleBackIconPress = () => {
    navigation.goBack();
  };
  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const setDate = date => {
    setSelectedDate(date);

    const filteredData = allAttendanceData?.filter(item => {
      const itemDate = moment(item.creationDate).format('YYYY-MM-DD');
      return itemDate === date;
    });
    usersList(filteredData);

    const filteredUserIds = filteredData?.map(item => item.userId);

    const updatedProfile = allProfile?.map(profile => {
      const isPresent = filteredUserIds?.includes(profile.userId);
      return {
        ...profile,
        isPresent: isPresent || false,
      };
    });
    setEmployeeList(updatedProfile);
  };

  const usersList = filteredData => {
    const separatedData = separateByUserId(filteredData);
    const updatedData = addFullNameToData(separatedData, allProfile);

    if (updatedData && typeof updatedData === 'object') {
      const sortedData = Object.keys(updatedData).reduce((acc, userId) => {
        const userData = updatedData[userId];

        const sortedUserData = userData?.sort(
          (a, b) => new Date(a.createTime) - new Date(b.createTime),
        );

        acc[userId] = sortedUserData;
        return acc;
      }, {});

      setCurrentAttendanceList(sortedData);
    } else {
      console.error('Updated data is not an object:', updatedData);
    }
  };

  const separateByUserId = filteredData => {
    const separatedData = {};

    filteredData?.forEach(item => {
      const {userId} = item;

      if (!separatedData[userId]) {
        separatedData[userId] = [];
      }

      separatedData[userId].push(item);
    });

    return separatedData;
  };

  const addFullNameToData = (separatedData, allProfile) => {
    for (const userId in separatedData) {
      const profile = allProfile.find(profile => profile.userId === userId);

      if (profile) {
        separatedData[userId]?.forEach(item => {
          item.fullName = profile.personal.fullName;
        });
      }
    }

    return separatedData;
  };

  const exportToExcel = async () => {
    try {
      const downloadPath =
        Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath || RNFS.ExternalStorageDirectoryPath
          : RNFS.DocumentDirectoryPath;

      if (!downloadPath) {
        throw new Error('Unable to determine the download path.');
      }

      const filePath = `${downloadPath}/Attendance_${selectedDate}.xlsx`;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Attendance');

      createTitleRow(worksheet);
      worksheet.addRow([]);

      let currentRow = 4;

      Object.keys(currentAttendanceList)?.forEach(userId => {
        const userData = currentAttendanceList[userId];
        const userName = userData[0]?.fullName || 'Unknown';

        worksheet.mergeCells(`A${currentRow}:D${currentRow}`);
        const userNameCell = worksheet.getCell(`A${currentRow}`);
        userNameCell.value = userName;
        userNameCell.alignment = {horizontal: 'center', vertical: 'middle'};
        userNameCell.font = {bold: true, size: 12, color: {argb: 'FFFFFFFF'}};
        userNameCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FF4897E6'},
        };

        currentRow++;

        addTableHeaders(worksheet, currentRow);
        currentRow++;

        currentRow = addAttendanceData(worksheet, userData, currentRow);

        const totalWorkTimeFormatted = calculateTotalWorkTime(userData);

        const totalWorkRow = worksheet.addRow([
          'Total Time',
          `${totalWorkTimeFormatted} Hours`,
          '',
          '',
        ]);
        totalWorkRow.eachCell(cell => {
          cell.alignment = {vertical: 'middle', horizontal: 'center'};
          cell.font = {bold: true};
        });

        currentRow++;

        worksheet.addRow([]);
        currentRow++;
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const base64 = buffer.toString('base64');
      await RNFS.writeFile(filePath, base64, 'base64');

      const shareOptions = {
        url: `file://${filePath}`,
        title: `Attendance Report - ${selectedDate}`,
        message: 'Please find the attached attendance file.',
      };
      await shareFile(shareOptions);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'An error occurred',
        error.message || 'Something went wrong.',
      );
    }
  };

  const formatToAmPm = isoString => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const amPm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12 || 12;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${hours}:${formattedMinutes}:${formattedSeconds} ${amPm}`;
  };

  const addAttendanceData = (worksheet, userData, startRow) => {
    let currentRow = startRow;

    userData?.forEach(item => {
      const punchLocationLink =
        item.latitude && item.longitude
          ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
          : 'N/A';

      const formattedTime = item.createTime
        ? formatToAmPm(item.createTime)
        : 'N/A';

      const punchRow = worksheet.addRow([
        item.type,
        formattedTime,
        punchLocationLink !== 'N/A' ? 'View Location' : 'N/A',
        item.imageUrl ? 'View Image' : 'No Image',
      ]);

      punchRow.eachCell(cell => {
        cell.alignment = {vertical: 'middle', horizontal: 'center'};
      });

      if (punchLocationLink !== 'N/A') {
        const locationCell = punchRow.getCell(3);
        locationCell.value = {
          text: 'View Location',
          hyperlink: punchLocationLink,
        };
        locationCell.font = {color: {argb: 'FF0000FF'}, underline: true};
      }

      if (item.imageUrl) {
        const imageCell = punchRow.getCell(4);
        imageCell.value = {text: 'View Image', hyperlink: item.imageUrl};
        imageCell.font = {color: {argb: 'FF0000FF'}, underline: true};
      }

      currentRow++;
    });

    return currentRow;
  };

  const createTitleRow = worksheet => {
    worksheet.mergeCells('A1:D1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'All Employees Daily Attendance';
    titleCell.alignment = {horizontal: 'center', vertical: 'middle'};
    titleCell.font = {bold: true, size: 14};

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;

    worksheet.mergeCells('A2:D2');
    const dateRow = worksheet.getCell('A2');
    dateRow.value = selectedDate;
    dateRow.alignment = {horizontal: 'center', vertical: 'middle'};
    dateRow.font = {bold: true, size: 12};
    dateRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'D3D3D3'},
    };

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
  };

  const addTableHeaders = (worksheet, currentRow) => {
    const headerRow = worksheet.addRow(['Type', 'Time', 'Location', 'Image']);
    headerRow.eachCell(cell => {
      cell.font = {bold: true};
      cell.alignment = {horizontal: 'center'};
    });
  };

  const calculateTotalWorkTime = userData => {
    userData.sort((a, b) => new Date(a.createTime) - new Date(b.createTime));

    let totalWorkTime = 0;
    let lastPunchInTime = null;

    userData?.forEach(item => {
      const currentPunchTime = new Date(item.createTime).getTime();

      if (item.type === 'PunchIn') {
        lastPunchInTime = currentPunchTime;
      } else if (item.type === 'PunchOut' && lastPunchInTime !== null) {
        const punchOutTime = currentPunchTime;
        const workDuration = punchOutTime - lastPunchInTime;

        totalWorkTime += workDuration;

        lastPunchInTime = null;
      }
    });

    const totalWorkSeconds = Math.floor(totalWorkTime / 1000);

    const hours = String(Math.floor(totalWorkSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalWorkSeconds % 3600) / 60)).padStart(
      2,
      '0',
    );
    const seconds = String(totalWorkSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <CommonSafeAreaViewComponent>
      {(attendanceLoading || profileLoading) && <LogoLoaderComponent />}
      <Header
        title={I18n.t('attendance')}
        onLeftIconPressed={
          status === null ? handleDrawerOpen : handleBackIconPress
        }
        leftIcon={
          status === null ? (
            <Ionicons
              name="menu"
              size={Constants.SIZE.medIcon}
              color={Colors.whiteColor}
            />
          ) : (
            <AntDesign
              name="arrowleft"
              size={Constants.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          )
        }
        onRightIconPressed={exportToExcel}
        rightIcon={
          <MaterialCommunityIcons
            name="microsoft-excel"
            size={Constants.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <WeeklyCalendarComponent
        setDate={setDate}
        selectedDate={selectedDate}
        employeeList={employeeList}
        status={status}
        setWeekDates={setWeekDates}
      />
    </CommonSafeAreaViewComponent>
  );
}
