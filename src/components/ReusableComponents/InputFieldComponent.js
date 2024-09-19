import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Platform, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../common/CommonStyles';
import {wp} from '../common/Dimensions';
import {Colors} from '../common/Colors';
import Constants from '../common/Constants';

export default InputFieldComponent = ({...rest}) => {
  const [showPassword, setShowPassword] = useState(
    rest.isPassword ? false : undefined,
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <View
        style={[
          CommonStyles.alignStart,
          rest.multiline && CommonStyles.paddingBottom1,
        ]}>
        <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
          {rest.title}
        </Text>
      </View>
      <TextInput
        value={rest.value}
        keyboardType={
          rest.numeric ? 'numeric' : rest.email ? 'email-address' : 'default'
        }
        multiline={rest.multiline}
        placeholder={rest.placeholder}
        style={[
          CommonStyles.InputField,
          rest.multiline
            ? CommonStyles.multilineInput
            : CommonStyles.inputContainer,
        ]}
        placeholderTextColor={
          rest.placeholderColor
            ? rest.placeholderColor
            : Colors.placeholderColorDark
        }
        secureTextEntry={rest.isPassword && !showPassword}
        editable={!rest.disabled}
        {...rest}
      />
      {rest.isPassword && (
        <TouchableOpacity
          style={CommonStyles.alignSelf}
          onPress={togglePasswordVisibility}>
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={Constants.SIZE.smallIcon}
            color={
              !rest.visibleIconColor ? Colors.whiteColor : rest.visibleIconColor
            }
          />
        </TouchableOpacity>
      )}
    </>
  );
};
