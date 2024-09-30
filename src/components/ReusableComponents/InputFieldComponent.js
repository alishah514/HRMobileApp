import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../common/CommonStyles';
import {wp} from '../common/Dimensions';
import {Colors} from '../common/Colors';
import Constants from '../common/Constants';

export default InputFieldComponent = ({error, errorMessage, ...rest}) => {
  const [showPassword, setShowPassword] = useState(
    rest.isPassword ? false : undefined,
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{width: rest.halfWidth ? '45%' : '100%'}}>
      <View
        style={[
          CommonStyles.alignStart,
          Platform.OS === 'ios' && CommonStyles.marginBottom2,
          rest.multiline && CommonStyles.paddingBottom1,
        ]}>
        <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
          {rest.title}
        </Text>
      </View>

      <View style={{position: 'relative', justifyContent: 'center'}}>
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
            {
              marginBottom: error ? wp('2') : wp('5'),
              paddingRight: wp('12'),
              borderColor: error ? Colors.redColor : Colors.greyColor,
            },
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
            style={{
              position: 'absolute',
              right: wp('2'),
              top: Platform.OS === 'ios' ? 0 : 20,
            }}
            onPress={togglePasswordVisibility}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={Constants.SIZE.smallIcon}
              color={
                rest.visibleIconColor ? rest.visibleIconColor : Colors.greyColor
              }
            />
          </TouchableOpacity>
        )}
      </View>

      {error && errorMessage ? (
        <Text style={{color: Colors.redColor, paddingBottom: wp('3')}}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};
