import {View, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/ReusableComponents/Header/Header';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import I18n from '../../../i18n/i18n';
import {useDispatch} from 'react-redux';
import CommonStyles from '../../../components/common/CommonStyles';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {useLoginData} from '../../../hooks/useLoginData';
import {postAnnouncements} from '../../../redux/announcements/AnnouncementActions';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import DocumentPicker, {types} from 'react-native-document-picker';
import {isSizeValid} from '../../../components/ReusableComponents/DocumentSizeComponent';
import {handleDocumentUploadAWS} from '../../../components/utils/handleDocumentUploadAWS';
import AttachmentPicker from '../../../components/ReusableComponents/AttachmentComponent';
import {useAnnouncementData} from '../../../hooks/useAnnouncementData';

export default function AddAnnouncementModal({
  isModalVisible,
  toggleModal,
  apiCall,
}) {
  const dispatch = useDispatch();
  const {userId} = useLoginData();

  const {isLoading: announcementLoading} = useAnnouncementData();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const askForConfirmation = () => {
    const creationDate = new Date();
    const timestamp = {
      seconds: Math.floor(creationDate.getTime() / 1000),
      nanos: creationDate.getMilliseconds() * 1000000,
    };

    const data = {
      title,
      message,
      attachment,
      adminId: userId,
      creationDate: timestamp,
    };
    const alertMessage = 'Are you sure you want to add this announcement?';

    Alert.alert(
      'Confirm Action',
      alertMessage,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Action cancelled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => submitAnnouncement(data),
        },
      ],
      {cancelable: false},
    );
  };

  const submitAnnouncement = async data => {
    const response = await dispatch(postAnnouncements(data));

    if (response.success) {
      Alert.alert('Announcement added successfully! ');
      clearStates();
      toggleModal();

      apiCall();
    } else {
      console.error('Failed to post task request:', response.error);
    }
  };

  const clearStates = () => {
    setTitle('');
    setMessage('');
    setAttachment(null);
  };

  const isFormValid = () => {
    return title !== '' && message !== '' && attachment !== null;
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [types.pdf, types.doc, types.docx, types.plainText, types.images],
      });

      if (!isSizeValid(result[0])) {
        Alert.alert('File size error', 'File size must be less than 5 MB.');
        return;
      }

      showConfirmationAlert(async () => {
        setIsLoading(true);
        const document = result[0];
        const uploadedUrl = await handleDocumentUploadAWS(
          document,
          'documents/announcements',
        );
        console.log('Uploaded Document URL:', uploadedUrl);
        setAttachment(uploadedUrl);
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
      <Header
        title={I18n.t('addAnnouncement')}
        onLeftIconPressed={toggleModal}
        leftIcon={
          <Ionicons
            name="close"
            size={Constants.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
      />
      {(announcementLoading || isLoading) && <LogoLoaderComponent />}
      <CommonSafeAreaScrollViewComponent>
        <View style={CommonStyles.mainPadding}>
          <InputFieldComponent
            title={I18n.t('title')}
            value={title}
            onChangeText={text => setTitle(text)}
            placeholder={I18n.t('enterAnnouncementTitle')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
          />

          <InputFieldComponent
            title={I18n.t('announcementMessage')}
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder={I18n.t('enterAnnouncementMessage')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            multiline
          />

          <AttachmentPicker
            attachment={attachment}
            handleDocumentPick={handleDocumentPick}
          />
          <CommonButton
            title={I18n.t('postAnnouncement')}
            onPress={askForConfirmation}
            disabled={!isFormValid()}
          />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
