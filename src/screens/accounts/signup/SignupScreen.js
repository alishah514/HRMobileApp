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
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import {signupAction} from '../../../redux/signup/SignupActions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SignupScreen({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);

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
      setUsernameError(I18n.t('usernameRequired'));
      valid = false;
    } else if (email === '') {
      setEmailError(I18n.t('emailRequired'));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(I18n.t('emailInvalid'));
      valid = false;
    } else if (password === '') {
      setPasswordError(I18n.t('passwordRequired'));
      valid = false;
    } else if (confirmPassword === '') {
      setConfirmPasswordError(I18n.t('confirmPasswordRequired'));
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(I18n.t('passwordMismatch'));
      valid = false;
    }

    if (valid) {
      createUser();
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

  const createUser = () => {
    const userData = {
      name: username,
      email: email,
      password: password,
      token: 'abcd123token',
      id: 102,
      role: 'Admin',
    };

    dispatch(signupAction(userData, navigation));
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
            <TabBarHeader title={I18n.t('SIGNUP')} />
            <View
              style={[
                CommonStyles.width80,
                CommonStyles.alignSelf,
                CommonStyles.paddingTop15,
              ]}>
              <InputFieldComponent
                title={I18n.t('username')}
                value={username}
                onChangeText={text => setState(setUsername, text)}
                placeholder={I18n.t('enterYourUsername')}
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
                title={I18n.t('email')}
                value={email}
                onChangeText={text => setState(setEmail, text)}
                placeholder={I18n.t('enterYourEmailAddress')}
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
                title={I18n.t('password')}
                value={password}
                onChangeText={text => setState(setPassword, text)}
                placeholder={I18n.t('enterYourPassword')}
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
                title={I18n.t('confirmPassword')}
                value={confirmPassword}
                onChangeText={text => setState(setConfirmPassword, text)}
                placeholder={I18n.t('reEnterYourPassword')}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                isPassword={true}
                error={!!confirmPasswordError}
                errorMessage={confirmPasswordError}
              />

              <CommonButton title={I18n.t('register')} onPress={validateForm} />

              <View style={CommonStyles.paddingTop3} />

              <Text
                style={[
                  CommonStyles.textBlack,
                  CommonStyles.font4P,
                  CommonStyles.textCenter,
                  CommonStyles.alignSelf,
                ]}>
                {I18n.t('alreadyHaveAnAccount')}{' '}
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={CommonStyles.textYellow}>
                  {I18n.t('login')}
                </Text>{' '}
                {I18n.t('now')}
              </Text>
            </View>
          </>
        }
      />
    </CommonSafeAreaScrollViewComponent>
  );
}
