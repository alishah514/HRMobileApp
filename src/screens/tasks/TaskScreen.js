import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/ReusableComponents/Header/Header';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import CommonStyles from '../../components/common/CommonStyles';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';

import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import AddTaskModal from './status/modals/AddTaskModal';
import I18n from '../../i18n/i18n';
import {useDispatch, useSelector} from 'react-redux';
import TasksComponent from './status/TaskComponent';
import {fetchUserTasks} from '../../redux/tasks/TaskActions';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';

const tabs = [
  {
    id: 0,
    icon: 'tasks',
    iconSet: FontAwesome5,
    color: Colors.yellowColor,
  },
  {
    id: 1,
    icon: 'tasks',
    iconSet: FontAwesome5,
    color: Colors.redColor,
  },
  {
    id: 2,
    icon: 'tasks',
    iconSet: FontAwesome5,
    color: Colors.greenColor,
  },
];

export default function TaskScreen({navigation}) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const userId = useSelector(state => state.login.userId);
  const tasks = useSelector(state => state.tasks.data);
  const isLoading = useSelector(state => state.tasks.isLoading);
  const [activeTab, setActiveTab] = useState(0);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);

  // useEffect(() => {
  //   getTasks();
  //   return () => {
  //     dispatch(clearTasksState());
  //   };
  // }, [dispatch]);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    dispatch(
      fetchUserTasks(userId, {
        limit: 25,
      }),
    );
  };

  const handleTabPress = index => {
    setActiveTab(index);
  };

  const toggleAddTaskModal = item => {
    setIsAddTaskModalVisible(!isAddTaskModalVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title={I18n.t('tasks')}
        onLeftIconPressed={goBack}
        leftIcon={
          <Ionicons
            name="arrow-back"
            size={Constants?.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onRightIconPressed={toggleAddTaskModal}
        rightIcon={
          <MaterialIcons
            name="add-task"
            size={Constants?.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />
      {isLoading && <LogoLoaderComponent />}
      <CustomerBackgroundComponent
        topVerySmall
        topChild={
          <View
            style={[
              CommonStyles.rowBetween,
              CommonStyles.width90,
              CommonStyles.alignItemsCenter,
              CommonStyles.paddingBottom7,
            ]}>
            <View>
              <Text style={[CommonStyles.lessBold5P, CommonStyles.textWhite]}>
                {I18n.t('taskList')}
              </Text>
            </View>
          </View>
        }
        bottomChild={
          <>
            <TabBarHeader
              tabs={tabs}
              activeTab={activeTab}
              handleTabPress={handleTabPress}
            />
            <FlatList
              style={CommonStyles.maxHeight}
              contentContainerStyle={[CommonStyles.infoStarting]}
              data={[activeTab]}
              renderItem={() => (
                <View>
                  {activeTab === 0 ? (
                    <TasksComponent
                      taskType="all"
                      data={tasks}
                      apiCall={getTasks}
                    />
                  ) : activeTab === 1 ? (
                    <TasksComponent
                      taskType="Pending"
                      data={tasks.filter(tasks => tasks.status === 'Pending')}
                      apiCall={getTasks}
                    />
                  ) : activeTab === 2 ? (
                    <TasksComponent
                      taskType="Completed"
                      data={tasks.filter(tasks => tasks.status === 'Completed')}
                      apiCall={getTasks}
                    />
                  ) : null}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        }
      />
      <AddTaskModal
        isModalVisible={isAddTaskModalVisible}
        toggleModal={toggleAddTaskModal}
        apiCall={getTasks}
      />
    </CommonSafeAreaViewComponent>
  );
}
