import {View, Modal} from 'react-native';
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

export default function AddTaskModal({isModalVisible, toggleModal}) {
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
  const taskStatusOptions = ['Pending', 'In Progress', 'Completed'];
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

  return (
    <Modal
      transparent={false}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <CommonSafeAreaScrollViewComponent>
        <Header
          title={'Add Task'}
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
            value={taskTitle}
            onChangeText={text => setTaskTitle(text)}
            placeholder={'Enter Task Title'}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
          />
          <View style={CommonStyles.rowBetween}>
            <CustomSectionedMultiSelectComponent
              title={'Task Status'}
              selectedValue={taskStatus}
              setSelectedValue={setTaskStatus}
              options={taskStatusOptions}
              halfWidth={true}
            />

            <CustomSectionedMultiSelectComponent
              title={'Task Category'}
              selectedValue={taskCategory}
              setSelectedValue={setTaskCategory}
              options={taskCategoryOptions}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <CustomSectionedMultiSelectComponent
              title={'Priority'}
              selectedValue={taskPriority}
              setSelectedValue={setTaskPriority}
              options={taskPriorityOptions}
              halfWidth={true}
            />
            <CustomSectionedMultiSelectComponent
              title={'Department'}
              selectedValue={department}
              setSelectedValue={setDepartment}
              options={taskDepartmentOptions}
              halfWidth={true}
            />
          </View>
          <View style={CommonStyles.rowBetween}>
            <InputFieldComponent
              title={'Estimated Jobs'}
              value={estimatedJobs}
              onChangeText={text => setEstimatedJobs(text)}
              placeholder={'Enter Estimated Jobs'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              halfWidth={true}
            />
            <InputFieldComponent
              title={'Task Code'}
              value={taskCode}
              onChangeText={text => setTaskCode(text)}
              placeholder={'Enter Task Code'}
              placeholderColor={Colors.placeholderColorDark}
              borderColor={Colors.greyColor}
              textColor={Colors.blackColor}
              halfWidth={true}
            />
          </View>

          <CustomSectionedMultiSelectComponent
            title={'Assigned To'}
            selectedValue={assignedTo}
            setSelectedValue={setAssignedTo}
            options={taskAssigneeOptions}
            multiple={true}
          />
          <InputFieldComponent
            title={'Description'}
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder={'Enter Task Description'}
            placeholderColor={Colors.placeholderColorDark}
            borderColor={Colors.greyColor}
            textColor={Colors.blackColor}
            multiline={true}
          />
          <CommonButton title={'Add Task'} onPress={toggleModal} />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
