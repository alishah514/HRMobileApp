import React from 'react';
import CommonSafeAreaView from '../../components/ReusableComponents/CommonSafeAreaView';
import Header from '../../components/Header/Header';
import LogoutConfirmation from '../../components/ReusableComponents/LogoutConfirmation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';

export default function ProfileScreen() {
  const handleLogout = LogoutConfirmation();

  return (
    <CommonSafeAreaView>
      <Header
        title="Profile"
        onRightIconPressed={handleLogout}
        rightIcon={
          <Ionicons
            name="log-out-outline"
            size={Constants.SIZE.medIcon}
            color={Colors.blueColor}
          />
        }
      />
    </CommonSafeAreaView>
  );
}
