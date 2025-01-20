import React from 'react';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import CommonStyles from '../../components/common/CommonStyles';
import {Button, Text, View} from 'react-native';
import SettingList from './list/SettingList';
import I18n from '../../i18n/i18n';
import {useSelector} from 'react-redux';
import SendNotification from '../../components/utils/SendNotification';

export default function SettingScreen({navigation}) {
  const currentLanguage = useSelector(state => state.language.language);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const handleSendNotificationWithScreenName = () => {
    SendNotification(
      navigation,
      'Custom Title',
      'This is a custom message.',
      {itemId: 42},
      'Leave',
    );
  };

  const handleSendNotificationWithoutScreenName = () => {
    SendNotification(navigation, 'Another Title', 'This is another message.');
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title={I18n.t('settings')}
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topVerySmall
        topChild={
          <View style={CommonStyles.width90}>
            <Text style={[CommonStyles.lessBold5P, CommonStyles.textWhite]}>
              {I18n.t('listOfSettings')}
            </Text>
          </View>
        }
        bottomChild={
          <View
            style={[
              CommonStyles.width90,
              CommonStyles.alignSelf,
              CommonStyles.marginTop7,
            ]}>
            <SettingList navigation={navigation} />
            <Button
              title="Click Here"
              onPress={handleSendNotificationWithScreenName}
            />

            <View style={CommonStyles.marginBottom5} />
            <Button
              title="Click Here Without Screen Name"
              onPress={handleSendNotificationWithoutScreenName}
            />
          </View>
        }
      />
    </CommonSafeAreaViewComponent>
  );
}
