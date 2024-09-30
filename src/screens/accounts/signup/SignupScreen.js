import {View, Text, Image, Dimensions, Platform} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {Colors} from '../../../components/common/Colors';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CustomerBackgroundComponent from '../../../components/ReusableComponents/CustomerBackgroundComponent';
import TabBarHeader from '../../../components/ReusableComponents/Header/TabBarHeader';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {hp} from '../../../components/common/Dimensions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SignupScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateForm = () => {
    let valid = true;

    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (username === '') {
      setUsernameError('Username is required');
      valid = false;
    } else if (email === '') {
      setEmailError('Email address is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else if (password === '') {
      setPasswordError('Password cannot be empty.');
      valid = false;
    } else if (confirmPassword === '') {
      setConfirmPasswordError('Please Re-enter your password.');
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Password must match with Confirm Password.');
      valid = false;
    }

    if (valid) {
      navigation.navigate('Home');
    }
  };

  const stateClearErrors = () => {
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const setState = (stateSetter, text, clearErrors = false) => {
    stateSetter(text);
    if (clearErrors) {
      stateClearErrors();
    }
  };

  return (
    <CommonSafeAreaScrollViewComponent>
      <CustomerBackgroundComponent
        topSmall
        topChild={
          <>
            <View>
              <Image
                source={require('../../../assets/images/AppLogoWhite.png')}
                style={{
                  width: screenWidth * 0.8,
                  height: screenHeight * 0.8,
                }}
                resizeMode="contain"
              />
            </View>
          </>
        }
        bottomChild={
          <>
            <TabBarHeader title={'SIGNUP'} />
            <View
              style={[
                CommonStyles.width80,
                CommonStyles.alignSelf,
                CommonStyles.paddingTop15,
              ]}>
              <InputFieldComponent
                title={'Username'}
                value={username}
                onChangeText={text => setState(setUsername, text, true)}
                placeholder={'Enter Your Username'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!usernameError}
                errorMessage={usernameError}
              />

              {Platform.OS === 'ios' && (
                <View style={CommonStyles.paddingVertical2} />
              )}

              <InputFieldComponent
                title={'Email'}
                value={email}
                onChangeText={text => setState(setEmail, text, true)}
                placeholder={'Enter Your Email Address'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!emailError}
                errorMessage={emailError}
              />
              {Platform.OS === 'ios' && (
                <View style={CommonStyles.paddingVertical2} />
              )}
              <InputFieldComponent
                title={'Password'}
                value={password}
                onChangeText={text => setState(setPassword, text, true)}
                placeholder={'Enter Your Password'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                isPassword={true}
                error={!!passwordError}
                errorMessage={passwordError}
              />
              {Platform.OS === 'ios' && (
                <View style={CommonStyles.paddingVertical2} />
              )}
              <InputFieldComponent
                title={'Confirm Password'}
                value={confirmPassword}
                onChangeText={text => setState(setConfirmPassword, text, true)}
                placeholder={'Re-Enter Your Password'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                isPassword={true}
                error={!!confirmPasswordError}
                errorMessage={confirmPasswordError}
              />

              <CommonButton title={'REGISTER'} onPress={validateForm} />

              <View style={CommonStyles.paddingTop3} />

              <Text
                style={[
                  CommonStyles.textBlack,
                  CommonStyles.font4P,
                  CommonStyles.textCenter,
                  CommonStyles.alignSelf,
                ]}>
                Already have account?{' '}
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={CommonStyles.textYellow}>
                  Login
                </Text>{' '}
                Now
              </Text>
            </View>
          </>
        }
      />
    </CommonSafeAreaScrollViewComponent>
  );
}
