import {
  View,
  Text,
  FlatList,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import I18n from '../../i18n/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Constants from '../../components/common/Constants';
import {Colors} from '../../components/common/Colors';
import CustomerBackgroundComponent from '../../components/ReusableComponents/CustomerBackgroundComponent';
import CommonStyles from '../../components/common/CommonStyles';
import {wp} from '../../components/common/Dimensions';
import styles from './styles';
import useProfileData from '../../hooks/useProfileData';
import LogoLoaderComponent from '../../components/ReusableComponents/LogoLoaderComponent';
import {TruncateTitle} from '../../components/utils/TruncateTitle';
import {useSelector} from 'react-redux';
import ManageEmployeeModal from './modals/ManageEmployeeModal';

export default function AdminEmployeeScreen({navigation, route}) {
  const currentLanguage = useSelector(state => state.language.language);
  const status = route?.params?.status ?? null;
  const {allProfile, profileLoading} = useProfileData();
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] =
    useState(false);
  const [modalData, setModalData] = useState({screen: 'add', employee: null});

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };
  const handleBackIconPress = () => {
    navigation.goBack();
  };

  const toggleAddEmployeeModal = (
    screenType = 'add',
    currentEmployee = null,
  ) => {
    setModalData({
      screen: screenType,
      employee: currentEmployee,
    });
    setIsAddEmployeeModalVisible(!isAddEmployeeModalVisible);
  };

  const renderItem = ({item}) => {
    const userIdLast4 = item?.userId?.slice(-5);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleAddEmployeeModal('edit', item)}>
        {item?.personal?.imageUrl ? (
          <Image
            source={{uri: item?.personal?.imageUrl}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Ionicons
            name={'person'}
            size={Constants.SIZE.xLargeIcon}
            color={Colors.silverColor}
          />
        )}
        <Text style={styles.name}>
          {TruncateTitle(item?.personal?.fullName, 10)}
        </Text>
        <Text style={styles.id}>
          {userIdLast4 ? `****${userIdLast4}` : 'null'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <CommonSafeAreaViewComponent>
      {profileLoading && <LogoLoaderComponent />}
      <Header
        title={I18n.t('employees')}
        onRightIconPressed={() => toggleAddEmployeeModal('add')}
        rightIcon={
          <Octicons
            name="person-add"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onLeftIconPressed={
          status === null ? handleDrawerOpen : handleBackIconPress
        }
        leftIcon={
          status === null ? (
            <Ionicons
              name="menu"
              size={Constants.SIZE.medIcon}
              color={Colors.whiteColor}
            />
          ) : (
            <AntDesign
              name="arrowleft"
              size={Constants.SIZE.largeIcon}
              color={Colors.whiteColor}
            />
          )
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
                {I18n.t('allEmployees')}
              </Text>
            </View>
          </View>
        }
        bottomChild={
          <>
            <View style={CommonStyles.padding5}>
              <Text
                style={[
                  CommonStyles.bold6,
                  CommonStyles.textBlack,
                  CommonStyles.marginTop2,
                ]}>
                {I18n.t('employeeList')}
              </Text>

              <View style={CommonStyles.paddingTop5}>
                <FlatList
                  data={allProfile}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  columnWrapperStyle={CommonStyles.columnWrapper}
                  contentContainerStyle={[
                    {paddingBottom: Platform.OS === 'ios' ? wp(40) : wp(20)},
                  ]}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </>
        }
      />
      <ManageEmployeeModal
        isModalVisible={isAddEmployeeModalVisible}
        toggleModal={toggleAddEmployeeModal}
        screen={modalData.screen}
        data={modalData.employee}
      />
    </CommonSafeAreaViewComponent>
  );
}
