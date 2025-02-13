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
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {
  convertToTimestamp,
  formatDate,
} from '../../../components/utils/dateUtils';
import {useLoginData} from '../../../hooks/useLoginData';
import {
  deleteEvent,
  fetchMonthlyEvents,
  patchEventStatus,
  postEventRequest,
} from '../../../redux/events/EventActions';
import {useEventData} from '../../../hooks/useEventData';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';
import {extractId} from '../../../components/utils/ExtractId';
import DateFromToComponent from '../../../components/ReusableComponents/DateFromToComponent';

export default function ManageEventModal({
  isModalVisible,
  toggleModal,
  isEdit = false,
  data = null,
  monthDates = null,
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

  const getEvents = () => {
    if (monthDates) {
      dispatch(fetchMonthlyEvents(monthDates));
    } else {
      const monthDates = getMonthDates();
      dispatch(fetchMonthlyEvents(monthDates));
    }
  };

  const getMonthDates = () => {
    if (eventFrom && eventTo) {
      const firstDate = new Date(eventFrom);
      const lastDate = new Date(eventTo);

      firstDate.setDate(1);

      lastDate.setMonth(lastDate.getMonth() + 1);
      lastDate.setDate(0);

      const formattedFirstDate = firstDate.toISOString().split('T')[0];
      const formattedLastDate = lastDate.toISOString().split('T')[0];

      const monthDates = {
        firstDate: formattedFirstDate,
        lastDate: formattedLastDate,
      };

      return monthDates;
    }
    return null;
  };

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
    const eventId = extractId(data?.name);

    const response = await dispatch(deleteEvent(eventId));

    if (response.success) {
      Alert.alert(response.message);
      clearStates();
      toggleModal();

      getEvents();
    } else {
      console.error('Failed to delete event request:', response.error);
      Alert.alert('Error', response.error);
    }
  };

  const submitEventRequest = async eventData => {
    let eventId = null;

    if (isEdit) {
      eventId = extractId(data?.name);
    }

    const response = isEdit
      ? await dispatch(patchEventStatus(eventId, eventData))
      : await dispatch(postEventRequest(eventData));

    if (response.success) {
      Alert.alert('Event added successfully!');
      clearStates();
      toggleModal();

      getEvents();
    } else {
      console.error('Failed to post event request:', response.error);
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

          <DateFromToComponent
            dateFrom={formatDate(eventFrom)}
            setDateFrom={setEventFrom}
            dateTo={formatDate(eventTo)}
            setDateTo={setEventTo}
            dateFromLabel={I18n.t('startDate')}
            dateToLabel={I18n.t('endDate')}
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
