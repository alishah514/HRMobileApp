import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import Header from '../../components/ReusableComponents/Header/Header';
import LogoutConfirmationComponent from '../../components/ReusableComponents/LogoutConfirmationComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import styles from './styles';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../components/common/Colors';
import PunchInOut from './PunchComponent/PunchInOut';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import I18n from '../../i18n/i18n';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {clearTasksState, fetchAllTasks} from '../../redux/tasks/TaskActions';
import {
  clearLeavesState,
  fetchAllLeaves,
  fetchUserLeaves,
} from '../../redux/leave/LeaveActions';
import {
  fetchAllProfile,
  fetchProfile,
} from '../../redux/profile/ProfileActions';
import EmployeeCounts from './Admin/EmployeeCounts';
import EmployeeHours from './Employee/EmployeeHours';
import {fetchAttendance} from '../../redux/attendance/AttendanceActions';
import useProfileData from '../../hooks/useProfileData';
import useTaskData from '../../hooks/useTaskData';
import useLeaveData from '../../hooks/useLeaveData';
import {useLoginData} from '../../hooks/useLoginData';
import WishComponent from './components/WishComponent';
import LeaveTaskComponent from './components/LeaveTaskComponent';
import {
  clearSpecificUserData,
  fetchAllUsers,
} from '../../redux/accounts/AccountActions';
import {clearAnnouncementsState} from '../../redux/announcements/AnnouncementActions';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const handleLogout = LogoutConfirmationComponent();
  const {language: currentLanguage} = useSelector(state => state.language);
  const [isLoading, setIsLoading] = useState(false);
  const {profile, allProfile, profileLoading} = useProfileData();
  const {tasksLoading} = useTaskData();
  const {leavesLoading} = useLeaveData();
  const {userId, role} = useLoginData();

  useEffect(() => {
    dispatch(fetchAllProfile());
    dispatch(clearSpecificUserData());
    dispatch(fetchAllUsers());
    dispatch(fetchAllTasks());
    dispatch(clearLeavesState());
    dispatch(clearTasksState());
    dispatch(clearAnnouncementsState());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      if (role === 'Employee') {
        dispatch(fetchUserLeaves(userId));
      } else {
        dispatch(fetchAllLeaves());
      }

      dispatch(fetchAttendance(userId));
      dispatch(fetchProfile(userId));
    }
  }, [dispatch, userId]);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title={I18n.t('home')}
        onRightIconPressed={handleLogout}
        rightIcon={
          <Ionicons
            name="log-out-outline"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      {(profileLoading || tasksLoading || leavesLoading || isLoading) && (
        <LogoLoaderComponent />
      )}

      <CustomerBackgroundComponent
        topChild={
          <>
            <WishComponent data={profile} />

            {role === 'Admin' ? (
              <EmployeeCounts
                navigation={navigation}
                totalEmployees={allProfile?.length}
              />
            ) : (
              <EmployeeHours data={profile} />
            )}
          </>
        }
        bottomChild={
          <>
            <ScrollView contentContainerStyle={[styles.infoStarting]}>
              <PunchInOut
                username={profile?.personal?.fullName}
                setIsLoading={setIsLoading}
              />

              <LeaveTaskComponent navigation={navigation} />
            </ScrollView>
          </>
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
