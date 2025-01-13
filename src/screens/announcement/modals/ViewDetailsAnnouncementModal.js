import {View, Modal, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/ReusableComponents/Header/Header';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import I18n from '../../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import CommonStyles from '../../../components/common/CommonStyles';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {useLoginData} from '../../../hooks/useLoginData';
import {
  deleteAnnouncement,
  fetchAllAnnouncements,
  patchAnnouncement,
} from '../../../redux/announcements/AnnouncementActions';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import DocumentPicker, {types} from 'react-native-document-picker';
import {isSizeValid} from '../../../components/ReusableComponents/DocumentSizeComponent';
import {handleDocumentUploadAWS} from '../../../components/utils/handleDocumentUploadAWS';
import AttachmentPicker from '../../../components/ReusableComponents/AttachmentComponent';

export default function ViewDetailsAnnouncementModal({
  isModalVisible,
  toggleModal,
  data,
}) {
  const dispatch = useDispatch();
  const {role} = useLoginData();
  const {isLoading: announcementLoading} = useSelector(
    state => state.announcements,
  );
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(data?.title);
    setMessage(data?.content);
    setAttachment(data?.attachment);
  }, [data]);

  const askForConfirmation = status => {
    let alertMessage;
    if (status === 'delete') {
      alertMessage = 'Are you sure you want to delete this Announcement?';
    } else if (status === 'update') {
      alertMessage = 'Are you sure you want to update this Announcement?';
    }
    const announcementId = data?.name?.split('/').pop();
    const announcementData = {
      title,
      message,
      attachment,
      adminId: data?.adminId,
      creationDate: data?.creationDate,
    };

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
          onPress: async () => {
            if (status === 'delete') {
              await submitDeleteRequest(announcementId);
            } else if (status === 'update') {
              await updateAnnouncementRequest(announcementData, announcementId);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const updateAnnouncementRequest = async (
    announcementData,
    announcementId,
  ) => {
    const response = await dispatch(
      patchAnnouncement(announcementId, announcementData),
    );

    if (response.success === true) {
      Alert.alert('Announcement updated successfully');
      toggleModal();
      dispatch(fetchAllAnnouncements());
    } else {
      console.error('Failed to update Announcement request:', response.error);
    }
  };

  const submitDeleteRequest = async announcementId => {
    const response = await dispatch(deleteAnnouncement(announcementId));

    if (response.success) {
      Alert.alert(response.message);
      toggleModal();
      dispatch(fetchAllAnnouncements());
    } else {
      console.error('Failed to delete leave request:', response.error);
      Alert.alert('Error', response.error);
    }
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
        title={
          role === 'Admin'
            ? I18n.t('updateAnnouncement')
            : I18n.t('viewAnnouncement')
        }
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
            disabled={role === 'Employee'}
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
            disabled={role === 'Employee'}
          />

          <AttachmentPicker
            attachment={attachment}
            handleDocumentPick={handleDocumentPick}
            editable={role === 'Admin' ? true : false}
          />
          {role === 'Admin' && (
            <View style={CommonStyles.rowBetween}>
              <CommonButton
                title={I18n.t('delete')}
                onPress={() => askForConfirmation('delete')}
                backgroundColor={Colors.redColor}
                half
              />
              <CommonButton
                title={I18n.t('update')}
                onPress={() => askForConfirmation('update')}
                half
              />
            </View>
          )}
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
