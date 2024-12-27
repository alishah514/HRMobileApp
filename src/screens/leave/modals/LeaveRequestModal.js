import {View, Modal, Alert, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import Header from '../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import CommonStyles from '../../../components/common/CommonStyles';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import CustomDatePickerComponent from '../../../components/ReusableComponents/CustomDatePickerComponent';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import CustomSectionedMultiSelectComponent from '../../../components/ReusableComponents/CustomSectionedMultiSelectComponent';
import {convertToTimestamp} from '../../../components/utils/dateUtils';
import {postLeaveRequest} from '../../../redux/leave/LeaveActions';
import {CalculatePeriod} from '../../../components/utils/CalculatePeriod';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import {useLoginData} from '../../../hooks/useLoginData';
import useLeaveData from '../../../hooks/useLeaveData';
import {wp} from '../../../components/common/Dimensions';
import styles from '../styles';
import DocumentPicker, {types} from 'react-native-document-picker';
import {handleDocumentUploadAWS} from '../../../components/utils/handleDocumentUploadAWS';

export default function LeaveRequestModal({
  isModalVisible,
  toggleModal,
  apiCall,
}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const {leavesLoading} = useLeaveData();
  const {userId} = useLoginData();
  const [leaveType, setLeaveType] = useState(null);
  const [leaveFrom, setLeaveFrom] = useState(null);
  const [leaveTo, setLeaveTo] = useState(null);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDocument, setLeaveDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const leaveTypeOptions = ['Casual Leave', 'Plan Leave', 'Sick Leave'];

  const viewData = async () => {
    const fromDate = new Date(leaveFrom);
    const toDate = new Date(leaveTo);

    const period = CalculatePeriod(fromDate, toDate);
    if (period === null) return;

    const leaveData = {
      reason: leaveReason,
      type: leaveType,
      fromDate: convertToTimestamp(leaveFrom),
      toDate: convertToTimestamp(leaveTo),
      period: period.toString(),
      status: 'pending',
      userId: userId,
      leaveDocument: leaveDocument || '',
    };

    await askForConfirmation(leaveData);
  };

  const askForConfirmation = leaveData => {
    const message = 'Are you sure you want to add this leave request?';

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
          onPress: () => submitLeaveRequest(leaveData),
        },
      ],
      {cancelable: false},
    );
  };

  const submitLeaveRequest = async leaveData => {
    const response = await dispatch(postLeaveRequest(leaveData));

    if (response.success) {
      Alert.alert('Leave added successfully! ');
      clearStates();
      toggleModal();
      apiCall();
    } else {
      console.error('Failed to post leave request:', response.error);
    }
  };

  const isLeaveFormValid = () => {
    return (
      leaveType !== null &&
      leaveFrom !== null &&
      leaveTo !== null &&
      leaveReason.trim() !== ''
    );
  };

  const clearStates = () => {
    setLeaveType(null);
    setLeaveFrom(null);
    setLeaveTo(null);
    setLeaveReason('');
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
        setLeaveDocument(uploadedUrl);
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
      {(leavesLoading || isLoading) && <LogoLoaderComponent />}

      <Header
        title={I18n.t('leaveRequest')}
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
          <CustomDatePickerComponent
            selectedDate={leaveFrom}
            setSelectedDate={setLeaveFrom}
            label={I18n.t('leaveFrom')}
          />
          <CustomDatePickerComponent
            selectedDate={leaveTo}
            setSelectedDate={setLeaveTo}
            label={I18n.t('leaveTo')}
          />

          <CustomSectionedMultiSelectComponent
            title={I18n.t('leaveType')}
            selectedValue={leaveType}
            setSelectedValue={setLeaveType}
            options={leaveTypeOptions}
          />
          <InputFieldComponent
            title={I18n.t('reason')}
            value={leaveReason}
            placeholder={I18n.t('enterLeaveReason')}
            placeholderColor={Colors.placeholderColorDark}
            onChangeText={text => setLeaveReason(text)}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            multiline={true}
          />
          <View>
            <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
              {I18n.t('attachDocument')}
            </Text>
            <TouchableOpacity
              onPress={handleDocumentPick}
              style={[styles.documentButton, CommonStyles.shadow]}>
              <Text
                style={[
                  CommonStyles.font3,
                  leaveDocument
                    ? CommonStyles.textBlue
                    : CommonStyles.textDarkGrey,
                  CommonStyles.Bold600,
                ]}>
                {leaveDocument
                  ? I18n.t('selectedDocument')
                  : I18n.t('selectDocument')}
              </Text>
            </TouchableOpacity>
          </View>
          <CommonButton
            title={I18n.t('sendLeaveRequest')}
            onPress={viewData}
            disabled={!isLeaveFormValid()}
          />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
