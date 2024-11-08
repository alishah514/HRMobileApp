import {View, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../../components/common/Colors';
import Constants from '../../../../components/common/Constants';
import CommonStyles from '../../../../components/common/CommonStyles';
import InputFieldComponent from '../../../../components/ReusableComponents/InputFieldComponent';
import CommonSafeAreaScrollViewComponent from '../../../../components/ReusableComponents/CommonComponents/CommonSafeAreaScrollViewComponent';
import CustomSectionedMultiSelectComponent from '../../../../components/ReusableComponents/CustomSectionedMultiSelectComponent';
import CommonButton from '../../../../components/ReusableComponents/CommonComponents/CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../../../i18n/i18n';
import {postTaskRequest} from '../../../../redux/tasks/TaskActions';
import {CalculatePeriod} from '../../../../components/utils/CalculatePeriod';
import {convertToTimestamp} from '../../../../components/utils/dateUtils';
import LogoLoaderComponent from '../../../../components/ReusableComponents/LogoLoaderComponent';

export default function AddTaskModal({isModalVisible, toggleModal, apiCall}) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.tasks.isLoading);
  const userId = useSelector(state => state.login.userId);
  const currentLanguage = useSelector(state => state.language.language);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCode, setTaskCode] = useState('');
  const [taskCategory, setTaskCategory] = useState(null);
  const [taskPriority, setTaskPriority] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [estimatedJobs, setEstimatedJobs] = useState(0);
  const [department, setDepartment] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [description, setDescription] = useState(null);
  const taskPriorityOptions = ['Low', 'Medium', 'High'];
  const taskStatusOptions = ['Pending', 'Completed'];
  const taskCategoryOptions = [
    'ICD',
    'Sales',
    'Stock',
    'Accounts',
    'Inspection',
    'Custom',
    'Rikso',
  ];
  const taskDepartmentOptions = [
    'Operations',
    'Sales',
    'Marketing',
    'Accounting',
    'Transportation',
    'Yard Management',
    'Custom',
  ];
  const taskAssigneeOptions = [
    'Operations',
    'Sales',
    'Marketing',
    'Accounting',
    'Transportation',
    'Yard Management',
    'Custom',
  ];

  function getTodayDate() {
    const today = new Date();
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return today.toLocaleDateString('en-US', options).replace(/,/g, '');
  }

  const askForConfirmation = () => {
    const taskData = {
      title: taskTitle,
      category: taskCategory,
      completedTasks: 7,
      pendingTasks: 3,
      department: department,
      priority: taskPriority,
      department: department,
      estimatedJobs: estimatedJobs,
      dueDate: convertToTimestamp('Fri Oct 18 2024'),
      taskCode: taskCode,
      storypoints: 16,
      assignedTo: assignedTo,
      status: taskStatus,
      description: description,
      assignedDate: convertToTimestamp(getTodayDate()),
      userId: userId,
    };
    const message = 'Are you sure you want to add this task request?';

    Alert.alert(
      'Confirm Action',
      message,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Action cancelled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => submitTaskRequest(taskData),
        },
      ],
      {cancelable: false},
    );
  };

  const submitTaskRequest = async taskData => {
    const response = await dispatch(postTaskRequest(taskData));

    if (response.success) {
      Alert.alert('Task added successfully! ');
      clearStates();
      toggleModal();
      apiCall();
    } else {
      console.error('Failed to post task request:', response.error);
    }
  };

  const isFormValid = () => {
    return (
      taskTitle !== '' &&
      taskCode !== '' &&
      taskCategory !== null &&
      taskPriority !== null &&
      taskStatus !== null &&
      estimatedJobs > 0 &&
      department !== null &&
      assignedTo !== null &&
      description !== null
    );
  };

  const clearStates = () => {
    setTaskTitle('');
    setTaskCode('');
    setTaskCategory(null);
    setTaskPriority(null);
    setTaskStatus(null);
    setEstimatedJobs(0);
    setDepartment(null);
    setAssignedTo(null);
    setDescription(null);
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={I18n.t('addTask')}
          onLeftIconPressed={toggleModal}
          leftIcon={
            <Ionicons
              name="close"
              size={Constants?.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          }
        />
        {isLoading && <LogoLoaderComponent />}
        <View style={CommonStyles.mainPadding}>
          <InputFieldComponent
            title={I18n.t('title')}
            value={taskTitle}
            onChangeText={text => setTaskTitle(text)}
            placeholder={I18n.t('enterTaskTitle')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
          />
          <View style={CommonStyles.rowBetween}>
            <CustomSectionedMultiSelectComponent
              title={I18n.t('taskStatus')}
              selectedValue={taskStatus}
              setSelectedValue={setTaskStatus}
              options={taskStatusOptions}
              halfWidth={true}
            />
            <CustomSectionedMultiSelectComponent
              title={I18n.t('taskCategory')}
              selectedValue={taskCategory}
              setSelectedValue={setTaskCategory}
              options={taskCategoryOptions}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <CustomSectionedMultiSelectComponent
              title={I18n.t('priority')}
              selectedValue={taskPriority}
              setSelectedValue={setTaskPriority}
              options={taskPriorityOptions}
              halfWidth={true}
            />
            <CustomSectionedMultiSelectComponent
              title={I18n.t('department')}
              selectedValue={department}
              setSelectedValue={setDepartment}
              options={taskDepartmentOptions}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={I18n.t('estimatedJobs')}
              value={estimatedJobs}
              onChangeText={text => setEstimatedJobs(text)}
              placeholder={I18n.t('enterEstimatedJobs')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('taskCode')}
              value={taskCode}
              onChangeText={text => setTaskCode(text)}
              placeholder={I18n.t('enterTaskCode')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              halfWidth={true}
            />
          </View>

          <CustomSectionedMultiSelectComponent
            title={I18n.t('assignedTo')}
            selectedValue={assignedTo}
            setSelectedValue={setAssignedTo}
            options={taskAssigneeOptions}
            multiple={true}
          />
          <InputFieldComponent
            title={I18n.t('description')}
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder={I18n.t('enterTaskDescription')}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            multiline={true}
          />
          <CommonButton
            title={I18n.t('addTask')}
            onPress={askForConfirmation}
            disabled={!isFormValid()}
          />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
