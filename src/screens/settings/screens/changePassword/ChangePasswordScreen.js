import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import CommonSafeAreaViewComponent from '../../../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../../../components/ReusableComponents/Header/Header';
import {Colors} from '../../../../components/common/Colors';
import Constants from '../../../../components/common/Constants';
import CustomerBackgroundComponent from '../../../../components/ReusableComponents/CustomerBackgroundComponent';
import CommonStyles from '../../../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputFieldComponent from '../../../../components/ReusableComponents/InputFieldComponent';
import CommonButton from '../../../../components/ReusableComponents/CommonComponents/CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import {ChangePasswordAction} from '../../../../redux/changePassword/ChangePasswordActions';
import LogoLoaderComponent from '../../../../components/ReusableComponents/LogoLoaderComponent';
import {useLoginData} from '../../../../hooks/useLoginData';
import I18n from '../../../../i18n/i18n';

export default function ChangePasswordScreen({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);

  const {userId} = useLoginData();
  const isLoading = useSelector(state => state.changePassword.isLoading);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateForm = () => {
    let valid = true;

    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    if (currentPassword === '') {
      setCurrentPasswordError(I18n.t('currentPasswordRequired'));
      valid = false;
    } else if (newPassword === '') {
      setNewPasswordError(I18n.t('newPasswordRequired'));
      valid = false;
    } else if (confirmPassword === '') {
      setConfirmPasswordError(I18n.t('reEnterNewPasswordRequired'));
      valid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError(I18n.t('passwordMismatch'));
      valid = false;
    }

    if (valid) {
      handleChangePassword();
    }
  };

  const handleChangePassword = async () => {
    const result = await dispatch(
      ChangePasswordAction(userId, currentPassword, newPassword),
    );
    if (result.success) {
      stateClear();
      Alert.alert(I18n.t('passwordChangedSuccess'));
    }
  };

  const stateClearErrors = () => {
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
  };

  const stateClear = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const setState = (stateSetter, text, clearErrors = false) => {
    stateSetter(text);
    if (clearErrors) {
      stateClearErrors();
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <CommonSafeAreaViewComponent>
      {isLoading && <LogoLoaderComponent />}
      <Header
        title={I18n.t('changePassword')}
        onLeftIconPressed={goBack}
        leftIcon={
          <Ionicons
            name="arrow-back"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />

      <CustomerBackgroundComponent
        topVerySmall
        topChild={
          <View style={CommonStyles.width90}>
            <Text style={[CommonStyles.lessBold5P, CommonStyles.textWhite]}>
              {I18n.t('changeYourPassword')}
            </Text>
          </View>
        }
        bottomChild={
          <View
            style={[
              CommonStyles.width90,
              CommonStyles.alignSelf,
              CommonStyles.marginTop10,
            ]}>
            <View>
              <InputFieldComponent
                title={I18n.t('currentPassword')}
                value={currentPassword}
                onChangeText={text => setState(setCurrentPassword, text, true)}
                placeholder={I18n.t('enterYourCurrentPassword')}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!currentPasswordError}
                errorMessage={currentPasswordError}
                isPassword={true}
              />
              <View style={CommonStyles.paddingVertical2} />

              <InputFieldComponent
                title={I18n.t('newPassword')}
                value={newPassword}
                onChangeText={text => setState(setNewPassword, text, true)}
                placeholder={I18n.t('enterYourNewPassword')}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!newPasswordError}
                errorMessage={newPasswordError}
                isPassword={true}
              />
              <View style={CommonStyles.paddingVertical2} />

              <InputFieldComponent
                title={I18n.t('confirmNewPassword')}
                value={confirmPassword}
                onChangeText={text => setState(setConfirmPassword, text, true)}
                placeholder={I18n.t('reEnterNewPassword')}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!confirmPasswordError}
                errorMessage={confirmPasswordError}
                isPassword={true}
              />
              <View style={CommonStyles.paddingVertical2} />
              <CommonButton
                title={I18n.t('changePassword')}
                onPress={validateForm}
              />
            </View>
          </View>
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
