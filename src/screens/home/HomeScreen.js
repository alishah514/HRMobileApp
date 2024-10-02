import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/ReusableComponents/Header/Header';
import LogoutConfirmationComponent from '../../components/ReusableComponents/LogoutConfirmationComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../../components/common/Constants';
import styles from './styles';
import CommonStyles from '../../components/common/CommonStyles';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import {useSelector} from 'react-redux';
import {Colors} from '../../components/common/Colors';
import PunchInOut from './PunchComponent/PunchInOut';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import I18n from '../../i18n/i18n';

export default function HomeScreen({navigation}) {
  const handleLogout = LogoutConfirmationComponent();
  const currentLanguage = useSelector(state => state.language);

  // Access values from Redux store
  const reduxTimer = useSelector(state => state.timer);
  const reduxPunchInTime = useSelector(state => state.punchInTime);
  const reduxPunchOutTime = useSelector(state => state.punchOutTime);

  // Local state
  const [punchInTime, setPunchInTime] = useState(reduxPunchInTime || null);
  const [punchOutTime, setPunchOutTime] = useState(reduxPunchOutTime || null);
  const [location, setLocation] = useState(null);

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
                    40
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
                    2
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
                    38
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
              <PunchInOut
                punchInTime={punchInTime}
                punchOutTime={punchOutTime}
                setPunchInTime={setPunchInTime}
                setPunchOutTime={setPunchOutTime}
                reduxTimer={reduxTimer}
                setLocation={setLocation}
              />
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
                      14
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
                      140
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
