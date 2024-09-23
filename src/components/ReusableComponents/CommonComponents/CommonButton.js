import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CommonStyles from '../../common/CommonStyles';
import {hp, wp} from '../../common/Dimensions';
import {Colors} from '../../common/Colors';
import styles from './styles';

export default function CommonButton({
  title,
  titleColor,
  backgroundColor,
  style,
  disabled = false,
  onPress,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={
        style
          ? [style, disabled && {opacity: 0.5}]
          : [
              CommonStyles.shadow,
              styles.button,
              {
                backgroundColor: disabled
                  ? Colors.greyColor
                  : backgroundColor
                  ? backgroundColor
                  : Colors.blueColor,

                opacity: disabled ? 0.5 : 1,
              },
            ]
      }
      onPress={!disabled ? onPress : null}>
      <Text
        style={[
          CommonStyles.lessBold4P,
          {color: titleColor ? titleColor : Colors.whiteColor},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
