import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {Colors} from '../../../components/common/Colors';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CustomerBackgroundComponent from '../../../components/ReusableComponents/CustomerBackgroundComponent';
import TabBarHeader from '../../../components/ReusableComponents/Header/TabBarHeader';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('ali@yahoo.com');
  const [password, setPassword] = useState('123456');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let valid = true;

    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('Email address is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    }

    if (password === '') {
      setPasswordError('Password cannot be empty.');
      valid = false;
    }

    if (valid) {
      navigation.navigate('Home');
    }
  };

  const setState = (stateSetter, text) => {
    setEmailError('');
    setPasswordError('');
    stateSetter(text);
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
            <TabBarHeader title={'LOGIN'} />
            <View
              style={[
                CommonStyles.width80,
                CommonStyles.alignSelf,

                CommonStyles.paddingTop15,
              ]}>
              <InputFieldComponent
                title={'Email'}
                value={email}
                onChangeText={text => setState(setEmail, text)}
                placeholder={'Enter Your Email Address'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!emailError}
                errorMessage={emailError}
              />
              <View style={CommonStyles.paddingVertical2} />
              <InputFieldComponent
                title={'Password'}
                value={password}
                onChangeText={text => setState(setPassword, text)}
                placeholder={'Enter Your Password'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                isPassword={true}
                error={!!passwordError}
                errorMessage={passwordError}
              />
              <View style={CommonStyles.paddingVertical2} />
              <CommonButton title={'LOGIN'} onPress={validateForm} />
              <View style={CommonStyles.paddingVertical2} />
              <Text
                style={[
                  CommonStyles.textBlack,
                  CommonStyles.font4P,
                  CommonStyles.textCenter,
                  CommonStyles.alignSelf,
                  CommonStyles.paddingTop5,
                ]}>
                Don&apos;t have an account?{' '}
                <Text
                  onPress={() => navigation.navigate('Signup')}
                  style={CommonStyles.textYellow}>
                  Sign Up
                </Text>{' '}
                Now
              </Text>
              <View style={CommonStyles.paddingVertical2} />
              <Text
                onPress={() => navigation.navigate('Forgot Password')}
                style={[
                  CommonStyles.textYellow,
                  CommonStyles.font4P,
                  CommonStyles.textCenter,
                  CommonStyles.alignSelf,
                  CommonStyles.paddingTop5,
                ]}>
                Forgot Password?
              </Text>
            </View>
          </>
        }
      />
    </CommonSafeAreaScrollViewComponent>
  );
}
