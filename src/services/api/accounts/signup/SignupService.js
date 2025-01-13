import axios from 'axios';
import Constants from '../../../../components/common/Constants';
import {CommonActions} from '@react-navigation/native';
import {Alert} from 'react-native';

const SignupService = {
  signup: async (userData, navigation) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      fields: {
        name: {
          stringValue: userData.name,
        },
        email: {
          stringValue: userData.email,
        },
        password: {
          stringValue: userData.password,
        },
        token: {
          stringValue: userData.token,
        },
        id: {
          integerValue: userData.id.toString(),
        },
        role: {
          stringValue: userData.role,
        },
      },
    };

    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
      Alert.alert('Account created successfully!');
      return {success: true, data: response.data};
    } catch (error) {
      console.error('Error in SignupService.signup:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  postNewUser: async userData => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}?key=${Constants.FIREBASE_KEY}`;
    const method = 'post';
    const body = {
      fields: {
        name: {
          stringValue: userData.name,
        },
        email: {
          stringValue: userData.email,
        },
        password: {
          stringValue: userData.password,
        },
        role: {
          stringValue: userData.role,
        },
      },
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {success: true, response: response.data};
    } catch (error) {
      console.error(
        'Error in postNewUser:',
        error.response?.data || error.message,
      );
      return {
        success: false,
        error:
          error.response?.data ||
          error.message ||
          'An unexpected error occurred.',
      };
    }
  },
};

export default SignupService;
