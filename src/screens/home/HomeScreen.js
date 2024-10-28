import React, {useEffect} from 'react';
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
  fetchDashboardCount,
} from '../../redux/dashboard/DashboardAction';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {fetchUserTasks} from '../../redux/tasks/TaskActions';
import {fetchUserLeaves} from '../../redux/leave/LeaveActions';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const handleLogout = LogoutConfirmationComponent();
  const currentLanguage = useSelector(state => state.language.language);
  const {isLoading, count, error} = useSelector(state => state.dashboard);
  const tasks = useSelector(state => state.tasks.data);
  const leaves = useSelector(state => state.leaves.data);
  const userId = useSelector(state => state.login.userId);

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
    }
  }, [dispatch, userId]);

  const getDashboardCount = () => {
    dispatch(fetchDashboardCount());
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
            size={Constants?.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      {isLoading && <LogoLoaderComponent />}

      <CustomerBackgroundComponent
        topChild={
          <>
            <View style={[styles.rowTitle]}>
              <View style={CommonStyles.width70}>
                <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
                  {I18n.t('goodMorning')}!
                </Text>
                <View style={CommonStyles.paddingTop2}>
                  <Text style={[CommonStyles.bold5, CommonStyles.textWhite]}>
                    Syed Ali Sultan Bukhari
                  </Text>
                  <Text
                    style={[
                      CommonStyles.lessBold4,
                      CommonStyles.textWhite,
                      CommonStyles.paddingTop1,
                    ]}>
                    {I18n.t('goodMorningPray')}!
                  </Text>
                </View>
              </View>
              <Image
                source={require('../../assets/images/sun.png')}
                style={styles.logoIcon}
              />
            </View>
            <View style={[CommonStyles.width95, CommonStyles.flexRow]}>
              <View
                style={[
                  styles.boxViewTime,
                  CommonStyles.shadow,
                  CommonStyles.marginHor1,
                ]}>
                <Ionicons
                  name={'time-outline'}
                  size={Constants.SIZE.xLargeIcon}
                  color={Colors.blueColor}
                />
                <View style={CommonStyles.alignItemsCenter}>
                  <Text style={[CommonStyles.bold5, CommonStyles.textBlack]}>
                    {count?.totalHours}
                  </Text>
                  <Text
                    style={[CommonStyles.lessBold4P, CommonStyles.textBlue]}>
                    {I18n.t('totalHours')}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.boxViewTime,
                  CommonStyles.shadow,
                  CommonStyles.marginHor1,
                ]}>
                <Ionicons
                  name={'checkmark-circle-outline'}
                  size={Constants.SIZE.xLargeIcon}
                  color={Colors.greenColor}
                />

                <View style={CommonStyles.alignItemsCenter}>
                  <Text style={[CommonStyles.bold5, CommonStyles.textBlack]}>
                    {count?.onTime}
                  </Text>
                  <Text
                    style={[CommonStyles.lessBold4P, CommonStyles.textGreen]}>
                    {I18n.t('onTime')}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.boxViewTime,
                  CommonStyles.shadow,
                  CommonStyles.marginHor1,
                ]}>
                <Ionicons
                  name={'alert-circle-outline'}
                  size={Constants.SIZE.xLargeIcon}
                  color={Colors.redColor}
                />

                <View style={CommonStyles.alignItemsCenter}>
                  <Text style={[CommonStyles.bold5, CommonStyles.textBlack]}>
                    {count?.late}
                  </Text>
                  <Text style={[CommonStyles.lessBold4, CommonStyles.textRed]}>
                    {I18n.t('late')}
                  </Text>
                </View>
              </View>
            </View>
          </>
        }
        bottomChild={
          <>
            <ScrollView contentContainerStyle={[styles.infoStarting]}>
              <PunchInOut />
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
                    CommonStyles.marginTop10,
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
