import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import styles from '../styles';
import CommonStyles from '../../../components/common/CommonStyles';
import {wp} from '../../../components/common/Dimensions';
import {Colors} from '../../../components/common/Colors';
import styles from './styles';
import Constants from '../../../components/common/Constants';

export default function TimeLine({data, status}) {
  const TaskItem = ({item}) => (
    <View style={styles.taskContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome
          name="check-circle"
          size={Constants.SIZE.xLargeIcon}
          color={Colors.greenColor}
        />
      </View>
      <Text
        style={[
          CommonStyles.font4,
          CommonStyles.lessBold300,
          CommonStyles.textBlack,
          CommonStyles.container,
        ]}>
        {item.taskTitle}
      </Text>

      <TouchableOpacity style={styles.userIcon}>
        <Text style={CommonStyles.textBlack}>{item.storyPoint}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.verticalLineContainer}>
        <View style={styles.verticalLine} />
        {status === 1 && (
          <View style={[styles.dot, {backgroundColor: 'blue', top: 26}]} />
        )}

        <View
          style={[
            styles.dot,
            {backgroundColor: 'orange', top: status === 1 ? 132 : 26},
          ]}
        />
      </View>

      <View style={styles.contentContainer}>
        {status === 1 && (
          <View>
            <Text
              style={[
                CommonStyles.font4P,
                CommonStyles.lessBold300,
                CommonStyles.textBlack,
                CommonStyles.paddingLeft5,
              ]}>
              Report
            </Text>
            <View
              style={[CommonStyles.rowBetween, CommonStyles.paddingVertical5]}>
              <View style={styles.statusItem}>
                <View style={styles.statusDot} />
                <Text
                  style={[
                    CommonStyles.font4,
                    CommonStyles.lessBold300,
                    CommonStyles.textBlack,
                    CommonStyles.paddingLeft1,
                  ]}>
                  {data.Result.openTasks} open tasks,
                </Text>
              </View>
              <View style={styles.statusItem}>
                <View
                  style={[
                    styles.statusDot,
                    {backgroundColor: Colors.greenColor},
                  ]}
                />
                <Text
                  style={[
                    CommonStyles.font4,
                    CommonStyles.lessBold300,
                    CommonStyles.textBlack,
                    CommonStyles.paddingLeft1,
                  ]}>
                  {data.Result.completedTasks} completed tasks
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={status === 1 && CommonStyles.paddingTop5}>
          <Text
            style={[
              CommonStyles.font4P,
              CommonStyles.lessBold300,
              CommonStyles.textBlack,
              CommonStyles.paddingLeft5,
            ]}>
            Summary
          </Text>

          {/* Task List */}
          <FlatList
            data={data.Result.Data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <TaskItem item={item} />}
          />
        </View>
      </View>
    </View>
  );
}
