import axios from 'axios';
import Constants from '../../../../components/common/Constants';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const LoginService = {
  login: async (email, password, navigation) => {
    const url = `${Constants.FIREBASE_URL}/users?key=${Constants.FIREBASE_KEY}`;
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
        const documentId = doc.name.split('/').pop();

        return {
          id: documentId,
          name: doc.fields.name.stringValue,
          email: doc.fields.email.stringValue,
          password: doc.fields.password.stringValue,
          token: doc.fields.token.stringValue,
          role: doc.fields.role.stringValue,
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
