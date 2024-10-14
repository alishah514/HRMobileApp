import {clearUserData} from '../../redux/login/LoginActions';

const logout = async dispatch => {
  try {
    dispatch(clearUserData());
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default logout;
