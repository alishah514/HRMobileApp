import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';

export default function PersonalInfo() {
  const currentLanguage = useSelector(state => state.language);

  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        {I18n.t('personalInfo')}
      </Text>
      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            {I18n.t('employeeId')}
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
            {I18n.t('fullName')}
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
            {I18n.t('phone')}
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
            {I18n.t('email')}
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
            {I18n.t('dateOfBirth')}
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
            {I18n.t('gender')}
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
