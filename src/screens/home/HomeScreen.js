import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/ReusableComponents/Header/Header';
import LogoutConfirmationComponent from '../../components/ReusableComponents/LogoutConfirmationComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../../components/common/Constants';
import styles from './styles';
import CommonStyles from '../../components/common/CommonStyles';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../components/common/Colors';
import PunchInOut from './PunchComponent/PunchInOut';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import I18n from '../../i18n/i18n';
import {
  clearDashboardCountState,
  fetchUserDashboardCount,
} from '../../redux/dashboard/DashboardAction';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {fetchUserTasks} from '../../redux/tasks/TaskActions';
import {fetchUserLeaves} from '../../redux/leave/LeaveActions';
import {fetchProfile} from '../../redux/profile/ProfileActions';
import EmployeeCounts from './Admin/EmployeeCounts';
import EmployeeHours from './Employee/EmployeeHours';
import {fetchAttendance} from '../../redux/attendance/AttendanceActions';

const getGreetingMessage = () => {
  const currentHour = new Date().getHours();
  let greetingMessage;
  let wishMessage;

  if (currentHour < 12) {
    greetingMessage = I18n.t('goodMorning');
    wishMessage = I18n.t('goodMorningPray');
  } else if (currentHour < 18) {
    greetingMessage = I18n.t('goodAfternoon');
    wishMessage = I18n.t('goodAfternoonPray');
  } else {
    greetingMessage = I18n.t('goodEvening');
    wishMessage = I18n.t('goodEveningPray');
  }

  return {
    greeting: `${greetingMessage}!`,
    wish: wishMessage,
  };
};

export default function HomeScreen({navigation}) {
  const {greeting, wish} = getGreetingMessage();
  const dispatch = useDispatch();
  const handleLogout = LogoutConfirmationComponent();

  const [isLoading, setIsLoading] = useState(false);
  const currentLanguage = useSelector(state => state.language.language);

  const {isLoading: dashboardLoading, count} = useSelector(
    state => state.dashboard,
  );
  const {userId, role} = useSelector(state => state.login);
  const {data: profile, isLoading: profileLoading} = useSelector(
    state => state.profile,
  );
  const {data: tasks, isLoading: tasksLoading} = useSelector(
    state => state.tasks,
  );
  const {data: leaves, isLoading: leavesLoading} = useSelector(
    state => state.leaves,
  );
  const validTaskCount =
    tasks?.filter(task => task.name !== null && task.name !== '').length || 0;

  const validLeavesCount =
    leaves?.filter(leave => leave.name !== null && leave.name !== '').length ||
    0;

  useEffect(() => {
    getDashboardCount();
    return () => {
      dispatch(clearDashboardCountState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserLeaves(userId));
      dispatch(fetchUserTasks(userId));
      dispatch(fetchAttendance(userId));
      fetchUserProfile(userId);
      getDashboardCount(userId);
    }
  }, [dispatch, userId]);

  const fetchUserProfile = userId => {
    dispatch(fetchProfile(userId));
  };

  const getDashboardCount = userId => {
    dispatch(fetchUserDashboardCount(userId));
  };

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
      {(dashboardLoading ||
        profileLoading ||
        tasksLoading ||
        leavesLoading ||
        isLoading) && <LogoLoaderComponent />}

      <CustomerBackgroundComponent
        topChild={
          <>
            <View style={[styles.rowTitle]}>
              <View style={CommonStyles.width70}>
                <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
                  {greeting}
                </Text>
                <View style={CommonStyles.paddingTop2}>
                  <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
                    {profile?.personal?.fullName}
                  </Text>
                  <Text
                    style={[
                      CommonStyles.lessBold4,
                      CommonStyles.textWhite,
                      CommonStyles.paddingTop1,
                    ]}>
                    {wish}
                  </Text>
                </View>
              </View>
              <Image
                source={require('../../assets/images/sun.png')}
                style={styles.logoIcon}
              />
            </View>

            {role === 'Admin' ? (
              <EmployeeCounts data={count} />
            ) : (
              <EmployeeHours data={count} />
            )}
          </>
        }
        bottomChild={
          <>
            <ScrollView contentContainerStyle={[styles.infoStarting]}>
              <PunchInOut setIsLoading={setIsLoading} />
              <View style={[CommonStyles.rowBetween, styles.width80Center]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Task')}
                  style={[styles.boxView, CommonStyles.shadow]}>
                  <View style={[styles.circleView, CommonStyles.yellowBorder]}>
                    <MaterialCommunityIcons
                      name={'bag-personal-outline'}
                      size={Constants.SIZE.xLargeIcon}
                      color={Colors.yellowColor}
                    />
                  </View>
                  <View style={CommonStyles.alignItemsCenter}>
                    <Text
                      style={[
                        CommonStyles.bold6,
                        CommonStyles.textBlack,
                        CommonStyles.marginVertical2,
                      ]}>
                      {validTaskCount}
                    </Text>
                    <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
                      {I18n.t('tasks')}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Leave')}
                  style={[
                    styles.boxView,
                    CommonStyles.marginTop8,
                    CommonStyles.shadow,
                  ]}>
                  <View style={[styles.circleView, CommonStyles.blueBorder]}>
                    <Ionicons
                      name={'receipt-outline'}
                      size={Constants.SIZE.xLargeIcon}
                      color={Colors.blueColor}
                    />
                  </View>
                  <View style={CommonStyles.alignItemsCenter}>
                    <Text
                      style={[
                        CommonStyles.bold6,
                        CommonStyles.textBlack,
                        CommonStyles.marginVertical2,
                      ]}>
                      {validLeavesCount}
                    </Text>
                    <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
                      {I18n.t('leaves')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
