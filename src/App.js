// App.js
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {CustomAlertProvider} from './components/ReusableComponents/CustomAlertProvider';
import {persistor, store} from './redux/store';
import AppWrapper from './AppWrapper';
import {navigationRef} from './components/ReusableComponents/ref/NavigationRef';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
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
