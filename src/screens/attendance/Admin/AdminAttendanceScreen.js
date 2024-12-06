import React, {useEffect, useState} from 'react';
import CommonSafeAreaViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../../components/ReusableComponents/Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

export default function AdminAttendanceScreen({navigation}) {
  const dispatch = useDispatch();

  const today = moment().format('YYYY-MM-DD');
  const route = useRoute();
  const {status} = route.params;
  const [selectedDate, setSelectedDate] = useState(today);
  const [employeeList, setEmployeeList] = useState([]);
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

  const setDate = date => {
    setSelectedDate(date);

    const filteredData = allAttendanceData?.filter(item => {
      const itemDate = moment(item.creationDate).format('YYYY-MM-DD');
      return itemDate === date;
    });

    const filteredUserIds = filteredData?.map(item => item.userId);

    const updatedProfile = allProfile?.map(profile => {
      const isPresent = filteredUserIds?.includes(profile.userId);
      return {
        ...profile,
        isPresent: isPresent || false,
      };
    });
    setEmployeeList(updatedProfile);

    console.log('updatedProfile', updatedProfile);
  };

  return (
    <CommonSafeAreaViewComponent>
      {(attendanceLoading || profileLoading) && <LogoLoaderComponent />}
      <Header
        title={I18n.t('attendance')}
        onLeftIconPressed={handleBackIconPress}
        leftIcon={
          <AntDesign
            name="arrowleft"
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
      />
    </CommonSafeAreaViewComponent>
  );
}
