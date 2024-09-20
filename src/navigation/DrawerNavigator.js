import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView, Text} from 'react-native';
import TabNavigator from './TabNavigator'; // Import the TabNavigator
import CustomDrawerComponent from '../components/ReusableComponents/CustomDrawerComponent';
import {Colors} from '../components/common/Colors';
import CommonStyles from '../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {wp} from '../components/common/Dimensions';
import ProfileScreen from '../screens/profile/ProfileScreen';
import HomeScreen from '../screens/home/HomeScreen';
import SettingScreen from '../screens/settings/SettingScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerComponent
          {...props}
          backgroundColor={Colors.drawerColor}
        />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          ...CommonStyles.whiteColor,
          ...CommonStyles.width60,
        },
        drawerLabelStyle: {
          color: Colors.whiteColor,
        },
        drawerActiveBackgroundColor: Colors.drawerActiveColor,

        drawerActiveTintColor: Colors.blueColor,
        drawerInactiveTintColor: Colors.greyColor,
      }}>
      <Drawer.Screen
        name="Home Main"
        component={HomeScreen}
        options={{
          drawerLabel: () => (
            <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
              Home
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={Colors.whiteColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: () => (
            <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
              Profile
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={Colors.whiteColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerLabel: () => (
            <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
              Settings
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={Colors.whiteColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
