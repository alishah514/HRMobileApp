import {View, Text} from 'react-native';
import React from 'react';

import {wp} from '../../../components/common/Dimensions';
import CommonStyles from '../../../components/common/CommonStyles';
import TimeLine from './TimeLine';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import NoRecordView from '../../../components/ReusableComponents/NoRecordView';

export default function Record({data, time}) {
  const currentLanguage = useSelector(state => state.language.language);

  const isNoData = !data || data?.length === 0;

  return (
    <View style={[CommonStyles.width80, CommonStyles.alignSelf]}>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        {I18n.t('record')}
      </Text>

      <View style={CommonStyles.paddingTop5} />

      {isNoData ? (
        <View style={CommonStyles.height100}>
          <NoRecordView errorMessage="No Record Found" />
        </View>
      ) : (
        <TimeLine data={data} time={time} />
      )}
    </View>
  );
}
