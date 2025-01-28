import {FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/ReusableComponents/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import ProfileHeader from '../../components/ReusableComponents/Header/ProfileHeader';
import ImagePickerComponent from '../../components/ReusableComponents/ImagePickerComponent';
import TabBarHeader from '../../components/ReusableComponents/Header/TabBarHeader';
import styles from './styles';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import {useDispatch} from 'react-redux';
import I18n from '../../i18n/i18n';
import StatusComponent from './types/StatusComponent';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {
  clearLeavesState,
  fetchAllLeaves,
  fetchUserLeaves,
  getAllPaginatedLeaves,
  getUserPaginatedLeaves,
  setNoMoreAllLeaveRecords,
} from '../../redux/leave/LeaveActions';
import {useLoginData} from '../../hooks/useLoginData';
import useLeaveData from '../../hooks/useLeaveData';
import LeaveRequestModal from './modals/LeaveRequestModal';
import ViewLeaveRequestModal from './modals/ViewLeaveRequestModal';

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
  const flatListRef = useRef(null);

  const dispatch = useDispatch();
  const {
    leavesLoading,
    allPaginatedLeaves,
    isLoadingAllPaginatedLeaves,
    isLoadingUserPaginatedLeaves,
    userPaginatedLeaves,
    noMoreAllRecords,
  } = useLeaveData();
  const {userId, role} = useLoginData();
  const [activeTab, setActiveTab] = useState(0);
  const [image, setImage] = useState(null);
  const [isImagePickerOptionsVisible, setIsImagePickerOptionsVisible] =
    useState(false);
  const [isAddLeaveRequestVisible, setIsAddLeaveRequestVisible] =
    useState(false);
  const [isViewLeaveRequestVisible, setIsViewLeaveRequestVisible] =
    useState(false);
  const [details, setDetails] = useState(null);
  const [pageSize] = useState(4);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getLeaves(pageSize, pageCount, 'pending');

    return () => {
      dispatch(setNoMoreAllLeaveRecords(false));
      dispatch(clearLeavesState());
      if (role === 'Employee') {
        dispatch(fetchUserLeaves(userId));
      } else {
        dispatch(fetchAllLeaves());
      }
    };
  }, []);

  const getLeaves = (pageSize, pageCount, status) => {
    if (role === 'Employee') {
      dispatch(
        getUserPaginatedLeaves({
          userId,
          status,
          pageSize,
          pageCount,
        }),
      );
    } else {
      dispatch(
        getAllPaginatedLeaves({
          status,
          pageSize,
          pageCount,
        }),
      );
    }
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

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const handleTabLogic = index => {
    setActiveTab(index);
    setPageCount(1);
    dispatch(clearLeavesState());

    const statusMap = ['pending', 'approved', 'rejected'];
    const status = statusMap[index];

    const pageSize = 4;
    const pageCount = 1;

    getLeaves(pageSize, pageCount, status);
  };

  const handleTabPress = index => {
    scrollToTop();

    setTimeout(() => {
      handleTabLogic(index);
    }, 300);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const loadMoreLeaves = () => {
    setPageCount(prevPageCount => {
      const newPageCount = prevPageCount + 1;

      const statusMap = ['pending', 'approved', 'rejected'];
      const status = statusMap[activeTab];

      getLeaves(pageSize, newPageCount, status);

      return newPageCount;
    });
  };

  return (
    <CommonSafeAreaViewComponent>
      {(leavesLoading ||
        isLoadingAllPaginatedLeaves ||
        isLoadingUserPaginatedLeaves) && <LogoLoaderComponent />}
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
          role === 'Employee' ? (
            <Ionicons
              name="add-outline"
              size={Constants.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          ) : null
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
              ref={flatListRef}
              style={styles.maxHeight}
              contentContainerStyle={[styles.infoStarting]}
              data={[activeTab]}
              renderItem={() => (
                <StatusComponent
                  status={
                    activeTab === 0
                      ? 'pending'
                      : activeTab === 1
                      ? 'approved'
                      : 'rejected'
                  }
                  data={
                    role === 'Employee'
                      ? userPaginatedLeaves
                      : allPaginatedLeaves
                  }
                  toggleViewLeaveRequestModal={toggleViewLeaveRequestModal}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={!noMoreAllRecords && loadMoreLeaves}
              onEndReachedThreshold={0.1}
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
