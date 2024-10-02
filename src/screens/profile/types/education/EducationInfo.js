import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../../components/common/CommonStyles';
import EducationalTimeline from './EducationalTimeline';
import {useSelector} from 'react-redux';
import I18n from '../../../../i18n/i18n';

export default function EducationInfo() {
  const currentLanguage = useSelector(state => state.language);

  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        {I18n.t('educationalInfo')}
      </Text>
      <View style={CommonStyles.paddingTop5} />
      <EducationalTimeline />
    </View>
  );
}
