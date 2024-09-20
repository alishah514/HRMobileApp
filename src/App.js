// App.js
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './navigation/AppNavigator';
import {CustomAlertProvider} from './components/ReusableComponents/CustomAlertProvider';
import {persistor, store} from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomAlertProvider>
          <AppNavigator />
        </CustomAlertProvider>
      </PersistGate>
    </Provider>
  );
}
