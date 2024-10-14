import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/ReusableComponents/Header/Header';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import CommonStyles from '../../components/common/CommonStyles';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import {data} from './data';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import AddTaskModal from './status/modals/AddTaskModal';
import I18n from '../../i18n/i18n';
import {useSelector} from 'react-redux';
import TasksComponent from './status/TaskComponent';

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
    color: Colors.greenColor,
  },
  {
    id: 2,
    icon: 'tasks',
    iconSet: FontAwesome5,
    color: Colors.redColor,
  },
];

export default function TaskScreen({navigation}) {
  const currentLanguage = useSelector(state => state.language.language);
  const [activeTab, setActiveTab] = useState(0);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);

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
                    <TasksComponent taskType="all" data={data} />
                  ) : activeTab === 1 ? (
                    <TasksComponent taskType="completed" data={data} />
                  ) : activeTab === 2 ? (
                    <TasksComponent taskType="pending" data={data} />
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
      />
    </CommonSafeAreaViewComponent>
  );
}
