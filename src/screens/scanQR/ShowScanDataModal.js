import React from 'react';
import {View, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/ReusableComponents/Header/Header';
import I18n from '../../i18n/i18n';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CommonSafeAreaScrollViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CommonStyles from '../../components/common/CommonStyles';
import InputFieldComponent from '../../components/ReusableComponents/InputFieldComponent';
import ProfileHeader from '../../components/ReusableComponents/Header/ProfileHeader';

export default function ShowScanDataModal({
  isModalVisible,
  toggleModal,
  scannedData,
}) {
  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <Header
        title={I18n.t('scannedData')}
        onLeftIconPressed={toggleModal}
        leftIcon={
          <Ionicons
            name="close"
            size={Constants.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
      />

      <CommonSafeAreaScrollViewComponent>
        <View style={CommonStyles.mainPadding}>
          <ProfileHeader
            image={scannedData?.profilePicture}
            editable={false}
            scan
          />
          <InputFieldComponent
            title={I18n.t('employeeId')}
            value={scannedData?.employeeId}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('employeeName')}
            value={scannedData?.name}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('email')}
            value={scannedData?.email}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('dateOfBirth')}
            value={scannedData?.birthDay}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('department')}
            value={scannedData?.department}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('designation')}
            value={scannedData?.designation}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />

          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={I18n.t('creationDate')}
              value={scannedData?.creationDate}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth
            />
            <InputFieldComponent
              title={I18n.t('expiryDate')}
              value={scannedData?.expiryDate}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth
            />
          </View>
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
