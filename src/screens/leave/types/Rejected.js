import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import Timeline from './Timeline';

export default function Rejected() {
  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        Rejected
      </Text>
      <View style={CommonStyles.paddingTop5} />
      <Timeline />
    </View>
  );
}
