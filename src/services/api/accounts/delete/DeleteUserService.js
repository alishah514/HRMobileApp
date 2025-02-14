import axios from 'axios';
import Constants from '../../../../components/common/Constants';
import {CommonActions} from '@react-navigation/native';
import {Alert} from 'react-native';
import GenericApiComponent from '../../../GenericApiComponent';

const DeleteUserService = {
  deleteUser: async userId => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}/${userId}?key=${Constants.FIREBASE_KEY}`;
    const method = 'delete';

    try {
      const response = await GenericApiComponent(url, method);

      if (response) {
        return {success: true, message: 'User deleted successfully'};
      } else {
        return {success: false, error: 'Failed to delete User'};
      }
    } catch (error) {
      console.error('Error in UserService.deleteUser:', error);
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },
};

export default DeleteUserService;
