import {PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {navigate} from '../ref/NavigationRef';
import Constants from '../../common/Constants';

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message: 'This app needs access to send you notifications.',
        buttonPositive: 'Allow',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  } else if (Platform.OS === 'ios') {
    const {alert, badge, sound} =
      await PushNotificationIOS.requestPermissions();
    console.log('Push Notification Permissions:', {alert, badge, sound});
  }
};

requestNotificationPermission();

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    if (notification.userInteraction) {
      const screenName = notification.data?.screen || 'Login';
      const params = notification.data?.params || {};
      navigate(screenName, params);
    }

    if (Platform.OS === 'ios') {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: Constants.CHANNEL_ID,
    channelName: 'HR Mobile App Notifications',
    channelDescription: 'A channel for HR Mobile App notifications',
    playSound: true,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  created => {
    console.log(`Channel creation result: ${created}`);
  },
);

if (Platform.OS === 'ios') {
  PushNotificationIOS.addEventListener('notification', notification => {
    console.log('iOS NOTIFICATION:', notification);

    if (notification.userInteraction) {
      const screenName = notification.data?.screen || 'Login';
      const params = notification.data?.params || {};
      navigate(screenName, params);
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  });

  PushNotificationIOS.addEventListener('localNotification', notification => {
    console.log('iOS LOCAL NOTIFICATION:', notification);

    if (notification.userInteraction) {
      const screenName = notification.data?.screen || 'Login';
      const params = notification.data?.params || {};
      navigate(screenName, params);
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  });
}
