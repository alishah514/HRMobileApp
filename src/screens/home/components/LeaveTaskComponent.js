import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import styles from '../styles';
import useTaskData from '../../../hooks/useTaskData';
import useLeaveData from '../../../hooks/useLeaveData';
import I18n from '../../../i18n/i18n';
import {useLoginData} from '../../../hooks/useLoginData';

export default function LeaveTaskComponent({navigation}) {
  const {validTaskCount} = useTaskData();
  const {validLeavesCount, validAllLeavesCount} = useLeaveData();
  const {role} = useLoginData();
  return (
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
        style={[styles.boxView, CommonStyles.marginTop8, CommonStyles.shadow]}>
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
            {role === 'Employee' ? validLeavesCount : validAllLeavesCount}
          </Text>
          <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
            {I18n.t('leaves')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
