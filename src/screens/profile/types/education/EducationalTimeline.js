import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Colors} from '../../../../components/common/Colors';
import {wp} from '../../../../components/common/Dimensions';

const data = [
  {
    year: '2018-2022',
    title: 'National University of Modern Languages, ISB',
    description: 'BS Software Engineering',
  },
  {
    year: '2016-2018',
    title: 'FG Inter College, Sialkot Cantt',
    description: 'ICS (Physics)',
  },
  {
    year: '2014-2016',
    title: 'Cadet College Sialkot',
    description: 'Matriculations (Science)',
  },
];

const EducationalTimeline = () => {
  return (
    <View>
      <View style={styles.verticalLine} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.dot} />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.year}>{item.year}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  verticalLine: {
    position: 'absolute',
    left: wp('1.5'),
    top: wp('1'),
    bottom: 0,
    width: 2,
    backgroundColor: Colors.lightGrey,
    zIndex: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: wp('4'),
  },
  leftContainer: {
    alignItems: 'center',
    marginRight: wp('2.5'),
    position: 'relative',
  },
  dot: {
    marginTop: wp('1'),
    width: wp('3'),
    height: wp('3'),
    borderRadius: wp('2'),
    backgroundColor: Colors.yellowColor,
    zIndex: 2,
  },
  line: {
    position: 'absolute',
    top: wp('3'),
    width: 2,
    height: wp('25'),
    backgroundColor: Colors.lightGrey,
    zIndex: 1,
  },
  rightContainer: {
    flex: 1,
    minHeight: wp('18'),
  },
  year: {
    fontSize: wp('4.3'),
    fontWeight: 'bold',
    marginBottom: wp('1'),
    color: Colors.blackColor,
  },
  title: {
    fontSize: wp('4'),
    fontWeight: '600',
    color: Colors.blackColor,
  },
  description: {
    fontSize: wp('3.5'),
    color: '#555',
    marginTop: wp('1'),
  },
});

export default EducationalTimeline;
