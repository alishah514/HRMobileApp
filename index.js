/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import './src/components/ReusableComponents/config/PushNotificationConfig';

AppRegistry.registerComponent(appName, () => App);
