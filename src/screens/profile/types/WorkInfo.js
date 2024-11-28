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

  const formatTime = time => {
    const numericTime = Number(time);
    if (isNaN(numericTime)) {
      console.log('Invalid time:', time);
      return 'null';
    }

    const isAM = numericTime < 12;
    const formattedHours = isAM
      ? numericTime === 0
        ? 12
        : numericTime
      : numericTime - 12 || 12;
    const period = isAM ? 'AM' : 'PM';

    const formattedTime = `${formattedHours}:00 ${period}`;

    return formattedTime;
  };

  const calculateWorkDuration = (punchIn, punchOut) => {
    punchIn = Number(punchIn);
    punchOut = Number(punchOut);

    if (isNaN(punchIn) || isNaN(punchOut)) {
      console.error('Invalid punchIn or punchOut values:', punchIn, punchOut);
      return 'null';
    }

    const duration = punchOut - punchIn;
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} Hours`;
  };

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
      <View style={CommonStyles.paddingTop5}>
        <View style={CommonStyles.rowBetween}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.textBlack,
              CommonStyles.lessBold300,
            ]}>
            {I18n.t('punchInTime')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {data?.punchInTime ? formatTime(data.punchInTime) : 'null'}
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
            {I18n.t('punchOutTime')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {data?.punchOutTime ? formatTime(data.punchOutTime) : 'null'}
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
            {I18n.t('totalWorkHours')}
          </Text>
          <View style={[CommonStyles.flexRow, CommonStyles.centerView]}>
            <Text
              style={[
                CommonStyles.font5,
                CommonStyles.textBlack,
                CommonStyles.Bold600,
                CommonStyles.paddingRight1,
              ]}>
              {data?.punchInTime && data?.punchOutTime
                ? calculateWorkDuration(data.punchInTime, data.punchOutTime)
                : 'null'}
            </Text>
          </View>
        </View>
        <View style={CommonStyles.borderLineWithoutMargin} />
      </View>
    </View>
  );
}
