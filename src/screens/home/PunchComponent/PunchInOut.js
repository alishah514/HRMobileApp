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
  fetchCurrentAttendance,
} from '../../../redux/attendance/AttendanceActions';
import {convertTime} from '../../../components/ReusableComponents/ConvertTime';
import {useFocusEffect} from '@react-navigation/native';

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
  const {currentAttendance} = useSelector(state => state.attendance);
  const [lastPunchInTimeState, setLastPunchInTimeState] = useState(null);
  const [lastPunchOutTimeState, setLastPunchOutTimeState] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getCurrentAttendance();
    }, []),
  );

  const getCurrentAttendance = () => {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const timestamp = currentDate.toISOString();
    return {userId, timestamp};
  };

  useEffect(() => {
    const {userId, timestamp} = getCurrentAttendance();
    if (userId && timestamp) {
      dispatch(fetchCurrentAttendance(userId, timestamp));
    }
  }, [userId]);

  useEffect(() => {
    if (currentAttendance && currentAttendance.length > 0) {
      const punchInArray = currentAttendance.filter(
        item => item.type === 'PunchIn',
      );
      const punchOutArray = currentAttendance.filter(
        item => item.type === 'PunchOut',
      );

      const latestPunchIn = punchInArray.sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate),
      )[0];
      const latestPunchOut = punchOutArray.sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate),
      )[0];

      if (latestPunchIn) {
        setLastPunchInTimeState(latestPunchIn?.creationDate);
      }

      if (latestPunchOut) {
        setLastPunchOutTimeState(latestPunchOut?.creationDate);
      }

      if (
        new Date(latestPunchIn?.creationDate) >
        new Date(latestPunchOut?.creationDate)
      ) {
        dispatch(savePunchInTime(latestPunchIn?.creationDate));
      } else {
        dispatch(savePunchOutTime(latestPunchOut?.creationDate));

        setTimeout(resetPunchTimes, 2000);
      }
    } else {
      console.log('No attendance data available');
    }
  }, [
    currentAttendance,
    punchInTime,
    punchOutTime,
    lastPunchInTime,
    lastPunchOutTime,
    lastPunchOutTimeState,
  ]);

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

  useEffect(() => {
    console.log('punchInTime----------->', punchInTime);
    console.log('punchOutTime------------>', punchOutTime);

    if (punchInTime && punchOutTime) {
      setTimeout(resetPunchTimes, 2000);
    }
  }, [punchInTime, punchOutTime]);

  const resetPunchTimes = () => {
    dispatch(clearAttendanceState());
    setCurrentTime(moment().format('HH:mm:ss'));
  };

  const handlePunch = async punchType => {
    try {
      if (await requestLocationPermission()) {
        const location = await getLocation(punchType);
        if (location) {
          const image = await takeSelfie();
          if (image) {
            submitAttendance(punchType, location, image.path);
          } else {
            Alert.alert('Failed to take a selfie');
          }
        } else {
          console.log(`Failed to get valid location during ${punchType}`);
        }
      }
    } catch (error) {
      console.log(`Error during ${punchType}:`, error);
    }
  };

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

  const getLocation = async value => {
    return new Promise(resolve => {
      try {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            if (value === 'PunchIn') {
              dispatch(savePunchInLocation(coords));
            } else {
              dispatch(savePunchOutLocation(coords));
            }
            dispatch(saveLocation(coords));

            resolve(coords);
          },
          error => {
            console.log('Error getting location:', error);
            const fallbackCoords = {
              latitude: 32.503006,
              longitude: 74.5009054,
            };

            if (value === 'PunchIn') {
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

  return (
    <View style={[CommonStyles.rowBetween]}>
      <TouchableOpacity
        onPress={() => handlePunch('PunchIn')}
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
          {lastPunchInTimeState && (
            <Text style={styles.lastTime}>
              Last:{' '}
              {convertTime(lastPunchInTime) ||
                convertTime(lastPunchInTimeState)}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePunch('PunchOut')}
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
          {lastPunchOutTimeState && (
            <Text style={styles.lastTime}>
              Last:{' '}
              {convertTime(lastPunchOutTime) ||
                convertTime(lastPunchOutTimeState)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
