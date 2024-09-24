import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../common/CommonStyles';
import {wp} from '../common/Dimensions';

export default function CustomerBackgroundComponent({
  topChild,
  bottomChild,
  zParent,
  topShort,
}) {
  return (
    <View style={CommonStyles.backgroundBlue}>
      <View
        style={[
          topShort ? CommonStyles.topShortCurveView : CommonStyles.curveView,
          {zIndex: zParent && 1},
        ]}>
        {topChild}
      </View>
      <View
        style={[
          topShort
            ? CommonStyles.topShortBackgroundCurve
            : CommonStyles.backgroundCurve,
        ]}>
        {bottomChild}
      </View>
    </View>
  );
}
