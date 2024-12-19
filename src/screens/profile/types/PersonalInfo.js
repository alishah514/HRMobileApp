import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import {formatDate} from '../../../components/utils/dateUtils';
import NoRecordView from '../../../components/ReusableComponents/NoRecordView';

export default function PersonalInfo({data, employeeId}) {
  const currentLanguage = useSelector(state => state.language.language);

  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={CommonStyles.height100}>
        <NoRecordView errorMessage={'No Record Found'} />
      </View>
    );
  }

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
                CommonStyles.font4,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle(employeeId || 'null', 20)}
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
              {TruncateTitle(data?.fullName || 'null', 18)}
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
          {console.log('data', data)}
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              +{TruncateTitle(data?.phone || 'null', 13)}
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
              {TruncateTitle(data?.email || 'null', 20)}
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
              {formatDate(data?.birthDate) || 'null'}
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
              {data?.gender || 'null'}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>
    </View>
  );
}
