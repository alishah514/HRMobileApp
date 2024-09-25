import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../common/CommonStyles';
import {wp} from '../common/Dimensions';

export default function CustomerBackgroundComponent({
  topChild,
  bottomChild,
  zParent,
  topSmall,
  topVerySmall,
}) {
  return (
    <View style={CommonStyles.backgroundBlue}>
      <View
        style={[
          topSmall
            ? CommonStyles.topSmallCurveView
            : topVerySmall
            ? CommonStyles.topVerySmallCurveView
            : CommonStyles.curveView,
          {zIndex: zParent && 1},
        ]}>
        {topChild}
      </View>
      <View
        style={[
          topSmall
            ? CommonStyles.topSmallBackgroundCurve
            : topVerySmall
            ? CommonStyles.topVerySmallBackgroundCurve
            : CommonStyles.backgroundCurve,
        ]}>
        {bottomChild}
      </View>
    </View>
  );
}
