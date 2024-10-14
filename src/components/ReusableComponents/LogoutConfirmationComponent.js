import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import logout from '../utils/logout';
import I18n from '../../i18n/i18n';

const LogoutConfirmationComponent = () => {
  const navigation = useNavigation();
  const currentLanguage = useSelector(state => state.language.language);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    Alert.alert(
      I18n.t('logout'),
      I18n.t('logoutConfirmation'),
      [
        {
          text: I18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: I18n.t('logout'),
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
