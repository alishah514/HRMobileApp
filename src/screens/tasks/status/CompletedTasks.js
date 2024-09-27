import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import TimeLine from './TimeLine';

export default function CompletedTasks({data}) {
  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        Completed Tasks
      </Text>

      <TimeLine data={data} />
    </View>
  );
}
