import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';

// Function to request user's permission to receive notifications
export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    } else {
      console.log('Notification permission not granted');
      return false;
    }
  } catch (error) {
    console.error('Failed to request permission:', error);
    return false;
  }
};

// Function to get the device token
export const getDeviceToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('Device FCM Token:', token);
    // Send this token to your backend server for future notifications
    return token;
  } catch (error) {
    console.error('Failed to get device token:', error);
  }
};

// Function to handle foreground notifications
export const onMessageReceived = message => {
  console.log('Foreground notification received:', message);
  Alert.alert('New Notification', message.notification.body);
};

// Function to handle token refresh
const onTokenRefresh = async () => {
  try {
    const newToken = await messaging().getToken();
    console.log('New device FCM Token:', newToken);
    // Send this new token to your backend server for future notifications
  } catch (error) {
    console.error('Failed to refresh token:', error);
  }
};

// Function to set up notification handlers
export const setupNotificationHandlers = () => {
  // Handle foreground messages
  const unsubscribeOnMessage = messaging().onMessage(onMessageReceived);

  // Handle background messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // You can also handle background notification payload here
  });

  // Handle token refresh
  const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(onTokenRefresh);

  return () => {
    unsubscribeOnMessage();
    unsubscribeOnTokenRefresh();
  };
};
