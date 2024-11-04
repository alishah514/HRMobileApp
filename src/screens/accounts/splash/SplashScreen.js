import {SafeAreaView, ImageBackground, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from './styles';
import {Colors} from '../../../components/common/Colors';
import {wp} from '../../../components/common/Dimensions';
import LogoLoaderComponent from '../../../components/ReusableComponents/LogoLoaderComponent';

export default function SplashScreen({navigation}) {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    const checkLoginStatus = () => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.loaderWrapper}>
          <View style={styles.loaderWrapperSmall}>
            <LogoLoaderComponent splash={true} />
          </View>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/AppLogoCrop.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
