import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {Colors} from '../../../components/common/Colors';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CustomerBackgroundComponent from '../../../components/ReusableComponents/CustomerBackgroundComponent';
import TabBarHeader from '../../../components/ReusableComponents/Header/TabBarHeader';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import Constants from '../../../components/common/Constants';
import {CommonActions} from '@react-navigation/native';
import {useCustomAlert} from '../../../components/ReusableComponents/CustomAlertProvider';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import useApi from '../../../services/Api';
import {
  loginAction,
  loginUser,
  saveUserDataAndRole,
} from '../../../redux/login/LoginActions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const {request} = useApi();
  const isLoading = useSelector(state => state.login.isLoading);
  // const {request} = useApi('multipart/form-data'); if image then send this
  const {showAlert} = useCustomAlert();
  const [email, setEmail] = useState('Boy@gmail.com');
  const [password, setPassword] = useState('boy1234');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let valid = true;

    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError(I18n.t('emailRequired'));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(I18n.t('emailInvalid'));
      valid = false;
    }

    if (password === '') {
      setPasswordError(I18n.t('passwordRequired'));
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = async () => {
    dispatch(loginAction(email, password, navigation));
  };
  // const login = async () => {
  //   const data = {
  //     Email: email,
  //     Password: password,
  //   };
  //   await handleApiRequest(
  //     request,
  //     'POST',
  //     EndPoints.login,
  //     data,
  //     async (message, statusCode, result) => {
  //       onSuccessCall(message, statusCode, result);
  //     },
  //     (errorMessage, errorCode) => {
  //       onErrorCall(errorMessage, errorCode);
  //     },
  //     setLoading,
  //     showAlert,
  //     false,
  //   );
  // };

  onSuccessCall = async (message, statusCode, result) => {
    if (result?.Role && Constants.ROLE_STATUS.includes(result?.Role)) {
      dispatch(
        saveUserDataAndRole(
          result?.Token?.access_token,
          result?.Id,
          true,
          result?.Role,
        ),
      );
      dispatch(loginUser(result?.Token?.access_token));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    } else {
      showAlert({
        code: null,
        message: 'Invalid role. Please contact support.',
      });
    }
  };
  onErrorCall = async (errorMessage, errorCode) => {
    showAlert({
      code: errorCode,
      message: errorMessage,
    });
  };

  const setState = (stateSetter, text) => {
    setEmailError('');
    setPasswordError('');
    stateSetter(text);
  };
  return (
    <CommonSafeAreaScrollViewComponent>
      {isLoading && <LogoLoaderComponent />}

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
            <TabBarHeader title={I18n.t('login')} />
            <View
              style={[
                CommonStyles.width80,
                CommonStyles.alignSelf,
                CommonStyles.paddingTop15,
              ]}>
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
              <View style={CommonStyles.paddingVertical2} />
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
              <View style={CommonStyles.paddingVertical2} />
              <CommonButton title={I18n.t('login')} onPress={validateForm} />
              <View style={CommonStyles.paddingVertical2} />
              <Text
                style={[
                  CommonStyles.textBlack,
                  CommonStyles.font4P,
                  CommonStyles.textCenter,
                  CommonStyles.alignSelf,
                  CommonStyles.paddingTop5,
                ]}>
                {I18n.t('dontHaveAnAccount')}{' '}
                <Text
                  onPress={() => navigation.navigate('Signup')}
                  style={CommonStyles.textYellow}>
                  {I18n.t('signUp')}
                </Text>{' '}
                {I18n.t('now')}
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
                {I18n.t('forgotPassword')}
              </Text>
            </View>
          </>
        }
      />
    </CommonSafeAreaScrollViewComponent>
  );
}
