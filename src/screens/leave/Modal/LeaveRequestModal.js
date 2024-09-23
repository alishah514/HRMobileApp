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

export default function LeaveRequestModal({isModalVisible, toggleModal}) {
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
          title={'Leave Request'}
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
            label="Leave From"
          />
          <CustomDatePickerComponent
            selectedDate={leaveTo}
            setSelectedDate={setLeaveTo}
            label="Leave To"
          />
          <CustomPickerComponent
            title={'Leave Type'}
            selectedValue={leaveType}
            setSelectedValue={setLeaveType}
            options={leaveTypeOptions}
          />
          <InputFieldComponent
            title={'Reason'}
            value={leaveReason}
            placeholder={'Enter Leave Reason'}
            placeholderColor={Colors.placeholderColorDark}
            onChangeText={text => setLeaveReason(text)}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            multiline={true}
          />
          <CommonButton title={'SEND LEAVE REQUEST'} onPress={toggleModal} />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
