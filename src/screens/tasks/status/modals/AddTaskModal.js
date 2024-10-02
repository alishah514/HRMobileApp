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
import {useSelector} from 'react-redux';
import I18n from '../../../../i18n/i18n';

export default function AddTaskModal({isModalVisible, toggleModal}) {
  const currentLanguage = useSelector(state => state.language);
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
          <CommonButton title={I18n.t('addTask')} onPress={toggleModal} />
        </View>
      </CommonSafeAreaScrollViewComponent>
    </Modal>
  );
}
