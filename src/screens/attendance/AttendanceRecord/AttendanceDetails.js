import {SafeAreaView} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {useRoute} from '@react-navigation/native';
import Header from '../../../components/ReusableComponents/Header/Header';
import I18n from '../../../i18n/i18n';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AttendanceMap from './AttendanceMap';

export default function AttendanceDetails({navigation}) {
  const route = useRoute();

  const {punchOutData, latitude, longitude} = route.params;

  const punchInLocation = {
    latitude: latitude,
    longitude: longitude,
  };

  const punchOutLocation = {
    latitude: punchOutData?.latitude,
    longitude: punchOutData?.longitude,
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Header
        title={I18n.t('attendanceDetails')}
        onLeftIconPressed={goBack}
        leftIcon={
          <Ionicons
            name="arrow-back"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />

      <AttendanceMap
        punchInLocation={punchInLocation}
        punchOutLocation={punchOutLocation}
        data={route?.params}
      />
    </SafeAreaView>
  );
}
