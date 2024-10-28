import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import {formatDate} from '../../../components/utils/dateUtils';
import {PaymentRegex} from '../../../components/utils/PaymentRegex';
import NoRecordView from '../../../components/ReusableComponents/NoRecordView';

export default function WorkInfo({data}) {
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
        {I18n.t('jobInfo')}
      </Text>
      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            {I18n.t('designation')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle(data?.Designation || 'null', 20)}
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
            {I18n.t('department')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle(data?.Department || 'null', 20)}
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
            {I18n.t('joiningDate')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {formatDate(data?.JoiningDate) || 'null'}
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
            {I18n.t('employmentType')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle(data?.employmentType || 'null', 20)}
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
            {I18n.t('salary')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {PaymentRegex(data?.salary) + ' pkr' || 'null'}
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
            {I18n.t('wagesType')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {TruncateTitle(data?.wageType || 'null', 20)}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>
    </View>
  );
}
