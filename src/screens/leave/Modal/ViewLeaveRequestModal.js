import {View, Text, Modal, Alert} from 'react-native';
import React from 'react';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import Header from '../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import CommonStyles from '../../../components/common/CommonStyles';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import {patchLeaveStatus} from '../../../redux/leave/LeaveActions';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';

export default function ViewLeaveRequestModal({
  isModalVisible,
  toggleModal,
  leaveDetails = {},
  apiCall,
}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const isLoading = useSelector(state => state.leaves.isLoading);

  const {type, reason, period, name, fromDate, toDate, status, userId} =
    leaveDetails || {};

  const askForConfirmation = status => {
    const message =
      status === 'approved'
        ? 'Are you sure you want to approve this leave request?'
        : 'Are you sure you want to reject this leave request?';

    Alert.alert(
      'Confirm Action',
      message,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Action cancelled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => submitLeaveRequest(status),
        },
      ],
      {cancelable: false},
    );
  };

  const submitLeaveRequest = async status => {
    const leaveData = {
      reason,
      type,
      fromDate,
      toDate,
      period,
      status,
      userId,
    };

    const leaveId = name ? name.split('/').pop() : null;

    const response = await dispatch(patchLeaveStatus(leaveId, leaveData));

    if (response.success === true) {
      if (status === 'approved') {
        Alert.alert('Leave request approved successfully');
      } else {
        Alert.alert('Leave request rejected successfully');
      }
      toggleModal();
      apiCall();
    } else {
      console.error('Failed to post leave request:', response.error);
    }
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      {isLoading && <LogoLoaderComponent />}
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={I18n.t('leaveDetails')}
          onLeftIconPressed={toggleModal}
          leftIcon={
            <Ionicons
              name="close"
              size={Constants?.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          }
        />

        <View style={CommonStyles.mainPadding}>
          <InputFieldComponent
            title={I18n.t('leaveDuration')}
            value={period}
            placeholder={I18n.t('enterLeaveDuration')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('leaveType')}
            value={type}
            placeholder={I18n.t('enterLeaveType')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('leaveReason')}
            value={reason}
            placeholder={I18n.t('enterLeaveReason')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
            multiline={true}
          />
          {status === 'pending' && (
            <View style={CommonStyles.rowBetween}>
              <CommonButton
                title={I18n.t('approve')}
                onPress={() => askForConfirmation('approved')}
                backgroundColor={Colors.blueColor}
                half={true}
              />
              <CommonButton
                title={I18n.t('reject')}
                onPress={() => askForConfirmation('rejected')}
                backgroundColor={Colors.redColor}
                half={true}
              />
            </View>
          )}
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
