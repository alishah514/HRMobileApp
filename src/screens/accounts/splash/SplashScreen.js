import {SafeAreaView, ImageBackground, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from './styles';

export default function SplashScreen({navigation}) {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    const checkLoginStatus = () => {
      console.log('isLoggedIn', isLoggedIn);
      if (isLoggedIn) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    };

    const timeout = setTimeout(() => {
      checkLoginStatus();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation, isLoggedIn]);

  return (
    <SafeAreaView style={CommonStyles.containerCenter}>
      <ImageBackground
        source={require('../../../assets/images/BuildingHd.jpg')}
        style={[CommonStyles.fullscreenImage, CommonStyles.centerView]}
        resizeMode="cover">
        <Image
          source={require('../../../assets/images/AppLogo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
