import {View, Modal, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../../components/common/Colors';
import Constants from '../../../../components/common/Constants';
import CommonStyles from '../../../../components/common/CommonStyles';
import InputFieldComponent from '../../../../components/ReusableComponents/InputFieldComponent';
import CommonSafeAreaScrollViewComponent from '../../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../../../i18n/i18n';
import {formatDate} from '../../../../components/utils/dateUtils';
import LogoLoaderComponent from '../../../../components/ReusableComponents/LogoLoaderComponent';
import {patchTaskStatus} from '../../../../redux/tasks/TaskActions';

export default function TaskDetailModal({
  isModalVisible,
  toggleModal,
  taskDetails = {},
  apiCall,
}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const isLoading = useSelector(state => state.tasks.isLoading);
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    setTaskDescription(taskDetails?.description || '');
  }, [taskDetails?.description]);

  const askForConfirmation = () => {
    const taskData = {
      title: taskDetails?.title,
      category: taskDetails?.category,
      completedTasks: taskDetails?.completedTasks,
      pendingTasks: taskDetails?.pendingTasks,
      department: taskDetails?.department,
      priority: taskDetails?.priority,
      department: taskDetails?.department,
      estimatedJobs: taskDetails?.estimatedJobs,
      dueDate: taskDetails?.dueDate,
      taskCode: taskDetails?.taskCode,
      storypoints: taskDetails?.storypoints,
      assignedTo: taskDetails?.assignedTo,
      status: 'Completed',
      description: taskDescription,
      assignedDate: taskDetails?.assignedDate,
      userId: taskDetails?.userId,
    };
    const message = 'Are you sure you have completed this task?';

    Alert.alert(
      'Task Completed?',
      message,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Action cancelled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => changeStatusRequest(taskData),
        },
      ],
      {cancelable: false},
    );
  };

  const changeStatusRequest = async taskData => {
    const taskId = taskDetails?.name
      ? taskDetails?.name.split('/').pop()
      : null;

    const response = await dispatch(patchTaskStatus(taskId, taskData));

    if (response.success === true) {
      Alert.alert('Task Status Updated Successfully!');
      toggleModal();
      apiCall();
    } else {
      console.error('Failed to post leave request:', response.error);
    }
  };

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
              size={Constants.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          }
          onRightIconPressed={askForConfirmation}
          rightIcon={
            taskDetails?.status !== 'Completed' && (
              <Ionicons
                name="checkmark"
                size={Constants.SIZE.largeIcon}
                color={Colors.whiteColor}
              />
            )
          }
        />
        {isLoading && <LogoLoaderComponent />}
        <View style={CommonStyles.mainPadding}>
          <InputFieldComponent
            title={I18n.t('title')}
            value={taskDetails?.title}
            placeholder={I18n.t('enterTaskTitle')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          {/* <InputFieldComponent
            title={I18n.t('assignedBy')}
            value={taskDetails?.assignedBy}
            placeholder={I18n.t('enterAssignedBy')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          /> */}
          <InputFieldComponent
            title={I18n.t('assignedTo')}
            value={
              Array.isArray(taskDetails?.assignedTo)
                ? taskDetails.assignedTo.join(', ')
                : taskDetails?.assignedTo
            }
            placeholder={I18n.t('enterAssignedTo')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            disabled={true}
          />
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={I18n.t('department')}
              value={taskDetails?.department}
              placeholder={I18n.t('enterDepartment')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('taskCode')}
              value={taskDetails?.taskCode}
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
              value={formatDate(taskDetails?.assignedDate)}
              placeholder={I18n.t('enterAssignedDate')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('dueDate')}
              value={formatDate(taskDetails?.dueDate)}
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
              value={taskDetails?.storypoints}
              placeholder={I18n.t('enterStoryPoints')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled={true}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('estimatedJobs')}
              value={taskDetails?.estimatedJobs}
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
              value={taskDetails?.category}
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
            // disabled={true}
          />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
