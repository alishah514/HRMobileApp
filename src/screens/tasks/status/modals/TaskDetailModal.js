import {View, Text, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonSafeAreaViewComponent from '../../../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../../components/common/Colors';
import Constants from '../../../../components/common/Constants';
import CommonStyles from '../../../../components/common/CommonStyles';
import InputFieldComponent from '../../../../components/ReusableComponents/InputFieldComponent';
import CommonSafeAreaScrollViewComponent from '../../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';

export default function TaskDetailModal({
  isModalVisible,
  toggleModal,
  taskDetails = {},
}) {
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    setTaskDescription(taskDetails?.description || ''); // Use empty string as fallback
  }, [taskDetails?.description]);

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={'Task Details'}
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
            title={'Title'}
            value={taskDetails?.taskTitle}
            placeholder={'Task Title'}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={'Assigned By'}
            value={taskDetails?.assignedBy}
            placeholder={'Assigned By'}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={'Assigned To'}
            value={taskDetails?.assignee}
            placeholder={'Assigned To'}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={'Department'}
              value={taskDetails?.priority}
              placeholder={'Department'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={'Task Code'}
              value={taskDetails?.priority}
              placeholder={'Task Code'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={'Assigned Date'}
              value={taskDetails?.dateAssigned}
              placeholder={'Assigned Date'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={'Due Date'}
              value={taskDetails?.dueDate}
              placeholder={'Due Date'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={'Story Points'}
              value={
                taskDetails?.storyPoint ? taskDetails.storyPoint.toString() : ''
              }
              placeholder={'Story Points'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={'Estimated Jobs'}
              value={
                taskDetails?.storyPoint ? taskDetails.storyPoint.toString() : ''
              }
              placeholder={'Estimated Jobs'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={'Priority'}
              value={taskDetails?.priority}
              placeholder={'Priority'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={'Task Category'}
              value={taskDetails?.priority}
              placeholder={'Task Category'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
          </View>

          <InputFieldComponent
            title={'Description'}
            value={taskDescription}
            onChangeText={text => setTaskDescription(text)}
            placeholder={'Enter Description'}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            multiline={true}
          />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
