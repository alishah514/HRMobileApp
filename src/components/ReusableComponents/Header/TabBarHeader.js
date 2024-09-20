import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Colors} from '../../../components/common/Colors';
import Constants from '../../../components/common/Constants';
import CommonStyles from '../../../components/common/CommonStyles';

export default function TabBarHeader({tabs, activeTab, handleTabPress}) {
  return (
    <View style={[CommonStyles.tabChange, CommonStyles.shadow]}>
      {tabs.map(tab => {
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
              isActive ? activeBackgroundColor : CommonStyles.whiteColor,
            ]}
            onPress={() => handleTabPress(tab.id)}>
            <IconComponent
              name={tab.icon}
              size={Constants.SIZE.largeIcon}
              color={iconColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
