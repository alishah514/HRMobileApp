import {View, Text, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {Colors} from '../../../components/common/Colors';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CustomerBackgroundComponent from '../../../components/ReusableComponents/CustomerBackgroundComponent';
import TabBarHeader from '../../../components/ReusableComponents/Header/TabBarHeader';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import I18n from '../../../i18n/i18n';
import {useSelector} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ForgotPasswordScreen({navigation}) {
  const currentLanguage = useSelector(state => state.language.language);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateForm = () => {
    let valid = true;

    setEmailError('');

    if (email === '') {
      setEmailError(I18n.t('emailRequired'));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(I18n.t('emailInvalid'));
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
            <TabBarHeader title={I18n.t('forgotPassword')} />

            <View
              style={[
                CommonStyles.width80,
                CommonStyles.alignSelf,
                CommonStyles.paddingTop20,
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
              <CommonButton
                title={I18n.t('resetPassword')}
                onPress={validateForm}
              />
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
                {I18n.t('backToLogin')}
              </Text>
            </View>
          </>
        }
      />
    </CommonSafeAreaScrollViewComponent>
  );
}
