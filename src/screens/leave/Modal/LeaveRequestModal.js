import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import Header from '../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import CommonStyles from '../../../components/common/CommonStyles';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import CustomDatePickerComponent from '../../../components/ReusableComponents/CustomDatePickerComponent';
import CustomPickerComponent from '../../../components/ReusableComponents/CustomPickerComponent';
import {hp, wp} from '../../../components/common/Dimensions';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import CustomSectionedMultiSelectComponent from '../../../components/ReusableComponents/CustomSectionedMultiSelectComponent';

export default function LeaveRequestModal({isModalVisible, toggleModal}) {
  const currentLanguage = useSelector(state => state.language);

  const [leaveType, setLeaveType] = useState(null);
  const [leaveFrom, setLeaveFrom] = useState(null);
  const [leaveTo, setLeaveTo] = useState(null);
  const [leaveReason, setLeaveReason] = useState('');
  const leaveTypeOptions = ['Casual Leave', 'Plan Leave', 'Sick Leave'];

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={I18n.t('leaveRequest')}
          onLeftIconPressed={toggleModal}
          leftIcon={
            <Ionicons
              name="close"
              size={Constants?.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          }
        />

        <View style={CommonStyles.mainPadding}>
          <CustomDatePickerComponent
            selectedDate={leaveFrom}
            setSelectedDate={setLeaveFrom}
            label={I18n.t('leaveFrom')}
          />
          <CustomDatePickerComponent
            selectedDate={leaveTo}
            setSelectedDate={setLeaveTo}
            label={I18n.t('leaveTo')}
          />

          <CustomSectionedMultiSelectComponent
            title={I18n.t('leaveType')}
            selectedValue={leaveType}
            setSelectedValue={setLeaveType}
            options={leaveTypeOptions}
          />
          <InputFieldComponent
            title={I18n.t('reason')}
            value={leaveReason}
            placeholder={I18n.t('enterLeaveReason')}
            placeholderColor={Colors.placeholderColorDark}
            onChangeText={text => setLeaveReason(text)}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            multiline={true}
          />
          <CommonButton
            title={I18n.t('sendLeaveRequest')}
            onPress={toggleModal}
          />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
