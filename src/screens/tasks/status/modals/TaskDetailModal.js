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
import {
  fetchAllTasks,
  patchTaskStatus,
} from '../../../../redux/tasks/TaskActions';
import useTaskData from '../../../../hooks/useTaskData';
import {useAccountsData} from '../../../../hooks/useAccountsData';
import {useLoginData} from '../../../../hooks/useLoginData';
import CustomSectionedMultiSelectComponent from '../../../../components/ReusableComponents/CustomSectionedMultiSelectComponent';
import CustomDatePickerComponent from '../../../../components/ReusableComponents/CustomDatePickerComponent';
import {TruncateTitle} from '../../../../components/utils/TruncateTitle';
import {extractId} from '../../../../components/utils/ExtractId';

export default function TaskDetailModal({
  isModalVisible,
  toggleModal,
  taskDetails = {},
}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const {userId} = useLoginData();

  const {allUsersData} = useAccountsData();
  const {tasksLoading} = useTaskData();
  const [assignedBy, setAssignedBy] = useState(null);
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

  useEffect(() => {
    setTaskTitle(taskDetails?.title || '');
    setTaskCode(taskDetails?.taskCode || '');
    setTaskCategory(taskDetails?.category || null);
    setTaskPriority(taskDetails?.priority || null);
    setTaskStatus(taskDetails?.status || null);
    setStoryPoints(taskDetails?.storypoints || 0);
    setDepartment(taskDetails?.department || null);
    setDescription(taskDetails?.description || null);
    setAssignedDate(taskDetails?.assignedDate || null);
    setDueDate(taskDetails?.dueDate || null);

    const assignedBy = allUsersData.find(
      user => user.id === taskDetails?.userId,
    );

    setAssignedBy(assignedBy);

    const assignedTo = allUsersData.find(
      user => user.id === taskDetails?.assignedTo,
    );

    setAssignedTo(assignedTo);
  }, [taskDetails, allUsersData]);

  const askForConfirmation = () => {
    const taskData = {
      title: taskTitle,
      category: taskCategory,
      department: department,
      priority: taskPriority,
      // estimatedJobs: taskDetails?.estimatedJobs,
      dueDate: dueDate,
      taskCode: taskCode,
      storypoints: storyPoints,
      assignedTo: assignedTo?.id,
      status: taskStatus,
      description: description,
      assignedDate: assignedDate,
      userId: assignedBy?.id,
    };

    const message = 'Are you sure you have update this task?';

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
    const taskId = taskDetails?.name ? extractId(taskDetails?.name) : null;

    const response = await dispatch(patchTaskStatus(taskId, taskData));

    if (response.success === true) {
      Alert.alert('Task Status Updated Successfully!');
      toggleModal();
      dispatch(fetchAllTasks());
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
      {tasksLoading && <LogoLoaderComponent />}
      <Header
        title={I18n.t('updateTask')}
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
          <Ionicons
            name="checkmark"
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
            placeholder={I18n.t('enterTaskTitle')}
            onChangeText={setTaskTitle}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
          />
          <View style={[CommonStyles.rowBetween]}>
            <InputFieldComponent
              title={I18n.t('assignedBy')}
              value={
                assignedBy?.id === userId
                  ? `${assignedBy?.name} - (You)`
                  : assignedBy?.name
              }
              placeholder={I18n.t('enterAssignedBy')}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              disabled
              halfWidth
            />
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
              halfWidth={true}
            />
          </View>
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
              selectedDate={formatDate(assignedDate)}
              setSelectedDate={setAssignedDate}
              label={I18n.t('assignedDate')}
              half
            />
            <CustomDatePickerComponent
              selectedDate={formatDate(dueDate)}
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

          <InputFieldComponent
            title={I18n.t('description')}
            value={description}
            onChangeText={text => setDescription(text)}
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
