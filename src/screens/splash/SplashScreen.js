import {SafeAreaView, ImageBackground, Image} from 'react-native';
import React, {useEffect} from 'react';
import CommonStyles from '../../components/common/CommonStyles';
import styles from './styles';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={CommonStyles.containerCenter}>
      <ImageBackground
        source={require('../../assets/images/BuildingHd.jpg')}
        style={[CommonStyles.fullscreenImage, CommonStyles.centerView]}
        resizeMode="cover">
        <SafeAreaView
          style={{
            ...CommonStyles.fullscreenImage,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            position: 'absolute',
          }}
        />
        <Image
          source={require('../../assets/images/AppLogo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
