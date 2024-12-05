import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from '../styles';
import I18n from '../../../i18n/i18n';
import {useAttendanceData} from '../../../hooks/useAttendanceData';
import {useDispatch} from 'react-redux';

export default function EmployeeCounts({totalEmployees, navigation}) {
  const {adminCurrentAttendanceData} = useAttendanceData();

  const getUniqueUsersCount = attendanceData => {
    const userIds = new Set();
    attendanceData?.forEach(item => {
      if (item.userId) {
        userIds.add(item.userId);
      }
    });

    return userIds.size;
  };

  const absentCount =
    totalEmployees - getUniqueUsersCount(adminCurrentAttendanceData);

  return (
    <View style={[CommonStyles.width95, CommonStyles.flexRow]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Admin Attendance', {status: 1})}
        style={[
          styles.boxViewTime,
          CommonStyles.shadow,
          CommonStyles.marginHor1,
        ]}>
        <Ionicons
          name={'person'}
          size={Constants.SIZE.largeIcon}
          color={Colors.blueColor}
        />
        <View style={CommonStyles.alignItemsCenter}>
          <Text
            style={[
              CommonStyles.bold5,
              CommonStyles.textBlack,
              CommonStyles.paddingTop1,
            ]}>
            {totalEmployees || 0}
          </Text>
          <Text style={[CommonStyles.lessBold4P, CommonStyles.textBlue]}>
            {I18n.t('employees')}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Admin Attendance', {status: 2})}
        style={[
          styles.boxViewTime,
          CommonStyles.shadow,
          CommonStyles.marginHor1,
        ]}>
        <Ionicons
          name={'person'}
          size={Constants.SIZE.largeIcon}
          color={Colors.greenColor}
        />
        <View style={CommonStyles.alignItemsCenter}>
          <Text
            style={[
              CommonStyles.bold5,
              CommonStyles.textBlack,
              CommonStyles.paddingTop1,
            ]}>
            {getUniqueUsersCount(adminCurrentAttendanceData) || 0}
          </Text>
          <Text style={[CommonStyles.lessBold4P, CommonStyles.textGreen]}>
            {I18n.t('present')}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Admin Attendance', {status: 3})}
        style={[
          styles.boxViewTime,
          CommonStyles.shadow,
          CommonStyles.marginHor1,
        ]}>
        <Ionicons
          name={'person'}
          size={Constants.SIZE.largeIcon}
          color={Colors.redColor}
        />
        <View style={CommonStyles.alignItemsCenter}>
          <Text
            style={[
              CommonStyles.bold5,
              CommonStyles.textBlack,
              CommonStyles.paddingTop1,
            ]}>
            {absentCount || 0}
          </Text>
          <Text style={[CommonStyles.lessBold4, CommonStyles.textRed]}>
            {I18n.t('absent')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
