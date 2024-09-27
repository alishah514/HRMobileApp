import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../components/common/CommonStyles';
import {Colors} from '../../components/common/Colors';
import CommonSafeAreaScrollViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import InputFieldComponent from '../../components/ReusableComponents/InputFieldComponent';
import CommonButton from '../../components/ReusableComponents/CommonComponents/CommonButton';
import styles from './styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SignupScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <CommonSafeAreaScrollViewComponent>
      <CustomerBackgroundComponent
        topSmall
        topChild={
          <>
            <View style={{}}>
              <Image
                source={require('../../assets/images/AppLogoWhite.png')}
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
                {alignItems: 'flex-start'},
                CommonStyles.paddingTop25,
              ]}>
              <InputFieldComponent
                title={'Username'}
                value={username}
                onChangeText={setUsername}
                placeholder={'Enter Your Username'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
              />
              <View style={CommonStyles.paddingVertical2} />

              <InputFieldComponent
                title={'Email'}
                value={email}
                onChangeText={setEmail}
                placeholder={'Enter Your Email Address'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
              />
              <View style={CommonStyles.paddingVertical2} />
              <InputFieldComponent
                title={'Password'}
                value={password}
                onChangeText={setPassword}
                placeholder={'Enter Your Password'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                isPassword={true}
              />
              <View style={CommonStyles.paddingVertical2} />
              <InputFieldComponent
                title={'Confirm Password'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={'Re-Enter Your Password'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                isPassword={true}
              />
              <View style={CommonStyles.paddingVertical2} />

              <CommonButton
                title={'REGISTER'}
                onPress={() => navigation.navigate('Home')}
              />
              <View style={CommonStyles.paddingVertical2} />
              <Text
                style={[
                  CommonStyles.textBlack,
                  CommonStyles.font4P,
                  CommonStyles.textCenter,
                  CommonStyles.alignSelf,
                  CommonStyles.paddingTop5,
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
