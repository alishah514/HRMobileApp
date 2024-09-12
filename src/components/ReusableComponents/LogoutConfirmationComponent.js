import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import logout from '../utils/logout';

const LogoutConfirmationComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await logout(dispatch);

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
            );
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return handleLogout;
};

export default LogoutConfirmationComponent;
