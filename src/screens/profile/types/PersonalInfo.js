import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';

export default function PersonalInfo() {
  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        Personal Info
      </Text>
      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            Employee ID
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle('85')}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>
      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            Full Name
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle('Syed Ali Sultan')}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>
      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            Phone
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle('123456789')}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>
      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            Email
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle('ali@yahoo.com')}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>

      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            Date of Birth
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle('01-01-2012')}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>
      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            Gender
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle('Male')}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>
    </View>
  );
}
