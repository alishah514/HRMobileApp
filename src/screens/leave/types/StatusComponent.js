import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import Timeline from './Timeline';
import {Colors} from '../../../components/common/Colors';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';

const StatusComponent = ({status, data, toggleViewLeaveRequestModal}) => {
  const currentLanguage = useSelector(state => state.language);

  const statusMapping = {
    pending: {color: Colors.yellowColor, label: I18n.t('pending')},
    approved: {color: Colors.greenColor, label: I18n.t('approved')},
    rejected: {color: Colors.redColor, label: I18n.t('rejected')},
  };

  const {color, label} = statusMapping[status] || {};

  return (
    <View>
      <Text
        style={[
          CommonStyles.bold6,
          CommonStyles.textBlack,
          CommonStyles.marginTop2,
        ]}>
        {label}
      </Text>
      <View style={CommonStyles.paddingTop5} />
      <Timeline
        data={data}
        color={color}
        toggleViewLeaveRequestModal={toggleViewLeaveRequestModal}
      />
    </View>
  );
};

export default StatusComponent;
