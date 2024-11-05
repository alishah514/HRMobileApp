import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import CommonStyles from '../common/CommonStyles';

const LogoLoaderComponent = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotationAnimation = Animated.timing(rotation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.loop(rotationAnimation).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={CommonStyles.loader}>
      <View style={CommonStyles.loaderWrapper}>
        <View style={CommonStyles.loaderWrapperSmall}>
          <Animated.Image
            source={require('../../assets/icons/logo-icon.png')}
            style={[CommonStyles.logoContainer, {transform: [{rotate: spin}]}]}
          />
        </View>
      </View>
    </View>
  );
};

export default LogoLoaderComponent;
