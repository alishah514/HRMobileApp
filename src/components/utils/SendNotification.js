import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Constants from '../common/Constants';

const SendNotification = (navigation, title, message, data, screenName) => {
  if (!screenName && navigation) {
    const currentRoute =
      navigation.getState().routes[navigation.getState().index];
    screenName = currentRoute ? currentRoute.name : 'DefaultScreen';
  }

  const notificationData = {screen: screenName, ...data};

  if (Platform.OS === 'ios') {
    PushNotificationIOS.addNotificationRequest({
      id: 'localNotification',
      title: title || 'Default Title',
      body: message || 'This is a test notification.',
      userInfo: notificationData,
      sound: 'default',
    });
  } else {
    PushNotification.localNotification({
      channelId: Constants.CHANNEL_ID,
      title: title || 'Default Title',
      message: message || 'This is a test notification.',
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      data: notificationData,
    });
  }
};

export default SendNotification;
