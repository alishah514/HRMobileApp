import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import CommonStyles from '../../../components/common/CommonStyles';
import {wp} from '../../common/Dimensions';

export default function TabBarHeader({
  tabs = [],
  activeTab,
  handleTabPress,
  title,
}) {
  const hasTabs = tabs.length > 0;

  return (
    <View
      style={[
        CommonStyles.tabChange,
        CommonStyles.shadow,
        {
          width: wp('85'),
          height: title ? wp('15') : wp('20'),
        },
      ]}>
      {hasTabs ? (
        tabs.map(tab => {
          const IconComponent = tab.iconSet;
          const isActive = activeTab === tab.id;
          const iconColor = isActive
            ? Colors.whiteColor
            : tab.color
            ? tab.color
            : Colors.blackColor;

          const activeBackgroundColor =
            isActive && tab.color
              ? {backgroundColor: tab.color}
              : CommonStyles.backgroundYellow;

          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                CommonStyles.activeTabIconCircle,
                isActive ? activeBackgroundColor : CommonStyles.whiteBackground,
              ]}
              onPress={() => handleTabPress(tab.id)}>
              <IconComponent
                name={tab.icon}
                size={Constants.SIZE.largeIcon}
                color={iconColor}
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <View style={[CommonStyles.alignItemsCenter, CommonStyles.container]}>
          <Text
            style={[
              CommonStyles.font7,
              CommonStyles.lessBold300,
              CommonStyles.textBlack,
            ]}>
            {title}
          </Text>
        </View>
      )}
    </View>
  );
}
