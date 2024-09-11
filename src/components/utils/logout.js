import {clearUserData} from '../../redux/actions/actions';
import {removeData} from '../../services/StorageService';

const logout = async dispatch => {
  try {
    await removeData('userData');
    dispatch(clearUserData());
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default logout;
