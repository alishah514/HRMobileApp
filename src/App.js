import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';
import {CustomAlertProvider} from './components/ReusableComponents/CustomAlertProvider';

export default function App() {
  return (
    <Provider store={store}>
      <CustomAlertProvider>
        <AppNavigator />
      </CustomAlertProvider>
    </Provider>
  );
}
