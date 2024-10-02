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
import {useSelector} from 'react-redux';
import I18n from '../../../../i18n/i18n';

export default function TaskDetailModal({
  isModalVisible,
  toggleModal,
  taskDetails = {},
}) {
  const currentLanguage = useSelector(state => state.language);
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    setTaskDescription(taskDetails?.description || '');
  }, [taskDetails?.description]);

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={I18n.t('taskDetails')}
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
            title={I18n.t('title')}
            value={taskDetails?.taskTitle}
            placeholder={I18n.t('enterTaskDetails')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('assignedBy')}
            value={taskDetails?.assignedBy}
            placeholder={I18n.t('enterAssignedBy')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <InputFieldComponent
            title={I18n.t('assignedTo')}
            value={taskDetails?.assignee}
            placeholder={I18n.t('enterAssignedTo')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={I18n.t('department')}
              value={taskDetails?.priority}
              placeholder={I18n.t('enterDepartment')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('taskCode')}
              value={taskDetails?.priority}
              placeholder={I18n.t('enterTaskCode')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={I18n.t('assignedDate')}
              value={taskDetails?.dateAssigned}
              placeholder={I18n.t('enterAssignedDate')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('dueDate')}
              value={taskDetails?.dueDate}
              placeholder={I18n.t('enterDueDate')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={I18n.t('storyPoints')}
              value={
                taskDetails?.storyPoint ? taskDetails.storyPoint.toString() : ''
              }
              placeholder={I18n.t('enterStoryPoints')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('estimatedJobs')}
              value={
                taskDetails?.storyPoint ? taskDetails.storyPoint.toString() : ''
              }
              placeholder={I18n.t('enterEstimatedJobs')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={I18n.t('priority')}
              value={taskDetails?.priority}
              placeholder={I18n.t('enterPriority')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('taskCategory')}
              value={taskDetails?.priority}
              placeholder={I18n.t('enterTaskCategory')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
          </View>

          <InputFieldComponent
            title={I18n.t('description')}
            value={taskDescription}
            onChangeText={text => setTaskDescription(text)}
            placeholder={I18n.t('enterDescription')}
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
