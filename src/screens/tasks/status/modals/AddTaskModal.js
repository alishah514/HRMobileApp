import {View, Modal, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {
  fetchAllTasks,
  postTaskRequest,
} from '../../../../redux/tasks/TaskActions';
import {convertToTimestamp} from '../../../../components/utils/dateUtils';
import LogoLoaderComponent from '../../../../components/ReusableComponents/LogoLoaderComponent';
import {useLoginData} from '../../../../hooks/useLoginData';
import useTaskData from '../../../../hooks/useTaskData';
import CustomDatePickerComponent from '../../../../components/ReusableComponents/CustomDatePickerComponent';
import {TruncateTitle} from '../../../../components/utils/TruncateTitle';
import {fetchAllUsers} from '../../../../redux/accounts/AccountActions';
import {useAccountsData} from '../../../../hooks/useAccountsData';

export default function AddTaskModal({isModalVisible, toggleModal}) {
  const dispatch = useDispatch();
  const {allUsersData} = useAccountsData();
  const {tasksLoading} = useTaskData();
  const {userId} = useLoginData();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCode, setTaskCode] = useState('');
  const [taskCategory, setTaskCategory] = useState(null);
  const [taskPriority, setTaskPriority] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  // const [estimatedJobs, setEstimatedJobs] = useState(0);
  const [storyPoints, setStoryPoints] = useState(0);
  const [department, setDepartment] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [description, setDescription] = useState(null);
  const [assignedDate, setAssignedDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const taskPriorityOptions = ['Low', 'Medium', 'High'];
  const taskStatusOptions = ['Pending', 'Completed'];
  const taskCategoryOptions = [
    'IT',
    'ICD',
    'Sales',
    'Stock',
    'Accounts',
    'Inspection',
    'Custom',
    'Rikso',
  ];
  const taskDepartmentOptions = [
    'CodeDecode',
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
      department: department,
      priority: taskPriority,
      department: department,
      // estimatedJobs: estimatedJobs,
      dueDate: convertToTimestamp(dueDate),
      taskCode: taskCode,
      storypoints: 16,
      assignedTo: assignedTo?.id,
      status: taskStatus,
      description: description,
      assignedDate: convertToTimestamp(assignedDate || getTodayDate()),
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
      dispatch(fetchAllTasks());
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
      // estimatedJobs > 0 &&
      department !== null &&
      assignedTo !== null &&
      description !== null &&
      dueDate !== null &&
      assignedDate !== null &&
      storyPoints !== null
    );
  };

  const clearStates = () => {
    setTaskTitle('');
    setTaskCode('');
    setTaskCategory(null);
    setTaskPriority(null);
    setTaskStatus(null);
    // setEstimatedJobs(0);
    setStoryPoints(0);
    setDepartment(null);
    setAssignedTo(null);
    setDescription(null);
    setAssignedDate(null);
    setDueDate(null);
  };

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      {tasksLoading && <LogoLoaderComponent />}

      <Header
        title={I18n.t('addTask')}
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
            <CustomDatePickerComponent
              selectedDate={assignedDate}
              setSelectedDate={setAssignedDate}
              label={I18n.t('assignedDate')}
              half
            />
            <CustomDatePickerComponent
              selectedDate={dueDate}
              setSelectedDate={setDueDate}
              label={I18n.t('dueDate')}
              half
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
          {/* <InputFieldComponent
            title={I18n.t('estimatedJobs')}
            value={estimatedJobs}
            onChangeText={text => setEstimatedJobs(text)}
            placeholder={TruncateTitle(I18n.t('enterEstimatedJobs'), 30)}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
          /> */}
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={I18n.t('storyPoints')}
              numeric={true}
              value={storyPoints}
              onChangeText={text => setStoryPoints(text)}
              placeholder={TruncateTitle(I18n.t('enterStoryPoints'), 16)}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              halfWidth={true}
            />
            <InputFieldComponent
              title={I18n.t('taskCode')}
              value={taskCode}
              onChangeText={text => setTaskCode(text)}
              placeholder={TruncateTitle(I18n.t('enterTaskCode'), 16)}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              halfWidth={true}
            />
          </View>

          <CustomSectionedMultiSelectComponent
            title={I18n.t('assignedTo')}
            selectedValue={
              assignedTo
                ? `${assignedTo.name}${
                    assignedTo.id === userId ? ' - (You)' : ''
                  }`
                : null
            }
            setSelectedValue={selected => {
              const selectedUser = allUsersData.find(user => {
                const userName =
                  user.id === userId ? `${user.name} - (You)` : user.name;
                return userName === selected;
              });

              setAssignedTo(selectedUser || null);
            }}
            options={allUsersData.map(user =>
              user.id === userId ? `${user.name} - (You)` : `${user.name}`,
            )}
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
