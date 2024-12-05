import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles';
import CommonStyles from '../../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import I18n from '../../../i18n/i18n';
import {CalculateTotalHours} from '../../../components/utils/CalculateTotalHoursComponent';
import {useSelector} from 'react-redux';
import {CalculateAttendanceStatus} from '../../../components/utils/CalculateAttendanceStatus';
import {useAttendanceData} from '../../../hooks/useAttendanceData';

export default function EmployeeHours({data}) {
  const {attendanceData} = useAttendanceData();
  const [attendanceSummary, setAttendanceSummary] = useState({
    onTime: 0,
    late: 0,
  });

  const [workHours, setWorkHours] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (data?.job?.punchInTime) {
      const {onTimeCount, lateCount} = CalculateAttendanceStatus(
        attendanceData,
        data?.job?.punchInTime,
      );

      setAttendanceSummary({
        onTime: onTimeCount,
        late: lateCount,
      });
    }
  }, [attendanceData, data]);

  useEffect(() => {
    const totalHours = CalculateTotalHours(attendanceData);
    setWorkHours(totalHours);
  }, [attendanceData]);

  return (
    <View style={[CommonStyles.width95, CommonStyles.flexRow]}>
      <View
        style={[
          styles.boxViewTime,
          CommonStyles.shadow,
          CommonStyles.marginHor1,
        ]}>
        <Ionicons
          name={'time-outline'}
          size={Constants.SIZE.xLargeIcon}
          color={Colors.blueColor}
        />
        <View style={CommonStyles.alignItemsCenter}>
          <Text style={[CommonStyles.bold5, CommonStyles.textBlack]}>
            {`${String(workHours?.hours).padStart(2, '0')}:${String(
              workHours?.minutes,
            ).padStart(2, '0')}:${String(workHours?.seconds).padStart(2, '0')}`}
          </Text>
          <Text style={[CommonStyles.lessBold4P, CommonStyles.textBlue]}>
            {I18n.t('totalHours')}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.boxViewTime,
          CommonStyles.shadow,
          CommonStyles.marginHor1,
        ]}>
        <Ionicons
          name={'checkmark-circle-outline'}
          size={Constants.SIZE.xLargeIcon}
          color={Colors.greenColor}
        />
        <View style={CommonStyles.alignItemsCenter}>
          <Text style={[CommonStyles.bold5, CommonStyles.textBlack]}>
            {attendanceSummary?.onTime}
          </Text>
          <Text style={[CommonStyles.lessBold4P, CommonStyles.textGreen]}>
            {I18n.t('onTime')}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.boxViewTime,
          CommonStyles.shadow,
          CommonStyles.marginHor1,
        ]}>
        <Ionicons
          name={'alert-circle-outline'}
          size={Constants.SIZE.xLargeIcon}
          color={Colors.redColor}
        />
        <View style={CommonStyles.alignItemsCenter}>
          <Text style={[CommonStyles.bold5, CommonStyles.textBlack]}>
            {attendanceSummary?.late}
          </Text>
          <Text style={[CommonStyles.lessBold4, CommonStyles.textRed]}>
            {I18n.t('late')}
          </Text>
        </View>
      </View>
    </View>
  );
}
