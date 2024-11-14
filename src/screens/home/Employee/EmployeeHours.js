import {View, Text} from 'react-native';
import React from 'react';
import styles from '../styles';
import CommonStyles from '../../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import I18n from '../../../i18n/i18n';

export default function EmployeeHours({data}) {
  return (
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
            {data?.totalHours}
          </Text>
          <Text style={[CommonStyles.lessBold4P, CommonStyles.textBlue]}>
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
            {data?.onTime}
          </Text>
          <Text style={[CommonStyles.lessBold4P, CommonStyles.textGreen]}>
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
            {data?.late}
          </Text>
          <Text style={[CommonStyles.lessBold4, CommonStyles.textRed]}>
            {I18n.t('late')}
          </Text>
        </View>
      </View>
    </View>
  );
}
