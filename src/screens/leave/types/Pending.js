import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import Timeline from './Timeline';

export default function Pending() {
  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        Pending
      </Text>
      <View style={CommonStyles.paddingTop5} />
      <Timeline />
    </View>
  );
}
