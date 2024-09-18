import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../../components/common/CommonStyles';
import EducationalTimeline from './EducationalTimeline';

export default function EducationInfo() {
  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        Educational Info
      </Text>
      <View style={CommonStyles.paddingTop5} />
      <EducationalTimeline />
    </View>
  );
}
