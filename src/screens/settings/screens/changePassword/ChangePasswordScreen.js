import {View, Text} from 'react-native';
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

export default function ChangePasswordScreen({navigation}) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.login.userId);
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
      setCurrentPasswordError('Current Password is required');
      valid = false;
    } else if (newPassword === '') {
      setNewPasswordError('New Password is required.');
      valid = false;
    } else if (confirmPassword === '') {
      setConfirmPasswordError('Re-enter your new Password.');
      valid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError('Your password does not match the new password');
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
      <Header
        title="Change Password"
        onLeftIconPressed={goBack}
        leftIcon={
          <Ionicons
            name="arrow-back"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      {isLoading && <LogoLoaderComponent />}
      <CustomerBackgroundComponent
        topVerySmall
        topChild={
          <View style={CommonStyles.width90}>
            <Text style={[CommonStyles.lessBold5P, CommonStyles.textWhite]}>
              Change your Password
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
                title={'Current Password'}
                value={currentPassword}
                onChangeText={text => setState(setCurrentPassword, text, true)}
                placeholder={'Enter Your Current Password'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!currentPasswordError}
                errorMessage={currentPasswordError}
                isPassword={true}
              />
              <View style={CommonStyles.paddingVertical2} />

              <InputFieldComponent
                title={'New Password'}
                value={newPassword}
                onChangeText={text => setState(setNewPassword, text, true)}
                placeholder={'Enter Your New Password'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!newPasswordError}
                errorMessage={newPasswordError}
                isPassword={true}
              />
              <View style={CommonStyles.paddingVertical2} />

              <InputFieldComponent
                title={'Confirm New Password'}
                value={confirmPassword}
                onChangeText={text => setState(setConfirmPassword, text, true)}
                placeholder={'Re-enter Your New Password'}
                placeholderColor={Colors.placeholderColorDark}
                borderColor={Colors.greyColor}
                textColor={Colors.blackColor}
                error={!!confirmPasswordError}
                errorMessage={confirmPasswordError}
                isPassword={true}
              />
              <View style={CommonStyles.paddingVertical2} />
              <CommonButton title={'Change Password'} onPress={validateForm} />
            </View>
          </View>
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
