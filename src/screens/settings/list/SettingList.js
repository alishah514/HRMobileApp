import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Colors} from '../../../components/common/Colors';
import styles from './styles';
import CommonStyles from '../../../components/common/CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Constants from '../../../components/common/Constants';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';

export default function SettingList({navigation}) {
  const currentLanguage = useSelector(state => state.language);

  const listScreens = [
    {
      id: 0,
      name: I18n.t('changePassword'),
      icon: 'tasks',
      color: Colors.yellowColor,
      navigationTarget: 'Change Password',
    },
    {
      id: 2,
      name: I18n.t('changeLanguage'),
      color: Colors.greenColor,
      navigationTarget: 'Localization',
    },
  ];

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.navigationTarget)}
      style={[styles.itemContainer]}>
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.dot,
            {backgroundColor: item?.color ? item?.color : Colors.yellowColor},
          ]}
        />
      </View>

      <View style={[styles.screenBox, CommonStyles.shadow]}>
        <View
          style={[
            CommonStyles.rowBetween,
            CommonStyles.alignItemsCenter,
            CommonStyles.paddingHor5,
          ]}>
          <Text
            style={[
              CommonStyles.font5,
              CommonStyles.bold400,
              CommonStyles.textBlack,
            ]}>
            {item.name}
          </Text>
          <View>
            <MaterialIcons
              name="chevron-right"
              size={Constants.SIZE.largeIcon}
              color={Colors.yellowColor}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.upperPadding}>
      <View style={styles.verticalLine} />
      <FlatList
        data={listScreens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
