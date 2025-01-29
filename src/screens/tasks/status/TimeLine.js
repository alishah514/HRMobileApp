import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../components/common/CommonStyles';
import {Colors} from '../../../components/common/Colors';
import styles from './styles';
import Constants from '../../../components/common/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TaskDetailModal from './modals/TaskDetailModal';
import {wp} from '../../../components/common/Dimensions';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import useTaskData from '../../../hooks/useTaskData';
import {useLoginData} from '../../../hooks/useLoginData';

export default function TimeLine({data, status, apiCall}) {
  const {allTasks} = useTaskData();
  const {userId, role} = useLoginData();
  const [isTaskDetailModal, setIsTaskDetailModal] = useState(null);
  const [details, setDetails] = useState(null);
  const [userTasks, setUserTasks] = useState({pending: 0, completed: 0});

  useEffect(() => {
    if (role === 'Employee') {
      const employeeTasks = allTasks.filter(
        task => task.assignedTo === userId || task.userId === userId,
      );

      const pendingTasks = employeeTasks.filter(
        task => task.status === 'Pending',
      ).length;
      const completedTasks = employeeTasks.filter(
        task => task.status === 'Completed',
      ).length;

      setUserTasks({pending: pendingTasks, completed: completedTasks});
    }
  }, [allTasks]);

  const sortedData = [...data].sort((a, b) => {
    if (a.status === 'Pending' && b.status === 'Completed') {
      return -1;
    } else if (a.status === 'Completed' && b.status === 'Pending') {
      return 1;
    }

    const aCreateTime = new Date(a.createTime);
    const bCreateTime = new Date(b.createTime);

    return bCreateTime - aCreateTime;
  });

  const toggleTaskDetailModal = item => {
    setIsTaskDetailModal(!isTaskDetailModal);
    setDetails({...item});
  };

  const pendingTasks = allTasks?.filter(task => task.status === 'Pending');
  const completedTasks = allTasks?.filter(task => task.status === 'Completed');

  const TaskItem = ({item}) => (
    <TouchableOpacity
      onPress={() => toggleTaskDetailModal(item)}
      style={styles.taskContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome
          name={item?.status === 'Pending' ? 'check-circle-o' : 'check-circle'}
          size={Constants.SIZE.xLargeIcon}
          color={Colors.greenColor}
        />
      </View>
      <Text
        style={[
          CommonStyles.font4,
          CommonStyles.lessBold300,
          CommonStyles.textBlack,
          CommonStyles.container,
        ]}>
        {item?.title}
      </Text>
      <View style={styles.userIcon}>
        <Text style={CommonStyles.textBlack}>
          {item?.status === 'Pending' ? 'P' : 'C'}
        </Text>
      </View>
      <View>
        <MaterialIcons
          name="chevron-right"
          size={Constants.SIZE.medIcon}
          color={Colors.yellowColor}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.verticalLineContainer,
            {width: status === 1 && wp('4')},
          ]}>
          {status === 1 && (
            <>
              <View style={styles.verticalLine} />
              <View style={[styles.dot, {backgroundColor: 'blue', top: 26}]} />
              <View
                style={[styles.dot, {backgroundColor: 'orange', top: 132}]}
              />
            </>
          )}
        </View>

        <View
          style={[
            styles.contentContainer,
            {paddingLeft: status === 1 && wp(2)},
          ]}>
          {status === 1 && (
            <View>
              <Text
                style={[
                  CommonStyles.font4P,
                  CommonStyles.lessBold300,
                  CommonStyles.textBlack,
                  CommonStyles.paddingLeft5,
                ]}>
                {I18n.t('report')}
              </Text>
              <View
                style={[
                  CommonStyles.rowBetween,
                  CommonStyles.paddingVertical5,
                ]}>
                <View style={styles.statusItem}>
                  <View style={styles.statusDot} />
                  <Text
                    style={[
                      CommonStyles.font4,
                      CommonStyles.lessBold300,
                      CommonStyles.textBlack,
                      CommonStyles.paddingLeft1,
                    ]}>
                    {role === 'Admin'
                      ? pendingTasks?.length
                      : userTasks?.pending}{' '}
                    {role === 'Admin'
                      ? pendingTasks?.length === 1
                        ? I18n.t('pendingTask')
                        : I18n.t('pendingTasks')
                      : userTasks?.pending === 1
                      ? I18n.t('pendingTask')
                      : I18n.t('pendingTasks')}
                  </Text>
                </View>
                <View style={styles.statusItem}>
                  <View
                    style={[
                      styles.statusDot,
                      {backgroundColor: Colors.greenColor},
                    ]}
                  />
                  <Text
                    style={[
                      CommonStyles.font4,
                      CommonStyles.lessBold300,
                      CommonStyles.textBlack,
                      CommonStyles.paddingLeft1,
                    ]}>
                    {role === 'Admin'
                      ? completedTasks?.length
                      : userTasks?.completed}{' '}
                    {role === 'Admin'
                      ? completedTasks?.length === 1
                        ? I18n.t('completedTask')
                        : I18n.t('completedTasks')
                      : userTasks?.completed === 1
                      ? I18n.t('completedTask')
                      : I18n.t('completedTasks')}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={status === 1 && CommonStyles.paddingTop5}>
            {status === 1 && (
              <Text
                style={[
                  CommonStyles.font4P,
                  CommonStyles.lessBold300,
                  CommonStyles.textBlack,
                  CommonStyles.paddingLeft5,
                ]}>
                {I18n.t('summary')}
              </Text>
            )}

            <FlatList
              data={sortedData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <TaskItem item={item} />}
            />
          </View>
        </View>
      </View>
      <TaskDetailModal
        isModalVisible={isTaskDetailModal}
        toggleModal={toggleTaskDetailModal}
        taskDetails={details}
        apiCall={apiCall}
      />
    </>
  );
}
