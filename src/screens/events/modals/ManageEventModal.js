import {View, Modal, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/ReusableComponents/Header/Header';
import I18n from '../../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import CommonStyles from '../../../components/common/CommonStyles';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import CommonSafeAreaViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import CustomDatePickerComponent from '../../../components/ReusableComponents/CustomDatePickerComponent';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {
  convertToTimestamp,
  formatDate,
} from '../../../components/utils/dateUtils';
import {useLoginData} from '../../../hooks/useLoginData';
import {
  deleteEvent,
  fetchEvents,
  patchEventStatus,
  postEventRequest,
} from '../../../redux/events/EventActions';
import {useEventData} from '../../../hooks/useEventData';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';

export default function ManageEventModal({
  isModalVisible,
  toggleModal,
  isEdit,
  data,
}) {
  const dispatch = useDispatch();
  const {isLoading} = useEventData();
  const currentLanguage = useSelector(state => state.language.language);
  const {userId} = useLoginData();
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventFrom, setEventFrom] = useState(null);
  const [eventTo, setEventTo] = useState(null);

  useEffect(() => {
    if (data) {
      setEventTitle(data.title || '');
      setEventDescription(data.description || '');
      setEventFrom(data.startDate ? new Date(data.startDate) : null);
      setEventTo(data.endDate ? new Date(data.endDate) : null);
    }
  }, [data]);

  const askForConfirmation = (message, onConfirm, data = null) => {
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
          onPress: () => onConfirm(data),
        },
      ],
      {cancelable: false},
    );
  };

  const confirmAddEvent = async () => {
    const eventData = {
      title: eventTitle,
      description: eventDescription,
      startDate: convertToTimestamp(eventFrom),
      endDate: convertToTimestamp(eventTo),
      adminId: userId,
      userId: userId,
    };

    const message = isEdit
      ? 'Are you sure you want to update this event?'
      : 'Are you sure you want to add this event?';

    askForConfirmation(message, submitEventRequest, eventData);
  };

  const confirmAndSubmitDeleteRequest = () => {
    const message = 'Are you sure you want to delete this event?';
    askForConfirmation(message, submitDeleteRequest);
  };

  const submitDeleteRequest = async () => {
    const eventId = data?.name?.split('/').pop();
    const response = await dispatch(deleteEvent(eventId));

    if (response.success) {
      Alert.alert(response.message);
      clearStates();
      toggleModal();
      dispatch(fetchEvents());
    } else {
      console.error('Failed to delete event request:', response.error);
      Alert.alert('Error', response.error);
    }
  };

  const submitEventRequest = async eventData => {
    const eventId = data?.name.split('/').pop();
    const response = isEdit
      ? await dispatch(patchEventStatus(eventId, eventData))
      : await dispatch(postEventRequest(eventData));

    if (response.success) {
      Alert.alert('Event added successfully!');
      clearStates();
      toggleModal();
      dispatch(fetchEvents());
    } else {
      console.error('Failed to post leave request:', response.error);
    }
  };

  const isEventFormValid = () => {
    return (
      eventTitle !== '' &&
      eventDescription !== '' &&
      eventFrom !== null &&
      eventTo !== null
    );
  };

  const clearStates = () => {
    setEventTitle('');
    setEventDescription('');
    setEventFrom(null);
    setEventTo(null);
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <Header
        title={isEdit ? I18n.t('editEvent') : I18n.t('addEvent')}
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
      <CommonSafeAreaViewComponent>
        <View style={CommonStyles.mainPadding}>
          <InputFieldComponent
            title={I18n.t('eventTitle')}
            value={eventTitle}
            onChangeText={text => setEventTitle(text)}
            placeholder={I18n.t('enterEventTitle')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
          />
          <CustomDatePickerComponent
            selectedDate={formatDate(eventFrom)}
            setSelectedDate={setEventFrom}
            label={I18n.t('eventStartDate')}
          />
          <CustomDatePickerComponent
            selectedDate={formatDate(eventTo)}
            setSelectedDate={setEventTo}
            label={I18n.t('eventStartDate')}
          />
          <InputFieldComponent
            title={I18n.t('eventDescription')}
            value={eventDescription}
            onChangeText={text => setEventDescription(text)}
            placeholder={I18n.t('enterEventDescription')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            multiline
          />
          <View style={isEdit && CommonStyles.rowBetween}>
            <CommonButton
              title={isEdit ? I18n.t('updateEvent') : I18n.t('addEvent')}
              onPress={confirmAddEvent}
              disabled={!isEventFormValid()}
              half={isEdit}
            />
            {isEdit && (
              <CommonButton
                title={I18n.t('deleteEvent')}
                onPress={confirmAndSubmitDeleteRequest}
                backgroundColor={Colors.redColor}
                half
              />
            )}
          </View>
        </View>
      </CommonSafeAreaViewComponent>
    </Modal>
  );
}
