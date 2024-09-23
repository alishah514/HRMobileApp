import React from 'react';

import Header from '../../components/ReusableComponents/Header/Header';
import LogoutConfirmationComponent from '../../components/ReusableComponents/LogoutConfirmationComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';

export default function SettingScreen() {
  const handleLogout = LogoutConfirmationComponent();

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title="Settings"
        onRightIconPressed={handleLogout}
        rightIcon={
          <Ionicons
            name="log-out-outline"
            size={Constants.SIZE.medIcon}
            color={Colors.blueColor}
          />
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
