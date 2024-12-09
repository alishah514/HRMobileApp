import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import I18n from '../../i18n/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

export default function AdminEmployeeScreen({navigation}) {
  const {allProfile, profileLoading} = useProfileData();

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const data = Array(8).fill({});

  const renderItem = ({item}) => {
    const userIdLast4 = item?.userId?.slice(-5);

    return (
      <View style={styles.card}>
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
      </View>
    );
  };

  return (
    <CommonSafeAreaViewComponent>
      {profileLoading && <LogoLoaderComponent />}
      <Header
        title={I18n.t('employees')}
        // onRightIconPressed={handleLogout}
        rightIcon={
          <Octicons
            name="person-add"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
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
                {I18n.t('employees')}
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
    </CommonSafeAreaViewComponent>
  );
}
