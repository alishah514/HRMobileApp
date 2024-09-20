import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../components/common/CommonStyles';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingScreen from '../screens/settings/SettingScreen';
import {Colors} from '../components/common/Colors';
import {wp} from '../components/common/Dimensions';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View style={[CommonStyles.container, CommonStyles.whiteColor]}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // This hides the header on each tab screen
          tabBarShowLabel: false, // Removes the default tab labels
          tabBarStyle: [CommonStyles.tabBarStyle, CommonStyles.shadowTabBar],
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={CommonStyles.tabBarItemView}>
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={wp('6')}
                  color={focused ? Colors.blackColor : Colors.greyColor}
                />
                <Text
                  style={[
                    {color: focused ? Colors.blackColor : Colors.greyColor},
                    CommonStyles.tabBarItemText,
                  ]}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={CommonStyles.tabBarItemView}>
                <Ionicons
                  name={focused ? 'person' : 'person-outline'}
                  size={wp(6)}
                  color={focused ? Colors.blackColor : Colors.greyColor}
                />
                <Text
                  style={[
                    {color: focused ? Colors.blackColor : Colors.greyColor},
                    CommonStyles.tabBarItemText,
                  ]}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={CommonStyles.tabBarItemView}>
                <Ionicons
                  name={focused ? 'settings' : 'settings-outline'}
                  size={wp(6)}
                  color={focused ? Colors.blackColor : Colors.greyColor}
                />
                <Text
                  style={[
                    {color: focused ? Colors.blackColor : Colors.greyColor},
                    CommonStyles.tabBarItemText,
                  ]}>
                  Settings
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
