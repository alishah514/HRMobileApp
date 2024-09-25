import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import TimeLine from './TimeLine';

export default function AllTasks({data}) {
  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        All Tasks
      </Text>
      <View style={CommonStyles.paddingTop5} />
      <TimeLine data={data} status={1} />
    </View>
  );
}
