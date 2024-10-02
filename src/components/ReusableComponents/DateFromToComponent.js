import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../common/CommonStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from '../common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../common/Constants';
import {useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';

export default function DateFromToComponent({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
}) {
  const currentLanguage = useSelector(state => state.language);
  const [isDateFromPickerVisible, setDateFromPickerVisible] = useState(false);
  const [isDateToPickerVisible, setDateToPickerVisible] = useState(false);

  const handleConfirmDateFrom = date => {
    setDateFrom(date.toDateString());
    setDateFromPickerVisible(false);
  };

  const handleConfirmDateTo = date => {
    setDateTo(date.toDateString());
    setDateToPickerVisible(false);
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
        onConfirm={handleConfirmDateFrom}
        onCancel={() => setDateFromPickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isDateToPickerVisible}
        mode="date"
        onConfirm={handleConfirmDateTo}
        onCancel={() => setDateToPickerVisible(false)}
      />
    </>
  );
}
