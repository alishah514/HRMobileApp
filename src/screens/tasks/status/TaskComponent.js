import {View, Text} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import TimeLine from './TimeLine';
import {useSelector} from 'react-redux';
import I18n from '../../../i18n/i18n';
import NoRecordView from '../../../components/ReusableComponents/NoRecordView';

const TasksComponent = ({taskType, data}) => {
  const currentLanguage = useSelector(state => state.language.language);

  const taskMapping = {
    all: {label: I18n.t('allTasks'), status: 1},
    Completed: {label: I18n.t('completedTasks'), status: 2},
    Pending: {label: I18n.t('pendingTasks'), status: 3},
  };

  const {label, status} = taskMapping[taskType] || {};

  const isNoData =
    !data || data?.length === 0 || data?.every(item => !item.name);

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

      {isNoData ? (
        <View style={CommonStyles.height100}>
          <NoRecordView errorMessage={'No Record Found'} />
        </View>
      ) : (
        <TimeLine data={data} status={status} />
      )}
    </View>
  );
};

export default TasksComponent;
