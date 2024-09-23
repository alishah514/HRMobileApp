import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import Timeline from './Timeline';
import {Colors} from '../../../components/common/Colors';

export default function Rejected({data, toggleViewLeaveRequestModal}) {
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
      <Timeline
        data={data}
        color={Colors.redColor}
        toggleViewLeaveRequestModal={toggleViewLeaveRequestModal}
      />
    </View>
  );
}
