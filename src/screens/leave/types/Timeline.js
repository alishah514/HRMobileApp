import React from 'react';
import {View, Text, FlatList, Touchable, TouchableOpacity} from 'react-native';
import {Colors} from '../../../components/common/Colors';
import {hp, wp} from '../../../components/common/Dimensions';
import CommonStyles from '../../../components/common/CommonStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import styles from './styles';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';

const Timeline = ({color, data, toggleViewLeaveRequestModal}) => {
  const currentLanguage = useSelector(state => state.language);

  return (
    <View>
      <View style={styles.verticalLine} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
              <View
                style={[
                  styles.dot,
                  {backgroundColor: color ? color : Colors.yellowColor},
                ]}
              />
            </View>
            <View style={styles.rightContainer}>
              <View
                style={[
                  CommonStyles.rowBetween,
                  CommonStyles.alignItemsCenter,
                ]}>
                <View
                  style={[
                    styles.itemBox,
                    {
                      borderColor: color ? color : Colors.yellowColor,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.type,
                      {color: color ? color : Colors.yellowColor},
                    ]}>
                    {item.type}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleViewLeaveRequestModal(item)}>
                  <Text
                    style={[
                      styles.typeSmall,
                      CommonStyles.underlineText,
                      {color: color ? color : Colors.yellowColor},
                    ]}>
                    {I18n.t('view details')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={CommonStyles.rowBetween}>
                <View
                  style={[CommonStyles.flexRow, CommonStyles.alignItemsCenter]}>
                  <Ionicons
                    name="calendar-outline"
                    size={Constants.SIZE.medIcon}
                    color={color ? color : Colors.yellowColor}
                  />
                  <Text
                    style={[
                      styles.title,
                      CommonStyles.paddingLeft2,
                    ]}>{`${item.fromDate} `}</Text>
                </View>
                <View
                  style={[CommonStyles.flexRow, CommonStyles.alignItemsCenter]}>
                  <Ionicons
                    name="calendar-outline"
                    size={Constants.SIZE.medIcon}
                    color={color ? color : Colors.yellowColor}
                  />
                  <Text
                    style={[
                      styles.title,
                      CommonStyles.paddingLeft2,
                    ]}>{`${item.toDate}`}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Timeline;
