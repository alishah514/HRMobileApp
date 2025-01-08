import {View, Text, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/ReusableComponents/Header/Header';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import I18n from '../../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import CommonStyles from '../../../components/common/CommonStyles';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomSectionedMultiSelectComponent from '../../../components/ReusableComponents/CustomSectionedMultiSelectComponent';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {useLoginData} from '../../../hooks/useLoginData';
import {
  fetchAllAnnouncements,
  postAnnouncements,
} from '../../../redux/announcements/AnnouncementActions';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';

export default function AddAnnouncementModal({isModalVisible, toggleModal}) {
  const dispatch = useDispatch();
  const {userId} = useLoginData();
  const currentLanguage = useSelector(state => state.language.language);
  const {isLoading} = useSelector(state => state.announcements);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [announcementFor, setAnnouncementFor] = useState(null);
  const announcementForOptions = ['All', 'M3LOGI', 'Courage'];

  const askForConfirmation = () => {
    const creationDate = new Date();
    const timestamp = {
      seconds: Math.floor(creationDate.getTime() / 1000),
      nanos: creationDate.getMilliseconds() * 1000000,
    };

    const data = {
      title,
      message,
      announcementFor,
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
      dispatch(fetchAllAnnouncements());
    } else {
      console.error('Failed to post task request:', response.error);
    }
  };

  const clearStates = () => {
    setTitle('');
    setMessage('');
    setAnnouncementFor(null);
  };

  const isFormValid = () => {
    return title !== '' && message !== '' && announcementFor !== null;
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
      {isLoading && <LogoLoaderComponent />}
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

          <CustomSectionedMultiSelectComponent
            title={I18n.t('announcementFor')}
            selectedValue={announcementFor}
            setSelectedValue={setAnnouncementFor}
            options={announcementForOptions}
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
