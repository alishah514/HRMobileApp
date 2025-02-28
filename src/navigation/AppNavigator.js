import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/accounts/splash/SplashScreen';
import LoginScreen from '../screens/accounts/login/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import LeaveScreen from '../screens/leave/LeaveScreen';
import TaskScreen from '../screens/tasks/TaskScreen';
import SignupScreen from '../screens/accounts/signup/SignupScreen';
import ForgotPasswordScreen from '../screens/accounts/forgotPassword/ForgotPasswordScreen';
import ChangePasswordScreen from '../screens/settings/screens/changePassword/ChangePasswordScreen';
import LocalizationScreen from '../screens/settings/screens/localization/LocalizationScreen';
import AttendanceDetails from '../screens/attendance/AttendanceRecord/AttendanceDetails';
import AdminAttendanceScreen from '../screens/attendance/Admin/AdminAttendanceScreen';

import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import AdminEmployeeScreen from '../screens/employees/AdminEmployeeScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Leave" component={LeaveScreen} />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
      <Stack.Screen name="Localization" component={LocalizationScreen} />
      <Stack.Screen name="Attendance Details" component={AttendanceDetails} />
      <Stack.Screen
        name="Admin All Employees"
        component={AdminEmployeeScreen}
      />

      <Stack.Screen
        name="Admin Attendance Details"
        component={AttendanceScreen}
      />
      <Stack.Screen name="Admin Attendance" component={AdminAttendanceScreen} />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default AppNavigator;
