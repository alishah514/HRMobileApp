import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CommonStyles from '../common/CommonStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from '../common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../common/Constants';
import I18n from '../../i18n/i18n';
import {useSelector} from 'react-redux';

export default function CustomDatePickerComponent({
  selectedDate,
  setSelectedDate,
  label = I18n.t('select date'),
}) {
  const currentLanguage = useSelector(state => state.language);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleConfirmDate = date => {
    setSelectedDate(date.toDateString());
    setDatePickerVisible(false);
  };

  return (
    <>
      <View style={CommonStyles.marginBottom5}>
        <Text style={[CommonStyles.lessBold3P5, CommonStyles.textBlue]}>
          {label}
        </Text>
        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={[
            CommonStyles.dateView,
            CommonStyles.flexRow,
            CommonStyles.alignItemsCenter,
          ]}>
          <Text
            style={[
              CommonStyles.InputFieldDate,
              {
                color: selectedDate ? Colors.blackColor : Colors.greyColor,
              },
            ]}>
            {selectedDate || `${I18n.t('enter')} ${label}`}
          </Text>

          <Ionicons
            name="calendar-outline"
            size={Constants.SIZE.medIcon}
            color={Colors.greyColor}
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
      />
    </>
  );
}
