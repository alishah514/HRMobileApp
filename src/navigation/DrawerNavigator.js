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
        component={TabNavigator}
        options={{
          drawerLabel: () => (
            <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
              {/* {I18n.t('home', {locale: currentLanguage})} */}
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
