import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import TasksComponent from './status/TaskComponent';
import {
  clearTasksState,
  fetchAllTasks,
  getAllPaginatedTasks,
  getUserPaginatedTasks,
  setNoMoreAllTaskRecords,
} from '../../redux/tasks/TaskActions';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {useLoginData} from '../../hooks/useLoginData';
import useTaskData from '../../hooks/useTaskData';

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

export default function TaskScreen({navigation, route}) {
  const source = route.params?.source || 'default';
  const flatListRef = useRef(null);

  const dispatch = useDispatch();
  const {userId, role} = useLoginData();
  const {
    tasksLoading,
    allPaginatedTasks,
    isLoadingAllPaginatedTasks,
    noMoreAllRecords,
    userPaginatedTasks,
    isLoadingUserPaginatedTasks,
  } = useTaskData();
  const [activeTab, setActiveTab] = useState(0);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getTasks(Constants.PAGE_SIZE, pageCount, 'All');

    return () => {
      dispatch(setNoMoreAllTaskRecords(false));
      dispatch(clearTasksState());

      dispatch(fetchAllTasks());
    };
  }, []);

  const getTasks = (pageSize, pageCount, status) => {
    if (role === 'Employee') {
      dispatch(
        getUserPaginatedTasks({
          userId,
          status,
          pageSize,
          pageCount,
        }),
      );
    } else {
      dispatch(
        getAllPaginatedTasks({
          status,
          pageSize,
          pageCount,
        }),
      );
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [dispatch]);

  const getAllTasks = () => {
    dispatch(fetchAllTasks());
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const handleTabLogic = index => {
    setActiveTab(index);

    setPageCount(1);
    dispatch(clearTasksState());
    dispatch(fetchAllTasks());

    const statusMap = ['All', 'Pending', 'Completed'];
    const status = statusMap[index];

    getTasks(Constants.PAGE_SIZE, 1, status);
  };

  const handleTabPress = index => {
    scrollToTop();

    setTimeout(() => {
      handleTabLogic(index);
    }, 300);
  };

  const toggleAddTaskModal = () => {
    setIsAddTaskModalVisible(!isAddTaskModalVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const loadMoreLeaves = () => {
    console.log('Loading more leaves');

    setPageCount(prevPageCount => {
      const newPageCount = prevPageCount + 1;

      const statusMap = ['All', 'Pending', 'Completed'];
      const status = statusMap[activeTab];
      if (
        !noMoreAllRecords &&
        !isLoadingAllPaginatedTasks &&
        !isLoadingUserPaginatedTasks &&
        !tasksLoading
      ) {
        getTasks(Constants.PAGE_SIZE, newPageCount, status);
      }

      return newPageCount;
    });
  };

  return (
    <CommonSafeAreaViewComponent>
      {(tasksLoading ||
        isLoadingAllPaginatedTasks ||
        isLoadingUserPaginatedTasks) && <LogoLoaderComponent />}
      <Header
        title={I18n.t('tasks')}
        onLeftIconPressed={source === 'drawer' ? handleDrawerOpen : goBack}
        leftIcon={
          <Ionicons
            name={source === 'drawer' ? 'menu' : 'arrow-back'}
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onRightIconPressed={toggleAddTaskModal}
        rightIcon={
          <MaterialIcons
            name="add-task"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />

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
              ref={flatListRef}
              style={CommonStyles.maxHeight}
              contentContainerStyle={[CommonStyles.infoStarting]}
              data={[activeTab]}
              renderItem={() => {
                const taskTypes = ['All', 'Pending', 'Completed'];
                const selectedTaskType = taskTypes[activeTab];

                return (
                  <TasksComponent
                    taskType={selectedTaskType}
                    data={
                      role === 'Employee'
                        ? userPaginatedTasks
                        : allPaginatedTasks
                    }
                    apiCall={() => handleTabPress(activeTab)}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => {
                if (
                  !noMoreAllRecords &&
                  !isLoadingAllPaginatedTasks &&
                  !isLoadingUserPaginatedTasks &&
                  !tasksLoading
                ) {
                  loadMoreLeaves();
                }
              }}
              onEndReachedThreshold={0.1}
            />
          </>
        }
      />
      <AddTaskModal
        isModalVisible={isAddTaskModalVisible}
        toggleModal={toggleAddTaskModal}
        apiCall={() => handleTabPress(0)}
      />
    </CommonSafeAreaViewComponent>
  );
}
