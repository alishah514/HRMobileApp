import React, {useEffect} from 'react';
import {AppState, PermissionsAndroid, Platform, Alert} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {CustomAlertProvider} from './components/ReusableComponents/CustomAlertProvider';
import {persistor, store} from './redux/store';
import AppWrapper from './AppWrapper';
import {navigationRef} from './components/ReusableComponents/ref/NavigationRef';
import {NavigationContainer} from '@react-navigation/native';
// import {
//   getDeviceToken,
//   requestUserPermission,
//   setupNotificationHandlers,
// } from './components/ReusableComponents/firebase/FirebaseNotifications';

export default function App() {
  // useEffect(() => {
  //   const handleAppStateChange = nextAppState => {
  //     if (nextAppState === 'active') {
  //       // Request permission and get device token when app comes to the foreground
  //       requestPermissions();
  //     }
  //   };

  //   const requestPermissions = async () => {
  //     if (Platform.OS === 'android') {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //           {
  //             title: 'Notification Permission',
  //             message: 'This app needs access to your notifications',
  //             buttonNeutral: 'Ask Me Later',
  //             buttonNegative: 'Cancel',
  //             buttonPositive: 'OK',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           console.log('Notification permission granted');
  //           getDeviceToken();
  //         } else {
  //           console.log('Notification permission denied');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //     } else {
  //       // iOS permission request is handled in requestUserPermission
  //       requestUserPermission().then(granted => {
  //         if (granted) {
  //           getDeviceToken();
  //         }
  //       });
  //     }
  //   };

  //   // Set up notification handlers
  //   const unsubscribe = setupNotificationHandlers();

  //   // Add event listener for app state changes
  //   AppState.addEventListener('change', handleAppStateChange);

  //   // Initial permission request
  //   requestPermissions();

  //   return () => {
  //     // Clean up the subscription on unmount
  //     unsubscribe();
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomAlertProvider>
          <NavigationContainer ref={navigationRef}>
            <AppWrapper />
          </NavigationContainer>
        </CustomAlertProvider>
      </PersistGate>
    </Provider>
  );
}
