import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../common/CommonStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from '../common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../common/Constants';
import {useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';
import {formatDate} from '../utils/dateUtils';
import {TruncateTitle} from '../utils/TruncateTitle';

export default function DateFromToComponent({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  dateFromLabel,
  dateToLabel,
}) {
  const [isDateFromPickerVisible, setDateFromPickerVisible] = useState(false);
  const [isDateToPickerVisible, setDateToPickerVisible] = useState(false);

  const parseDate = date => {
    if (!date) return null;
    if (typeof date === 'number') return new Date(date);
    if (typeof date === 'string' && date.includes('-')) {
      const [day, month, year] = date.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  };

  const handleDateChange = (selectedDate, type) => {
    const selected = new Date(selectedDate);
    const fromDate = parseDate(dateFrom);
    const toDate = parseDate(dateTo);

    if (type === 'from' && toDate && selected > toDate) {
      Alert.alert(`${dateFromLabel} should be less than ${dateToLabel}`);
      return;
    }

    if (type === 'to' && fromDate && selected < fromDate) {
      Alert.alert(`${dateToLabel} should be greater than ${dateFromLabel}`);
      return;
    }

    if (type === 'from') {
      setDateFrom(selected.getTime());
      setDateFromPickerVisible(false);
    } else {
      setDateTo(selected.getTime());
      setDateToPickerVisible(false);
    }
  };

  const dateToText =
    dateTo ||
    (dateToLabel
      ? `${I18n.t('select')} ${TruncateTitle(dateToLabel, 10)}`
      : I18n.t('selectEndDate'));

  const dateFromText =
    dateFrom ||
    (dateFromLabel
      ? `${I18n.t('select')} ${TruncateTitle(dateFromLabel, 10)}`
      : I18n.t('selectStartDate'));

  return (
    <>
      <View style={[CommonStyles.rowBetween, CommonStyles.marginBottom5]}>
        <View>
          <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
            {dateFromLabel || I18n.t('startDate')}
          </Text>
          <TouchableOpacity
            onPress={() => setDateFromPickerVisible(true)}
            style={[
              CommonStyles.dateView,
              CommonStyles.rowBetween,
              CommonStyles.width40,
            ]}>
            <Text
              style={[
                CommonStyles.InputFieldDateHalf,
                {color: dateFrom ? Colors.blackColor : Colors.greyColor},
              ]}>
              {dateFromText}
            </Text>
            <Ionicons
              name="calendar-outline"
              size={Constants.SIZE.medIcon}
              color={Colors.greyColor}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
            {dateToLabel || I18n.t('endDate')}
          </Text>
          <TouchableOpacity
            onPress={() => setDateToPickerVisible(true)}
            style={[
              CommonStyles.dateView,
              CommonStyles.rowBetween,
              CommonStyles.width40,
            ]}>
            <Text
              style={[
                CommonStyles.InputFieldDateHalf,
                {color: dateTo ? Colors.blackColor : Colors.greyColor},
              ]}>
              {dateToText}
            </Text>
            <Ionicons
              name="calendar-outline"
              size={Constants.SIZE.medIcon}
              color={Colors.greyColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDateFromPickerVisible}
        mode="date"
        onConfirm={date => handleDateChange(date, 'from')}
        onCancel={() => setDateFromPickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isDateToPickerVisible}
        mode="date"
        onConfirm={date => handleDateChange(date, 'to')}
        onCancel={() => setDateToPickerVisible(false)}
      />
    </>
  );
}
