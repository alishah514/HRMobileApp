import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView, Text} from 'react-native';
import CustomDrawerComponent from '../components/ReusableComponents/CustomDrawerComponent';
import {Colors} from '../components/common/Colors';
import CommonStyles from '../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/profile/ProfileScreen';
import HomeScreen from '../screens/home/HomeScreen';
import SettingScreen from '../screens/settings/SettingScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import {useSelector} from 'react-redux';
import I18n from '../i18n/i18n';
import TaskScreen from '../screens/tasks/TaskScreen';
import LeaveScreen from '../screens/leave/LeaveScreen';
import EventScreen from '../screens/events/EventScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import {useLoginData} from '../hooks/useLoginData';
import AdminAttendanceScreen from '../screens/attendance/Admin/AdminAttendanceScreen';
import AdminEmployeeScreen from '../screens/employees/AdminEmployeeScreen';
import AnnouncementScreen from '../screens/announcement/AnnouncementScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const currentLanguage = useSelector(state => state.language.language);
  const {role} = useLoginData();

  return (
    <SafeAreaView style={CommonStyles.container}>
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
            ...CommonStyles.whiteBackground,
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
                {I18n.t('home')}
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
          name="Attendance"
          component={
            role === 'Employee' ? AttendanceScreen : AdminAttendanceScreen
          }
          options={{
            drawerLabel: () => (
              <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
                {I18n.t('attendance')}
              </Text>
            ),
            drawerIcon: ({focused, size}) => (
              <Ionicons
                name={focused ? 'calendar' : 'calendar-outline'}
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
                {I18n.t('profile')}
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
        {role === 'Admin' && (
          <Drawer.Screen
            name="Employees"
            component={AdminEmployeeScreen}
            options={{
              drawerLabel: () => (
                <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
                  {I18n.t('employees')}
                </Text>
              ),
              drawerIcon: ({focused, size}) => (
                <Ionicons
                  name={focused ? 'people' : 'people-outline'}
                  size={size}
                  color={Colors.whiteColor}
                />
              ),
            }}
          />
        )}

        <Drawer.Screen
          name="Tasks"
          component={TaskScreen}
          initialParams={{source: 'drawer'}}
          options={{
            drawerLabel: () => (
              <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
                {I18n.t('tasks')}
              </Text>
            ),
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name={focused ? 'bag-personal' : 'bag-personal-outline'}
                size={size}
                color={Colors.whiteColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Leaves"
          component={LeaveScreen}
          initialParams={{source: 'drawer'}}
          options={{
            drawerLabel: () => (
              <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
                {I18n.t('leaves')}
              </Text>
            ),
            drawerIcon: ({focused, size}) => (
              <Ionicons
                name={focused ? 'receipt' : 'receipt-outline'}
                size={size}
                color={Colors.whiteColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Events"
          component={EventScreen}
          options={{
            drawerLabel: () => (
              <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
                {I18n.t('events')}
              </Text>
            ),
            drawerIcon: ({focused, size}) => (
              <Ionicons
                name={focused ? 'calendar-number' : 'calendar-number-outline'}
                size={size}
                color={Colors.whiteColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Announcements"
          component={AnnouncementScreen}
          options={{
            drawerLabel: () => (
              <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
                {I18n.t('announcements')}
              </Text>
            ),
            drawerIcon: ({focused, size}) => (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={size}
                color={Colors.whiteColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            drawerLabel: () => (
              <Text style={[CommonStyles.bold4, CommonStyles.textWhite]}>
                {I18n.t('googleCalendar')}
              </Text>
            ),
            drawerIcon: ({focused, size}) => (
              <Entypo
                name={focused ? 'google-' : 'google-'}
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
                {I18n.t('settings')}
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
    </SafeAreaView>
  );
};

export default DrawerNavigator;
