import {View, Text, TouchableOpacity, Platform} from 'react-native';
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
  outlined = false,
  half = false,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={
        style
          ? [style, disabled && {opacity: 0.5}]
          : [
              Platform.OS === 'ios' && CommonStyles.shadow,
              half ? styles.halfButton : styles.button,
              {
                backgroundColor: disabled
                  ? Colors.greyColor
                  : outlined
                  ? 'transparent'
                  : backgroundColor
                  ? backgroundColor
                  : Colors.blueColor,
                borderColor: outlined
                  ? titleColor || Colors.blueColor
                  : 'transparent',
                borderWidth: outlined ? 1 : 0,
                opacity: disabled ? 0.5 : 1,
              },
            ]
      }
      onPress={!disabled ? onPress : null}>
      <Text
        style={[
          CommonStyles.lessBold5,
          {
            color: titleColor
              ? titleColor
              : outlined
              ? titleColor || Colors.blueColor
              : Colors.whiteColor,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
