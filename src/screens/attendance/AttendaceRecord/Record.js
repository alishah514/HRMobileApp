import {View, Text} from 'react-native';
import React from 'react';

import {wp} from '../../../components/common/Dimensions';
import CommonStyles from '../../../components/common/CommonStyles';
import TimeLine from './TimeLine';

export default function Record({data}) {
  return (
    <View style={[CommonStyles.width80, CommonStyles.alignSelf]}>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        Record
      </Text>
      <View style={CommonStyles.paddingTop5} />
      <TimeLine data={data} />
    </View>
  );
}
