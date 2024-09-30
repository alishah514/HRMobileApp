import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {Colors} from '../../../components/common/Colors';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CustomerBackgroundComponent from '../../../components/ReusableComponents/CustomerBackgroundComponent';
import TabBarHeader from '../../../components/ReusableComponents/Header/TabBarHeader';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import styles from './styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateForm = () => {
    let valid = true;

    setEmailError('');

    if (email === '') {
      setEmailError('Email address is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    }

    if (valid) {
      navigation.navigate('Home');
    }
  };

  const setState = (stateSetter, text) => {
    setEmailError('');
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
            <TabBarHeader title={'FORGOT PASSWORD'} />
            <View
              style={[
                CommonStyles.width80,
                CommonStyles.alignSelf,
                CommonStyles.paddingTop20,
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
              <CommonButton title={'RESET PASSWORD'} onPress={validateForm} />
              <View style={CommonStyles.paddingVertical2} />
              <Text
                onPress={() => navigation.navigate('Login')}
                style={[
                  CommonStyles.textYellow,
                  CommonStyles.font4P,
                  CommonStyles.textCenter,
                  CommonStyles.alignSelf,
                  CommonStyles.paddingTop5,
                ]}>
                Back To Login
              </Text>
            </View>
          </>
        }
      />
    </CommonSafeAreaScrollViewComponent>
  );
}
