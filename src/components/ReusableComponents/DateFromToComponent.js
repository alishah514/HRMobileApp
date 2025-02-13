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

export default function DateFromToComponent({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
}) {
  const currentLanguage = useSelector(state => state.language.language);
  const [isDateFromPickerVisible, setDateFromPickerVisible] = useState(false);
  const [isDateToPickerVisible, setDateToPickerVisible] = useState(false);

  const parseDate = dateString => {
    if (!dateString || !dateString.includes('-')) return null;
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDateChange = (selectedDate, type) => {
    const selected = new Date(selectedDate);
    const fromDate = parseDate(dateFrom);
    const toDate = parseDate(dateTo);

    if (type === 'from' && toDate && selected > toDate) {
      Alert.alert(I18n.t('startDateValidation'));
      return;
    }

    if (type === 'to' && fromDate && selected < fromDate) {
      Alert.alert(I18n.t('endDateValidation'));
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

  return (
    <>
      <View style={[CommonStyles.rowBetween, CommonStyles.marginBottom5]}>
        <View>
          <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
            {I18n.t('degreeStart')}
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
                {
                  color: dateFrom ? Colors.blackColor : Colors.greyColor,
                },
              ]}>
              {dateFrom || I18n.t('selectStartDate')}
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
            {I18n.t('degreeEnd')}
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
                {
                  color: dateTo ? Colors.blackColor : Colors.greyColor,
                },
              ]}>
              {dateTo || I18n.t('selectEndDate')}
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
