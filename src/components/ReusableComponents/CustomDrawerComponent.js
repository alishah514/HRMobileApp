import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Switch,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonStyles from '../common/CommonStyles';
import {wp} from '../common/Dimensions';
import {Colors} from '../common/Colors';
import Constants from '../common/Constants';
import {removeData} from '../../services/StorageService';

export default function CustomDrawerComponent(props) {
  const {navigation} = props;

  const [isEnabled, setIsEnabled] = useState(false);
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const loadSwitchState = async () => {
  //     try {
  //       const switchState = await AsyncStorage.getItem(
  //         Constants?.TOGGLE_SWITCH,
  //       );
  //       setIsEnabled(switchState === 'true');
  //     } catch (error) {
  //       console.error('Error loading switch state:', error);
  //     }
  //   };
  //   loadSwitchState();
  //   getUserDetails();
  // }, []);

  // const getUserDetails = async () => {
  //   try {
  //     const response = await Api.request('get', EndPoints.getUserDetails);
  //     if (response && response?.StatusCode && response?.StatusCode === 200) {
  //       setUserData(response?.Result);
  //     }
  //   } finally {
  //   }
  // };

  // const toggleSwitch = async () => {
  //   const newLanguage = isEnabled ? 'en' : 'ja';
  //   switchLanguage(newLanguage);
  //   setIsEnabled(!isEnabled);

  //   try {
  //     await AsyncStorage.setItem(Constants?.TOGGLE_SWITCH, String(!isEnabled));
  //   } catch (error) {
  //     console.error('Error saving switch state:', error);
  //   }
  // };

  const handleLogOutPress = () => {
    // showAlert({
    //   message: 'Are you sure you want to Logout?',
    //   title: 'Logout',
    //   button1: 'Yes',
    //   button2: 'No',
    //   onButton1: handleSignOut,
    // });
    handleSignOut();
  };

  const handleSignOut = () => {
    handleCloseDrawer();
    removeData(Constants?.BEARER_TOKEN);
    removeData(Constants?.IS_LOGGED_IN);
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleCloseDrawer = () => {
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: props.backgroundColor}}>
      <View
        style={[
          CommonStyles.margin5,
          {backgroundColor: props.backgroundColor},
        ]}>
        <View style={CommonStyles.flexRow}>
          <View style={CommonStyles.dpView}>
            <Ionicons
              name="person"
              size={Constants.SIZE.xLargeIcon}
              color={Colors.whiteColor}
            />
          </View>
          <View style={CommonStyles.padding3}>
            <View>
              <Text style={[CommonStyles.bold3p5, CommonStyles.textWhite]}>
                Ali Sultan Bukhari
              </Text>
            </View>
            <View style={CommonStyles.paddingTop1}>
              <Text style={[CommonStyles.lessBold3, CommonStyles.textWhite]}>
                ali@yahoo.com
              </Text>
            </View>
            <View style={CommonStyles.paddingTop1}>
              <Text style={[CommonStyles.lessBold3, CommonStyles.textWhite]}>
                Mobile App Developer
              </Text>
            </View>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />

      {/* <TouchableOpacity
        onPress={handleLogOutPress}
        style={CommonStyles.logoutView}>
        <Ionicons
          name="exit-outline"
          size={Constants?.SIZE.headerIcon}
          color={Colors.whiteColor}
        />
        <Text style={[CommonStyles.drawerText, {paddingLeft: wp('8')}]}>

          log out
        </Text>
      </TouchableOpacity> */}
      {/* <View style={CommonStyles.switchTopView}>
        <View style={CommonStyles.switchView}>
          <Switch
            trackColor={{false: '#767577', true: Colors.blueColor}}
            thumbColor={isEnabled ? '#f5dd4b' : Colors.whiteColor}
            style={
              Platform.OS === 'ios'
                ? {transform: [{scaleX: 0.7}, {scaleY: 0.7}]}
                : null
            }
            ios_backgroundColor={Colors.cadetGrey}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={CommonStyles.paddingLeftPlatform}>
          <Text style={CommonStyles.drawerText}>
            Switch To {currentLanguage === 'ja' ? 'English' : 'Japanese'}
          </Text>
        </View>
      </View> */}
    </DrawerContentScrollView>
  );
}
