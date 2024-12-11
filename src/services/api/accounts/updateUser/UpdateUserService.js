import axios from 'axios';
import Constants from '../../../../components/common/Constants';

const UpdateUserService = {
  updateUser: async (userId, userData) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}/${userId}?key=${Constants.FIREBASE_KEY}`;
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
      const response = await axios.patch(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {success: true, response: response.data};
    } catch (error) {
      console.error(
        'Error in updateUser:',
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

export default UpdateUserService;
