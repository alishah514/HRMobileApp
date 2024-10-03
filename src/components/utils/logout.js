import {clearUserData} from '../../redux/actions/actions';

const logout = async dispatch => {
  try {
    dispatch(clearUserData());
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default logout;
