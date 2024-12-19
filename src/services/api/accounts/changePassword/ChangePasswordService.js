import axios from 'axios';
import Constants from '../../../../components/common/Constants';
const ChangePasswordService = {
  GetUserByEmailAndPassword: async (userId, currentPassword, newPassword) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}/${userId}?key=${Constants.FIREBASE_KEY}`;

    try {
      const response = await axios({
        url,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const userId = response?.data?.name.split('/').pop();

      const user = {
        id: userId,
        name: response.data.fields.name.stringValue,
        email: response.data.fields.email.stringValue,
        password: response.data.fields.password.stringValue,

        role: response.data.fields.role.stringValue,
      };

      if (user.password !== currentPassword) {
        return {
          success: false,
          error: 'Current password is incorrect',
        };
      }

      console.log('User:', JSON.stringify(user));

      const updatePasswordResult =
        await ChangePasswordService.UpdateUserPassword(user, newPassword);
      return updatePasswordResult;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }
  },

  UpdateUserPassword: async (user, newPassword) => {
    const url = `${Constants.FIREBASE_URL}/${Constants.USERS}/${user.id}?key=${Constants.FIREBASE_KEY}`;

    const body = {
      fields: {
        email: {
          stringValue: user.email,
        },
        name: {
          stringValue: user.name,
        },
        id: {
          stringValue: user.id,
        },
        password: {
          stringValue: newPassword,
        },

        role: {
          stringValue: user.role,
        },
      },
    };

    try {
      const response = await axios({
        url,
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
        },
        data: body,
      });

      if (response.status === 200) {
        return {
          success: true,
          message: 'Password updated successfully',
        };
      } else {
        return {
          success: false,
          error: 'Failed to update password',
        };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.message ||
          'An unexpected error occurred while updating the password.',
      };
    }
  },
};

export default ChangePasswordService;
