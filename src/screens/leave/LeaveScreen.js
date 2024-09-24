import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import CommonStyles from '../../components/common/CommonStyles';
import ProfileHeader from '../../components/ReusableComponents/Header/ProfileHeader';
import ImagePickerComponent from '../../components/ReusableComponents/ImagePickerComponent';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import styles from './styles';
import Pending from './types/Pending';
import Approved from './types/Approved';
import Rejected from './types/Rejected';
import LeaveRequestModal from './Modal/LeaveRequestModal';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import {data} from './types/data';
import ViewLeaveRequestModal from './Modal/ViewLeaveRequestModal';

const tabs = [
  {
    id: 0,
    icon: 'calendar-outline',
    iconSet: Ionicons,
    color: Colors.yellowColor,
  },
  {
    id: 1,
    icon: 'calendar-outline',
    iconSet: Ionicons,
    color: Colors.greenColor,
  },
  {
    id: 2,
    icon: 'calendar-outline',
    iconSet: Ionicons,
    color: Colors.redColor,
  },
];

export default function LeaveScreen({navigation}) {
  const [activeTab, setActiveTab] = useState(0);
  const [image, setImage] = useState(null);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);
  const [isAddLeaveRequestVisible, setIsAddLeaveRequestVisible] =
    useState(false);
  const [isViewLeaveRequestVisible, setIsViewLeaveRequestVisible] =
    useState(false);
  const [details, setDetails] = useState(null);

  const toggleImageOptionsModal = () => {
    setIsImagePickerOptionsVisible(!isImagePickerOptionsVisible);
  };

  const toggleLeaveRequestModal = () => {
    setIsAddLeaveRequestVisible(!isAddLeaveRequestVisible);
  };

  const toggleViewLeaveRequestModal = item => {
    setIsViewLeaveRequestVisible(!isViewLeaveRequestVisible);
    setDetails({...item});
  };

  const handleTabPress = index => {
    setActiveTab(index);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <CommonSafeAreaViewComponent>
      <Header
        title="Leaves"
        onLeftIconPressed={goBack}
        leftIcon={
          <Ionicons
            name="arrow-back"
            size={Constants?.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onRightIconPressed={toggleLeaveRequestModal}
        rightIcon={
          <Ionicons
            name="add-outline"
            size={Constants?.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topChild={
          <>
            <ProfileHeader
              image={image}
              toggleImageOptionsModal={toggleImageOptionsModal}
              name="Syed Ali Sultan Bukhari"
              role="Mobile App Developer"
              editable={false}
            />
          </>
        }
        bottomChild={
          <>
            <TabBarHeader
              tabs={tabs}
              activeTab={activeTab}
              handleTabPress={handleTabPress}
            />
            <FlatList
              style={styles.maxHeight}
              contentContainerStyle={[styles.infoStarting]}
              data={[activeTab]}
              renderItem={() => (
                <View>
                  {activeTab === 0 ? (
                    <Pending
                      data={data}
                      toggleViewLeaveRequestModal={toggleViewLeaveRequestModal}
                    />
                  ) : activeTab === 1 ? (
                    <Approved
                      data={data}
                      toggleViewLeaveRequestModal={toggleViewLeaveRequestModal}
                    />
                  ) : activeTab === 2 ? (
                    <Rejected
                      data={data}
                      toggleViewLeaveRequestModal={toggleViewLeaveRequestModal}
                    />
                  ) : null}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        }
      />
      <ImagePickerComponent
        setImage={setImage}
        setIsImagePickerOptionsVisible={setIsImagePickerOptionsVisible}
        isImagePickerOptionsVisible={isImagePickerOptionsVisible}
        toggleImageOptionsModal={toggleImageOptionsModal}
      />
      <LeaveRequestModal
        isModalVisible={isAddLeaveRequestVisible}
        toggleModal={toggleLeaveRequestModal}
      />
      <ViewLeaveRequestModal
        isModalVisible={isViewLeaveRequestVisible}
        toggleModal={toggleViewLeaveRequestModal}
        leaveDetails={details}
      />
    </CommonSafeAreaViewComponent>
  );
}
