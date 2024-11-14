import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from '../styles';
import I18n from '../../../i18n/i18n';

export default function EmployeeCounts({data}) {
  return (
    <View style={[CommonStyles.width95, CommonStyles.flexRow]}>
      <View
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
            {data?.totalEmployees}
          </Text>
          <Text style={[CommonStyles.lessBold4P, CommonStyles.textBlue]}>
            {I18n.t('employees')}
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
            {data?.onTime}
          </Text>
          <Text style={[CommonStyles.lessBold4P, CommonStyles.textGreen]}>
            {I18n.t('present')}
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
            {data?.late}
          </Text>
          <Text style={[CommonStyles.lessBold4, CommonStyles.textRed]}>
            {I18n.t('absent')}
          </Text>
        </View>
      </View>
    </View>
  );
}
