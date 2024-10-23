import {Alert} from 'react-native';
import ChangePasswordService from '../../services/api/accounts/changePassword/ChangePasswordService';
import {
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from '../actions/actionTypes';

export const ChangePasswordStart = () => ({
  type: CHANGE_PASSWORD_START,
});

export const ChangePasswordSuccess = userData => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: userData,
});

export const ChangePasswordFailure = error => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: {error},
});

export const ChangePasswordAction =
  (userId, currentPassword, newPassword) => async dispatch => {
    dispatch(ChangePasswordStart());
    try {
      const response = await ChangePasswordService.GetUserByEmailAndPassword(
        userId,
        currentPassword,
        newPassword,
      );

      if (response.success) {
        dispatch(ChangePasswordSuccess(response.user));
        Alert.alert('Success', 'Password changed successfully');
        return {success: true, response};
      } else {
        dispatch(ChangePasswordFailure(response.error));
        Alert.alert('Error', response.error || 'Password change failed');
        return {success: false, response};
      }
    } catch (error) {
      dispatch(
        ChangePasswordFailure(error.message || 'An unexpected error occurred.'),
      );
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      return {success: false, response: null};
    }
  };
