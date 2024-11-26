import React, {useRef} from 'react';
import {View, Text, ImageBackground, Image, Alert} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {wp} from '../../../components/common/Dimensions';
import {Colors} from '../../../components/common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {TruncateTitle} from '../../../components/utils/TruncateTitle';
import {formatDate} from '../../../components/utils/dateUtils';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from '../styles';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';

export default function CardComponent({data}) {
  const viewShotRef = useRef();

  const calculateExpiryDate = dateString => {
    let date = new Date(dateString);
    date.setFullYear(date.getFullYear() + 1);
    const currentDate = new Date();
    if (currentDate > date) {
      date.setFullYear(date.getFullYear() + 1);
    }
    return formatDate(date.toISOString());
  };

  const qrCodeData = JSON.stringify({
    employeeId: data?.personal?.employeeId,
    name: data?.personal?.fullName,
    creationDate: formatDate(data?.createTime),
    expiryDate: calculateExpiryDate(data?.createTime),
  });

  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.capture({
        format: 'png',
        quality: 1.0,
      });
      const shareOptions = {
        title: 'Share Card',
        message: 'Here is my card information.',
        url: uri,
        type: 'image/png',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing image:', error);
      Alert.alert('Error', 'Failed to share the card.');
    }
  };

  return (
    <>
      <ViewShot
        ref={viewShotRef}
        options={{
          format: 'png',
          quality: 1.0,
        }}
        style={styles.viewShotStyle}>
        <ImageBackground
          source={require('../../../assets/images/background_card.jpg')}
          style={[styles.card]}>
          <View style={CommonStyles.rowBetween}>
            <Image
              source={require('../../../assets/images/AppLogo.png')}
              style={styles.logo}
            />
            <View style={styles.dpView}>
              <Ionicons
                name={'person'}
                size={Constants.SIZE.xLargeIcon}
                color={Colors.silverColor}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.details}>
              <Text style={styles.label}>
                ID No.{' '}
                <Text style={styles.value}>
                  {TruncateTitle(data?.personal?.employeeId, 17)}
                </Text>
              </Text>

              <Text style={styles.label}>
                Name:{' '}
                <Text style={styles.value}>
                  {TruncateTitle(data?.personal?.fullName, 21)}
                </Text>
              </Text>

              <Text style={styles.label}>
                Date Created:{' '}
                <Text style={styles.value}>{formatDate(data?.createTime)}</Text>
              </Text>

              <Text style={styles.label}>
                Date Expiry:{' '}
                <Text style={styles.value}>
                  {calculateExpiryDate(data?.createTime)}
                </Text>
              </Text>
            </View>

            <View style={styles.iconContainer}>
              <QRCode
                value={qrCodeData}
                size={wp(25)}
                color={Colors.blackColor}
                backgroundColor={Colors.whiteColor}
                ecl="H"
              />
            </View>
          </View>
        </ImageBackground>
      </ViewShot>

      <CommonButton title={'Export'} onPress={handleShare} />
    </>
  );
}
