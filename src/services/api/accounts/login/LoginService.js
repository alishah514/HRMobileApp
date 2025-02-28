import axios from 'axios';
import Constants from '../../../../components/common/Constants';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {extractId} from '../../../../components/utils/ExtractId';
import {getDeviceToken} from '../../../../components/ReusableComponents/firebase/FirebaseNotifications';

const LoginService = {
  login: async (email, password, navigation) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'get';

    try {
      const response = await axios({
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const users = response.data.documents.map(doc => {
        const documentId = extractId(doc.name);

        return {
          id: documentId,
          name: doc.fields.name.stringValue,
          email: doc.fields.email.stringValue,
          password: doc.fields.password.stringValue,
          token: documentId,
          role: doc.fields.role.stringValue,
          // fcmToken: doc.fields?.fcmToken?.stringValue,
        };
      });

      const matchedUser = users.find(
        user => user.email === email && user.password === password,
      );

      if (matchedUser) {
        console.log('User Login', matchedUser);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );

        return {
          success: true,
          data: {
            id: matchedUser.id,
            name: matchedUser.name,
            token: matchedUser.token,
            role: matchedUser.role,
            // fcmToken: matchedUser?.fcmToken,
          },
        };
      } else {
        Alert.alert('Error', 'Invalid email or password');
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');

      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },
};

export default LoginService;
