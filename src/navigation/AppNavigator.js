// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import TabNavigator from './TabNavigator.js';
// import SplashScreen from '../screens/splash/SplashScreen.js';
// import LoginScreen from '../screens/login/LoginScreen.js';

// const Stack = createStackNavigator();

// const screenOptions = {
//   headerShown: false,
// };

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={screenOptions} initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen
//           name="Home"
//           component={TabNavigator}
//           options={{gestureEnabled: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../screens/login/LoginScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Use DrawerNavigator which wraps the TabNavigator */}
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
