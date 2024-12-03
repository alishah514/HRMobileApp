import React, {useCallback, useEffect, useState} from 'react';
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
  fetchAttendance,
} from '../../../redux/attendance/AttendanceActions';
import {convertTime} from '../../../components/ReusableComponents/ConvertTime';
import {useFocusEffect} from '@react-navigation/native';
import {handleImageUploadAWS} from '../../../components/utils/HandleImageUploadAWS';

export default function PunchInOut({setIsLoading, username}) {
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
  const [isPunchInDisabled, setIsPunchInDisabled] = useState(false);
  const [isPunchOutDisabled, setIsPunchOutDisabled] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const {userId, timestamp} = getCurrentAttendance();
      if (userId && timestamp) {
        dispatch(fetchCurrentAttendance(userId, timestamp));
      }
    }, [dispatch, punchInTime, punchOutTime]),
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
  }, [userId, dispatch]);

  useEffect(() => {
    const validAttendance = currentAttendance?.filter(
      item => item.creationDate && item.type,
    );

    if (!validAttendance || validAttendance?.length === 0) {
      setIsPunchInDisabled(false);
      setIsPunchOutDisabled(false);
      dispatch(clearAttendanceState());

      return;
    }

    validAttendance.sort(
      (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
    );

    let lastPunchIn = null;
    let secondToLastPunchIn = null;
    let lastPunchOut = null;
    let secondToLastPunchOut = null;

    const dispatchPunchIn = punchInDate => {
      dispatch(savePunchInTime(punchInDate));
    };

    const dispatchPunchOut = punchOutDate => {
      dispatch(savePunchOutTime(punchOutDate));
    };

    for (const record of validAttendance) {
      if (record.type === 'PunchIn') {
        secondToLastPunchIn = lastPunchIn;
        lastPunchIn = record;

        dispatchPunchIn(record.creationDate);
        setIsPunchInDisabled(true);
        setIsPunchOutDisabled(false);
      } else if (record.type === 'PunchOut') {
        secondToLastPunchOut = lastPunchOut;
        lastPunchOut = record;

        dispatchPunchOut(record.creationDate);
        setIsPunchOutDisabled(true);
        setIsPunchInDisabled(false);
      }
    }

    if (secondToLastPunchIn) {
      dispatch(saveLastPunchInTime(secondToLastPunchIn.creationDate));
    }

    if (secondToLastPunchOut) {
      dispatch(saveLastPunchOutTime(secondToLastPunchOut.creationDate));
    }

    if (lastPunchIn && !lastPunchOut) {
      dispatchPunchIn(lastPunchIn.creationDate);
    }
  }, [
    currentAttendance,
    punchInTime,
    punchOutTime,
    lastPunchInTime,
    lastPunchOutTime,
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

  const handlePunch = async punchType => {
    setIsLoading(true);
    if (isButtonPressed) return;

    setIsButtonPressed(true);
    try {
      if (await requestLocationPermission()) {
        const location = await getLocation(punchType);
        if (location) {
          const image = await takeSelfie(punchType);
          if (image) {
            submitAttendance(punchType, location, image);
          } else {
            console.log('Failed to take a selfie');
          }
        } else {
          console.log(`Failed to get valid location during ${punchType}`);
        }
      }
    } catch (error) {
      console.log(`Error during ${punchType}:`, error);
    } finally {
      setIsButtonPressed(false);
      setIsLoading(false);
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

  const takeSelfie = async punchType => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });

      if (image) {
        const uploadedUrl = await generatePathAndUploadImage(image, punchType);
        return uploadedUrl;
      }
    } catch (err) {
      console.log('Error taking selfie:', err);
    }
  };

  const generatePathAndUploadImage = async (image, punchType) => {
    try {
      const currentDate = moment();
      const year = currentDate.format('YYYY');
      const month = currentDate.format('MM');
      const day = currentDate.format('DD');
      const time = currentDate.format('HHmmssSSS');

      let formattedUsername = username.replace(/ /g, '');

      const userIdLast4 = userId.slice(-4);

      const path = `Attendance/${punchType}/${year}/${month}/${day}/${userIdLast4}_${formattedUsername}/${time}`;

      const uploadedUrl = await handleImageUploadAWS(image, null, null, path);
      return uploadedUrl;
    } catch (err) {
      console.log('Error uploading image:', err);
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

        dispatch(savePunchInTime(timestamp));
        setIsPunchOutDisabled(false);
        setIsPunchInDisabled(true);
      } else {
        isType = 'Punched Out';

        dispatch(savePunchOutTime(timestamp));
        setIsPunchOutDisabled(true);
        setIsPunchInDisabled(false);
        dispatch(fetchAttendance(userId));
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
        style={[styles.boxView, CommonStyles.shadow, CommonStyles.height48]}
        disabled={isPunchInDisabled || isButtonPressed}>
        <View style={[styles.circleView, CommonStyles.yellowBorder]}>
          <Ionicons
            name={
              isPunchInDisabled
                ? 'checkmark-circle-outline'
                : 'finger-print-outline'
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
            {isPunchInDisabled ? convertTime(punchInTime) : currentTime}
          </Text>
          <Text
            style={[
              CommonStyles.font4P,
              isPunchInDisabled
                ? CommonStyles.textYellow
                : CommonStyles.textBlack,
            ]}>
            {isPunchInDisabled ? I18n.t('punchedIn') : I18n.t('punchIn')}
          </Text>
          {lastPunchInTime && (
            <Text style={styles.lastTime}>
              Last: {convertTime(lastPunchInTime)}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePunch('PunchOut')}
        style={[
          styles.boxView,
          CommonStyles.marginTop8,
          CommonStyles.shadow,
          CommonStyles.height48,
        ]}
        disabled={
          isPunchOutDisabled ||
          (!isPunchOutDisabled && !isPunchInDisabled) ||
          isButtonPressed
        }>
        <View style={[styles.circleView, CommonStyles.blueBorder]}>
          <Ionicons
            name={
              isPunchOutDisabled
                ? 'checkmark-circle-outline'
                : 'finger-print-outline'
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
            {isPunchOutDisabled ? convertTime(punchOutTime) : currentTime}
          </Text>
          <Text
            style={[
              CommonStyles.font4P,
              isPunchOutDisabled
                ? CommonStyles.textBlue
                : CommonStyles.textBlack,
            ]}>
            {isPunchOutDisabled ? I18n.t('punchedOut') : I18n.t('punchOut')}
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
