import React from 'react';
import CommonSafeAreaView from '../../components/ReusableComponents/CommonSafeAreaView';
import Header from '../../components/Header/Header';
import LogoutConfirmation from '../../components/ReusableComponents/LogoutConfirmation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import {Image, Text, View} from 'react-native';
import DocumentIcon from '../../assets/icons/documents.svg';

import styles from './styles';
import CommonStyles from '../../components/common/CommonStyles';

export default function HomeScreen() {
  const handleLogout = LogoutConfirmation();

  return (
    <CommonSafeAreaView>
      <Header
        title="Home"
        onRightIconPressed={handleLogout}
        rightIcon={
          <Ionicons
            name="log-out-outline"
            size={Constants.SIZE.medIcon}
            color={Colors.blueColor}
          />
        }
      />
      <View style={CommonStyles.backgroundBlue}>
        <View style={styles.titleView}>
          <Image
            source={require('../../assets/icons/logo-icon.png')}
            style={styles.logoIcon}
          />
          <Text style={[CommonStyles.boldTitle, CommonStyles.textWhite]}>
            M3Logi HR App
          </Text>
        </View>
        <View style={styles.boxStyles}>
          <View style={[styles.boxView, styles.firstView, CommonStyles.shadow]}>
            <View style={[styles.circleView, CommonStyles.yellowBorder]}>
              <Ionicons
                name={'document-text-outline'}
                size={Constants.SIZE.xLargeIcon}
                color={Colors.yellowColor}
              />
            </View>
            <View style={CommonStyles.alignItemsCenter}>
              <Text
                style={[
                  CommonStyles.bold6,
                  CommonStyles.textBlack,
                  CommonStyles.marginVertical2,
                ]}>
                140
              </Text>
              <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
                Projects
              </Text>
            </View>
          </View>
          <View
            style={[styles.boxView, styles.secondView, CommonStyles.shadow]}>
            <View style={[styles.circleView, CommonStyles.blueBorder]}>
              <Ionicons
                name={'person-outline'}
                size={Constants.SIZE.xLargeIcon}
                color={Colors.blueColor}
              />
            </View>
            <View style={CommonStyles.alignItemsCenter}>
              <Text
                style={[
                  CommonStyles.bold6,
                  CommonStyles.textBlack,
                  CommonStyles.marginVertical2,
                ]}>
                50
              </Text>
              <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
                Clients
              </Text>
            </View>
          </View>
          <View style={[styles.boxView, styles.thirdView, CommonStyles.shadow]}>
            <View style={[styles.circleView, CommonStyles.yellowBorder]}>
              <MaterialCommunityIcons
                name={'bag-personal-outline'}
                size={Constants.SIZE.xLargeIcon}
                color={Colors.yellowColor}
              />
            </View>
            <View style={CommonStyles.alignItemsCenter}>
              <Text
                style={[
                  CommonStyles.bold6,
                  CommonStyles.textBlack,
                  CommonStyles.marginVertical2,
                ]}>
                14
              </Text>
              <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
                Employees
              </Text>
            </View>
          </View>
          <View
            style={[styles.boxView, styles.fourthView, CommonStyles.shadow]}>
            <View style={[styles.circleView, CommonStyles.blueBorder]}>
              <Ionicons
                name={'receipt-outline'}
                size={Constants.SIZE.xLargeIcon}
                color={Colors.blueColor}
              />
            </View>
            <View style={CommonStyles.alignItemsCenter}>
              <Text
                style={[
                  CommonStyles.bold6,
                  CommonStyles.textBlack,
                  CommonStyles.marginVertical2,
                ]}>
                140
              </Text>
              <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
                Invoices
              </Text>
            </View>
          </View>
        </View>
      </View>
    </CommonSafeAreaView>
  );
}
