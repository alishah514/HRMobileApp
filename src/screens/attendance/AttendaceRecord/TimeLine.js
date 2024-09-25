import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CommonStyles from '../../../components/common/CommonStyles';
import {Colors} from '../../../components/common/Colors';
import CommonButton from '../../../components/ReusableComponents/CommonComponents/CommonButton';
import styles from '../styles';

export default function TimeLine({data}) {
  return (
    <>
      <View style={CommonStyles.height85}>
        <View style={styles.verticalLine} />

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={[styles.itemContainer, CommonStyles.alignItemsCenter]}>
              <View style={styles.leftContainer}>
                <View style={[styles.dot, CommonStyles.backgroundYellow]} />
              </View>
              <View
                style={[
                  CommonStyles.rowBetween,
                  CommonStyles.alignItemsCenter,
                ]}>
                <View
                  style={[
                    styles.boxRecord,
                    CommonStyles.rowBetween,
                    CommonStyles.shadow,
                  ]}>
                  <View style={[CommonStyles.alignItemsCenter]}>
                    <Text
                      style={[CommonStyles.lessBold4P, CommonStyles.textBlack]}>
                      Punch In
                    </Text>
                    <Text
                      style={[
                        CommonStyles.bold4P,
                        CommonStyles.textBlack,
                        CommonStyles.paddingTop2,
                      ]}>
                      {item.punchIn}
                    </Text>
                  </View>
                  <View style={[CommonStyles.alignItemsCenter]}>
                    <Text
                      style={[CommonStyles.lessBold4P, CommonStyles.textBlack]}>
                      Punch Out
                    </Text>
                    <Text
                      style={[
                        CommonStyles.bold4P,
                        CommonStyles.textBlack,
                        CommonStyles.paddingTop2,
                      ]}>
                      {item.punchOut}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <CommonButton
        title={'08:02:01 Hours'}
        onPress={() => console.log('abc')}
        outlined={true}
      />
    </>
  );
}
