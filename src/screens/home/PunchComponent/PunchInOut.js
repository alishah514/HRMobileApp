import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../../../components/common/CommonStyles';
import styles from '../styles';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import I18n from '../../../i18n/i18n';
import {
  saveLocation,
  savePunchInTime,
  savePunchOutTime,
  saveTimer,
  savePunchInLocation,
  savePunchOutLocation,
  postAttendance,
  clearAttendanceState,
  saveLastPunchInTime,
  saveLastPunchOutTime,
} from '../../../redux/attendance/AttendanceActions';
import {convertTime} from '../../../components/ReusableComponents/ConvertTime';

export default function PunchInOut() {
  const dispatch = useDispatch();
  const punchInTime = useSelector(state => state.attendance.punchInTime);
  const punchOutTime = useSelector(state => state.attendance.punchOutTime);
  const lastPunchInTime = useSelector(
    state => state.attendance.lastPunchInTime,
  );
  const lastPunchOutTime = useSelector(
    state => state.attendance.lastPunchOutTime,
  );
  const userId = useSelector(state => state.login.userId);
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

  const submitAttendance = async (type, location, imagePath) => {
    const timestamp = moment().format('MMMM D, YYYY [at] h:mm:ss A [UTC]Z');
    const attendanceData = {
      creationDate: timestamp,
      latitude: location?.latitude,
      longitude: location?.longitude,
      type,
      userId,
      imageUrl: imagePath,
    };

    const response = await dispatch(postAttendance(attendanceData));

    if (response.success) {
      let isType = '';

      if (type === 'PunchIn') {
        isType = 'Punched In';
        dispatch(saveLastPunchInTime(timestamp));
        dispatch(savePunchInTime(timestamp));
      } else {
        isType = 'Punched Out';
        dispatch(saveLastPunchOutTime(timestamp));
        dispatch(savePunchOutTime(timestamp));
      }

      Alert.alert(`${isType} successfully`);
    } else {
      console.error('Failed to post attendance:', response.error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (punchInTime && punchOutTime) {
      const punchInMoment = moment(punchInTime, 'HH:mm:ss');
      const punchOutMoment = moment(punchOutTime, 'HH:mm:ss');
      const diffInSeconds = punchOutMoment.diff(punchInMoment, 'seconds');
      const formattedDiff = moment.utc(diffInSeconds * 1000).format('HH:mm:ss');

      dispatch(saveTimer(formattedDiff));
    }
  }, [punchInTime, punchOutTime, dispatch]);

  const requestLocationPermission = async () => {
    const LOCATION_PERMISSION = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });
    try {
      const permissionStatus = await check(LOCATION_PERMISSION);
      if (permissionStatus === 'granted') return true;
      const requestResult = await request(LOCATION_PERMISSION);
      return requestResult === 'granted';
    } catch (err) {
      console.warn('Permission request error:', err);
      return false;
    }
  };

  const takeSelfie = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      return image;
    } catch (err) {
      console.log('Error taking selfie:', err);
    }
  };

  const getLocation = async value => {
    return new Promise(resolve => {
      try {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            if (value === 'punch-in') {
              dispatch(savePunchInLocation(coords));
            } else {
              dispatch(savePunchOutLocation(coords));
            }
            dispatch(saveLocation(coords));

            resolve(coords);
          },
          error => {
            console.log('Error getting location:', error);
            const fallbackCoords = {latitude: 32.503006, longitude: 74.5009054};

            if (value === 'punch-in') {
              dispatch(savePunchInLocation(fallbackCoords));
            } else {
              dispatch(savePunchOutLocation(fallbackCoords));
            }
            dispatch(saveLocation(fallbackCoords));
            resolve(fallbackCoords);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } catch (err) {
        console.warn('Error fetching location:', err);
        resolve(null);
      }
    });
  };

  const handlePunchIn = async () => {
    const formattedPunchInTime = moment().format('HH:mm:ss');

    try {
      if (await requestLocationPermission()) {
        const location = await getLocation('punch-in');
        if (location) {
          const image = await takeSelfie();
          if (image) {
            submitAttendance('PunchIn', location, image.path);
          } else {
            Alert.alert('Failed to take a selfie');
          }
        } else {
          console.log('Failed to get valid location during Punch In');
        }
      }
    } catch (error) {
      console.log('Error during Punch In:', error);
    }
  };

  const handlePunchOut = async () => {
    const formattedPunchOutTime = moment().format('HH:mm:ss');

    try {
      if (await requestLocationPermission()) {
        const location = await getLocation('punch-out');
        if (location) {
          const image = await takeSelfie();
          if (image) {
            submitAttendance('PunchOut', location, image.path);
          } else {
            console.log('Failed to take a selfie');
          }
        } else {
          console.log('Failed to get valid location during Punch Out');
        }
      }
    } catch (error) {
      console.log('Error during Punch Out:', error);
    }
  };

  useEffect(() => {
    if (punchInTime && punchOutTime) {
      setTimeout(resetPunchTimes, 2000);
    }
  }, [punchInTime, punchOutTime]);

  const resetPunchTimes = () => {
    dispatch(clearAttendanceState());
    setCurrentTime(moment().format('HH:mm:ss'));
  };

  return (
    <View style={[CommonStyles.rowBetween]}>
      <TouchableOpacity
        onPress={handlePunchIn}
        style={[styles.boxView, CommonStyles.shadow]}
        disabled={!!punchInTime}>
        <View style={[styles.circleView, CommonStyles.yellowBorder]}>
          <Ionicons
            name={
              punchInTime ? 'checkmark-circle-outline' : 'finger-print-outline'
            }
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
            {punchInTime ? convertTime(punchInTime) : currentTime}
          </Text>
          <Text
            style={[
              CommonStyles.font4P,
              punchInTime ? CommonStyles.textYellow : CommonStyles.textBlack,
            ]}>
            {punchInTime ? I18n.t('punchedIn') : I18n.t('punchIn')}
          </Text>
          {lastPunchInTime && (
            <Text style={styles.lastTime}>
              Last: {convertTime(lastPunchInTime)}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePunchOut}
        style={[styles.boxView, CommonStyles.marginTop10, CommonStyles.shadow]}
        disabled={!punchInTime || !!punchOutTime}>
        <View style={[styles.circleView, CommonStyles.blueBorder]}>
          <Ionicons
            name={
              punchOutTime ? 'checkmark-circle-outline' : 'finger-print-outline'
            }
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
            {punchOutTime ? convertTime(punchOutTime) : currentTime}
          </Text>
          <Text
            style={[
              CommonStyles.font4P,
              punchOutTime ? CommonStyles.textBlue : CommonStyles.textBlack,
            ]}>
            {punchOutTime ? I18n.t('punchedOut') : I18n.t('punchOut')}
          </Text>
          {lastPunchOutTime && (
            <Text style={styles.lastTime}>
              Last: {convertTime(lastPunchOutTime)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
