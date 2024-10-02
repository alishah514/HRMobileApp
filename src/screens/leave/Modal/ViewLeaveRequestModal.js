import {View, Text, Modal} from 'react-native';
import React from 'react';
import CommonSafeAreaScrollViewComponent from '../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import Header from '../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import CommonStyles from '../../../components/common/CommonStyles';
import {hp, wp} from '../../../components/common/Dimensions';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import InputFieldComponent from '../../../components/ReusableComponents/InputFieldComponent';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';

export default function ViewLeaveRequestModal({
  isModalVisible,
  toggleModal,
  leaveDetails = {},
}) {
  const currentLanguage = useSelector(state => state.language);

  const {type, fromDate, toDate, reason} = leaveDetails || {};

  const calculateLeaveDuration = (startDate, endDate) => {
    console.log('startDate', startDate, ' endDate', endDate);
    if (!startDate || !endDate) return 'N/A';

    const [startDay, startMonth, startYear] = startDate.split('-').map(Number);
    const [endDay, endMonth, endYear] = endDate.split('-').map(Number);

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'N/A';

    const timeDiff = end - start;

    if (timeDiff < 0) return 'N/A';

    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return `${dayDiff} day(s)`;
  };

  const leaveDuration = calculateLeaveDuration(fromDate, toDate);
  console.log(leaveDuration);

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={I18n.t('leaveDetails')}
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
          <InputFieldComponent
            title={I18n.t('leaveDuration')}
            value={leaveDuration}
            placeholder={I18n.t('enterLeaveDuration')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('leaveType')}
            value={type}
            placeholder={I18n.t('enterLeaveType')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('leaveReason')}
            value={reason}
            placeholder={I18n.t('enterLeaveReason')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
            multiline={true}
          />

          <CommonButton
            title={I18n.t('cancelRequest')}
            onPress={toggleModal}
            backgroundColor={Colors.redColor}
          />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
