import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import ProfileHeader from '../../components/ReusableComponents/Header/ProfileHeader';
import ImagePickerComponent from '../../components/ReusableComponents/ImagePickerComponent';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import styles from './styles';
import LeaveRequestModal from './Modal/LeaveRequestModal';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import ViewLeaveRequestModal from './Modal/ViewLeaveRequestModal';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../i18n/i18n';
import StatusComponent from './types/StatusComponent';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {fetchUserLeaves} from '../../redux/leave/LeaveActions';
import {useLoginData} from '../../hooks/useLoginData';
import useLeaveData from '../../hooks/useLeaveData';

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

export default function LeaveScreen({navigation, route}) {
  const source = route.params?.source || 'default';
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.language.language);
  const {leaves, leavesLoading} = useLeaveData();
  const {userId} = useLoginData();
  const [activeTab, setActiveTab] = useState(0);
  const [image, setImage] = useState(null);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);
  const [isAddLeaveRequestVisible, setIsAddLeaveRequestVisible] =
    useState(false);
  const [isViewLeaveRequestVisible, setIsViewLeaveRequestVisible] =
    useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getLeaves();
  }, []);

  const getLeaves = () => {
    dispatch(
      fetchUserLeaves(userId, {
        limit: 25,
      }),
    );
  };

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

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <CommonSafeAreaViewComponent>
      {leavesLoading && <LogoLoaderComponent />}
      <Header
        title={I18n.t('leaves')}
        onLeftIconPressed={source === 'drawer' ? handleDrawerOpen : goBack}
        leftIcon={
          <Ionicons
            name={source === 'drawer' ? 'menu' : 'arrow-back'}
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onRightIconPressed={toggleLeaveRequestModal}
        rightIcon={
          <Ionicons
            name="add-outline"
            size={Constants.SIZE.largeIcon}
            color={Colors.whiteColor}
          />
        }
      />
      <CustomerBackgroundComponent
        topChild={
          <ProfileHeader
            image={image}
            toggleImageOptionsModal={toggleImageOptionsModal}
            name="Syed Ali Sultan Bukhari"
            role={I18n.t('mobileAppDeveloper')}
            editable={false}
          />
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
                    <StatusComponent
                      status="pending"
                      data={leaves.filter(leave => leave.status === 'pending')}
                      toggleViewLeaveRequestModal={toggleViewLeaveRequestModal}
                    />
                  ) : activeTab === 1 ? (
                    <StatusComponent
                      status="approved"
                      data={leaves.filter(leave => leave.status === 'approved')}
                      toggleViewLeaveRequestModal={toggleViewLeaveRequestModal}
                    />
                  ) : activeTab === 2 ? (
                    <StatusComponent
                      status="rejected"
                      data={leaves.filter(leave => leave.status === 'rejected')}
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
        folder={'leaves'}
      />
      <LeaveRequestModal
        isModalVisible={isAddLeaveRequestVisible}
        toggleModal={toggleLeaveRequestModal}
        apiCall={getLeaves}
      />
      <ViewLeaveRequestModal
        isModalVisible={isViewLeaveRequestVisible}
        toggleModal={toggleViewLeaveRequestModal}
        leaveDetails={details}
        apiCall={getLeaves}
      />
    </CommonSafeAreaViewComponent>
  );
}
