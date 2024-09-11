import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import CommonStyles from '../../components/common/CommonStyles';
import {Colors} from '../../components/common/Colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Constants from '../../components/common/Constants';
import CommonSafeAreaView from '../../components/CommonSafeAreaView';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);

  const handleRememberMeChange = value => {
    setIsRememberMe(value);
  };

  return (
    <CommonSafeAreaView style={[CommonStyles.containerCenter]}>
      <ImageBackground
        source={require('../../assets/images/BuildingHd.jpg')}
        style={[styles.fullscreenImage]}
        resizeMode="cover">
        <View style={[styles.backgroundBlur, CommonStyles.centerView]}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled">
            <View style={styles.loginTitle}>
              <Text style={[CommonStyles.boldTitle, CommonStyles.textWhite]}>
                Login
              </Text>
            </View>
            <View style={CommonStyles.width80}>
              <View style={CommonStyles.paddingVertical2}>
                <Text style={[CommonStyles.lessBold4, CommonStyles.textWhite]}>
                  Email
                </Text>
                <TextInput
                  placeholder="Enter Email Address"
                  placeholderTextColor={Colors.greyColor}
                  style={CommonStyles.loginField}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={CommonStyles.paddingVertical2}>
                <Text style={[CommonStyles.lessBold4, CommonStyles.textWhite]}>
                  Password
                </Text>
                <TextInput
                  placeholder="Enter Password"
                  placeholderTextColor={Colors.greyColor}
                  style={CommonStyles.loginField}
                  secureTextEntry
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </View>

              <View style={[CommonStyles.rowBetween]}>
                <View
                  style={[CommonStyles.flexRow, CommonStyles.alignItemsCenter]}>
                  <Switch
                    value={isRememberMe}
                    onValueChange={handleRememberMeChange}
                    thumbColor={Colors.white}
                    trackColor={{
                      false: Colors.greyColor,
                      true: Colors.blueColor,
                    }}
                    ios_backgroundColor={Colors.greyColor}
                    style={styles.switchSize}
                  />
                  <Text
                    style={[
                      CommonStyles.paddingLeft2,
                      CommonStyles.lessBold3,
                      CommonStyles.textLightGrey,
                    ]}>
                    Remember me
                  </Text>
                </View>
                <Text
                  style={[
                    CommonStyles.lessBold3,
                    CommonStyles.textLightGrey,
                    CommonStyles.underlineText,
                    CommonStyles.paddingTop3,
                  ]}>
                  {`Forgot password?\n`}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.buttonStyle}>
                <Text style={[CommonStyles.lessBold4, CommonStyles.textWhite]}>
                  Login
                </Text>
              </TouchableOpacity>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text
                  style={[CommonStyles.lessBold3P, CommonStyles.textLightGrey]}>
                  Or login with
                </Text>
                <View style={styles.line} />
              </View>
              <View style={CommonStyles.rowBetween}>
                <View style={styles.loginBoxes}>
                  <Fontisto
                    name="google"
                    size={Constants.SIZE.smallIcon}
                    color={Colors.whiteColor}
                  />
                </View>
                <View style={styles.loginBoxes}>
                  <Fontisto
                    name="apple"
                    size={Constants.SIZE.smallIcon}
                    color={Colors.whiteColor}
                  />
                </View>
                <View style={styles.loginBoxes}>
                  <Fontisto
                    name="facebook"
                    size={Constants.SIZE.smallIcon}
                    color={Colors.whiteColor}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Text style={[CommonStyles.lessBold4, CommonStyles.textWhite]}>
              Don't have an account?{' '}
              <Text style={[CommonStyles.bold4, CommonStyles.textBlue]}>
                Signup
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </CommonSafeAreaView>
  );
}
