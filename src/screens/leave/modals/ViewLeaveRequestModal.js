import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {deleteLeave, patchLeaveStatus} from '../../../redux/leave/LeaveActions';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import {formatDate} from '../../../components/utils/dateUtils';
import useLeaveData from '../../../hooks/useLeaveData';
import styles from '../styles';
import {useLoginData} from '../../../hooks/useLoginData';
import {getSpecificUser} from '../../../redux/accounts/AccountActions';
import {useAccountsData} from '../../../hooks/useAccountsData';
import DocumentPicker, {types} from 'react-native-document-picker';
import {handleDocumentUploadAWS} from '../../../components/utils/handleDocumentUploadAWS';

export default function ViewLeaveRequestModal({
  isModalVisible,
  toggleModal,
  leaveDetails = {},
  apiCall,
}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const {role} = useLoginData();
  const {leavesLoading} = useLeaveData();
  const {specificUserData, isLoading: profileLoading} = useAccountsData();
  const [updatedLeaveDocument, setUpdatedLeaveDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    type,
    reason,
    period,
    name,
    fromDate,
    toDate,
    status,
    userId,
    leaveDocument,
  } = leaveDetails || {};

  useEffect(() => {
    if (role === 'Admin') {
      dispatch(getSpecificUser(userId));
    }
  }, [userId, role]);

  useEffect(() => {
    setUpdatedLeaveDocument(leaveDocument);
  }, [leaveDetails]);

  const leaveDuration = `${formatDate(fromDate)} - ${formatDate(
    toDate,
  )} (${period} Days)`;

  const askForConfirmation = status => {
    const leaveId = name ? name.split('/').pop() : null;
    let message;

    if (status === 'approved') {
      message = 'Are you sure you want to approve this leave request?';
    } else if (status === 'delete') {
      message = 'Are you sure you want to delete this leave request?';
    } else if (status === 'rejected') {
      message = 'Are you sure you want to reject this leave request?';
    }

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
          onPress: async () => {
            if (status === 'delete') {
              await submitDeleteRequest(leaveId);
            } else {
              await submitLeaveRequest(status, leaveId);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const submitLeaveRequest = async (status, leaveId) => {
    const leaveData = {
      reason,
      type,
      fromDate,
      toDate,
      period,
      status,
      userId,
      updatedLeaveDocument,
    };

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

  const submitDeleteRequest = async leaveId => {
    const response = await dispatch(deleteLeave(leaveId));

    if (response.success) {
      Alert.alert(response.message);
      toggleModal();
      apiCall();
    } else {
      console.error('Failed to delete leave request:', response.error);
      Alert.alert('Error', response.error);
    }
  };

  const showDocumentActionAlert = () => {
    Alert.alert(
      'Choose Action',
      'Do you want to view the document or update it?',
      [
        {
          text: 'View',
          onPress: openDocument,
        },
        {
          text: 'Update',
          onPress: handleDocumentPick,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const openDocument = async () => {
    try {
      const supported =
        leaveDocument.startsWith('http') || leaveDocument.startsWith('https');
      if (supported) {
        await Linking.openURL(updatedLeaveDocument);
      } else {
        Alert.alert('Error', 'Invalid document URL.');
      }
    } catch (error) {
      console.error('Error opening document:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred while trying to open the document.',
      );
    }
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [types.pdf, types.doc, types.docx, types.plainText, types.images],
      });
      showConfirmationAlert(async () => {
        setIsLoading(true);
        const document = result[0];
        const uploadedUrl = await handleDocumentUploadAWS(
          document,
          'documents/leaves/',
        );
        console.log('Uploaded Document URL:', uploadedUrl);
        setUpdatedLeaveDocument(uploadedUrl);
        setIsLoading(false);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error:', err);
        Alert.alert(
          'Error',
          'An unexpected error occurred while selecting a document.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showConfirmationAlert = onConfirm => {
    Alert.alert(
      'Upload Confirmation',
      'Are you sure you want to upload this document?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: onConfirm,
        },
      ],
    );
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      {(leavesLoading || profileLoading || isLoading) && (
        <LogoLoaderComponent />
      )}

      <Header
        title={I18n.t('leaveDetails')}
        onLeftIconPressed={toggleModal}
        leftIcon={
          <Ionicons
            name="close"
            size={Constants.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CommonSafeAreaScrollViewComponent>
        <View style={CommonStyles.mainPadding}>
          {role === 'Admin' && (
            <InputFieldComponent
              title={I18n.t('employeeName')}
              value={specificUserData?.name}
              placeholder={I18n.t('enterEmployeeName')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
            />
          )}

          <InputFieldComponent
            title={I18n.t('leaveDuration')}
            value={leaveDuration}
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
          {leaveDocument && (
            <View>
              <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
                {role === 'Admin' && status === 'pending'
                  ? I18n.t('viewOrEditDocument')
                  : I18n.t('viewDocument')}
              </Text>
              <TouchableOpacity
                onPress={
                  role === 'Admin' && status === 'pending'
                    ? showDocumentActionAlert
                    : openDocument
                }
                style={[styles.documentButton, CommonStyles.shadow]}>
                <Text
                  style={[
                    CommonStyles.font3,
                    CommonStyles.textDarkGrey,
                    CommonStyles.Bold600,
                  ]}>
                  {I18n.t('clickHere')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {role === 'Employee' && status === 'pending' && (
            <CommonButton
              title={I18n.t('cancel')}
              onPress={() => askForConfirmation('delete')}
              backgroundColor={Colors.redColor}
            />
          )}

          {role === 'Admin' && status === 'pending' && (
            <View style={[CommonStyles.rowBetween]}>
              <CommonButton
                title={I18n.t('reject')}
                onPress={() => askForConfirmation('rejected')}
                backgroundColor={Colors.redColor}
                half
              />
              <CommonButton
                title={I18n.t('approve')}
                onPress={() => askForConfirmation('approved')}
                backgroundColor={Colors.greenColor}
                half
              />
            </View>
          )}
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
