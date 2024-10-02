import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from '../styles';
import {
  savePunchInTime,
  savePunchOutTime,
  saveTimer,
} from '../../../redux/actions/actions';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import I18n from '../../../i18n/i18n';

export default function PunchInOut({
  punchInTime,
  punchOutTime,
  setPunchInTime,
  setPunchOutTime,
  reduxTimer,
  location,
  setLocation,
}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language);
  const [timer, setTimer] = useState('00:00:00');

  useEffect(() => {
    if (reduxTimer) setTimer(reduxTimer);
    if (punchInTime) setPunchInTime(punchInTime);
    if (punchOutTime) setPunchOutTime(punchOutTime);
  }, [reduxTimer, punchInTime, punchOutTime, setPunchInTime, setPunchOutTime]);

  useEffect(() => {
    if (punchInTime && punchOutTime) {
      const punchInMoment = moment(punchInTime, 'HH:mm:ss');
      const punchOutMoment = moment(punchOutTime, 'HH:mm:ss');
      const diffInSeconds = punchOutMoment.diff(punchInMoment, 'seconds');

      const formattedDiff = moment.utc(diffInSeconds * 1000).format('HH:mm:ss');
      setTimer(formattedDiff);
      dispatch(saveTimer(formattedDiff));
    }
  }, [punchInTime, punchOutTime, dispatch]);

  const requestLocationPermission = async () => {
    try {
      const granted =
        Platform.OS === 'android'
          ? await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
          : await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (
        granted === PermissionsAndroid.RESULTS.GRANTED ||
        granted === 'granted'
      ) {
        return true;
      }
    } catch (err) {
      console.warn(err);
    }
    return false;
  };

  const getLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          console.log('Geolocation:', coords);
        },
        error => {
          console.log('Error getting location:', error);
          // Fallback to static coordinates
          setLocation({latitude: 32.503006, longitude: 74.5009054});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      console.warn('Error:', err);
    }
  };

  const takeSelfie = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      console.log('Selfie taken:', image);
      return image;
    } catch (err) {
      console.log('Error taking selfie:', err);
    }
  };

  const handlePunchIn = async () => {
    const formattedPunchInTime = moment().format('HH:mm:ss');
    try {
      if (await requestLocationPermission()) {
        await getLocation();
        await takeSelfie();
        setPunchInTime(formattedPunchInTime);
        dispatch(savePunchInTime(formattedPunchInTime));
      }
    } catch (error) {
      console.log('Error during Punch In:', error);
    }
  };

  const handlePunchOut = async () => {
    const formattedPunchOutTime = moment().format('HH:mm:ss');
    try {
      if (await requestLocationPermission()) {
        await getLocation();
        await takeSelfie();
        setPunchOutTime(formattedPunchOutTime);
        dispatch(savePunchOutTime(formattedPunchOutTime));
      }
    } catch (error) {
      console.log('Error during Punch Out:', error);
    }
  };

  return (
    <View style={[CommonStyles.rowBetween]}>
      <TouchableOpacity
        onPress={handlePunchIn}
        style={[styles.boxView, CommonStyles.shadow]}>
        <View style={[styles.circleView, CommonStyles.yellowBorder]}>
          <Ionicons
            name="finger-print-outline"
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
            {punchInTime || '00:00:00'}
          </Text>
          <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
            {I18n.t('punchIn')}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePunchOut}
        style={[styles.boxView, CommonStyles.marginTop10, CommonStyles.shadow]}>
        <View style={[styles.circleView, CommonStyles.blueBorder]}>
          <Ionicons
            name="finger-print-outline"
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
            {punchOutTime || '00:00:00'}
          </Text>
          <Text style={[CommonStyles.font5, CommonStyles.textBlack]}>
            {I18n.t('punchOut')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
