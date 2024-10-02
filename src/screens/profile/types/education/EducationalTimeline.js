import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';

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

export default EducationalTimeline;
