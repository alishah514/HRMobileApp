import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../../components/common/Constants';
import {Colors} from '../../../components/common/Colors';
import styles from '../styles';
import CommonStyles from '../../../components/common/CommonStyles';
import {wp} from '../../../components/common/Dimensions';
import {he} from 'date-fns/locale';

const AttendanceMap = ({punchInLocation, punchOutLocation, data}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const areLocationsNear = (loc1, loc2) => {
    const threshold = 0.0001;
    return (
      Math.abs(loc1.latitude - loc2.latitude) < threshold &&
      Math.abs(loc1.longitude - loc2.longitude) < threshold
    );
  };

  let adjustedPunchOutLocation = {...punchOutLocation};

  if (areLocationsNear(punchInLocation, punchOutLocation)) {
    adjustedPunchOutLocation = {
      latitude: punchOutLocation.latitude + 0.0001,
      longitude: punchOutLocation.longitude + 0.0001,
    };
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude:
            (punchInLocation.latitude + adjustedPunchOutLocation.latitude) / 2,
          longitude:
            (punchInLocation.longitude + adjustedPunchOutLocation.longitude) /
            2,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={() => {
          setSelectedMarker(null);
        }}>
        <Marker
          coordinate={punchInLocation}
          pinColor={Colors.blueColor}
          onPress={e => {
            e.stopPropagation();
            setSelectedMarker('punchIn');
            console.log(selectedMarker);
          }}>
          <Ionicons
            name="person"
            size={Constants.SIZE.xLargeIcon}
            color={Colors.blueColor}
          />
          {selectedMarker === 'punchIn' && (
            <View>
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>Punch In Time:</Text>
                  <Text style={styles.calloutText}>{data?.punchIn}</Text>
                  <Text style={styles.calloutTitle}>User ID:</Text>
                  <Text style={styles.calloutText}>{data?.userId}</Text>
                  <Text style={styles.calloutTitle}>Location:</Text>
                  <Text style={styles.calloutText}>
                    {`${data?.latitude}, ${data?.longitude}`}
                  </Text>
                </View>
              </Callout>
            </View>
          )}
        </Marker>

        <Marker
          coordinate={adjustedPunchOutLocation}
          pinColor={Colors.redColor}
          onPress={e => {
            e.stopPropagation();
            setSelectedMarker('punchOut');
          }}>
          <Ionicons
            name="person"
            size={Constants.SIZE.xLargeIcon}
            color={Colors.redColor}
          />

          {selectedMarker === 'punchOut' && (
            <View>
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>Punch Out Time:</Text>
                  <Text style={styles.calloutText}>{data?.punchOut}</Text>
                  <Text style={styles.calloutTitle}>User ID:</Text>
                  <Text style={styles.calloutText}>
                    {data?.punchOutData?.userId}
                  </Text>
                  <Text style={styles.calloutTitle}>Location:</Text>
                  <Text style={styles.calloutText}>
                    {`${data?.punchOutData?.latitude}, ${data?.punchOutData?.longitude}`}
                  </Text>
                </View>
              </Callout>
            </View>
          )}
        </Marker>
      </MapView>
      <View
        style={[
          CommonStyles.paddingHor5,
          CommonStyles.paddingVertical5,
          CommonStyles.rowBetween,
          CommonStyles.alignItemsCenter,
        ]}>
        <View style={{width: wp('40')}}>
          <View>
            <Text style={styles.calloutTitleBelow}>Punch In: </Text>
            <Text style={styles.calloutTextBelow}>{data?.punchIn}</Text>
          </View>

          <View style={styles.imageStyle}>
            <Image
              source={{
                uri:
                  data?.imageUrl === ''
                    ? 'https://www.pngfind.com/pngs/m/304-3045489_png-file-svg-blank-person-transparent-png.png'
                    : data?.imageUrl,
              }}
              style={styles.imageFull}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={{width: wp('40')}}>
          <View>
            <Text style={styles.calloutTitleBelow}>Punch Out: </Text>
            <Text style={styles.calloutTextBelow}>{data?.punchOut}</Text>
          </View>

          <View style={styles.imageStyle}>
            <Image
              source={{
                uri:
                  data?.punchOutData?.imageUrl === ''
                    ? 'https://www.pngfind.com/pngs/m/304-3045489_png-file-svg-blank-person-transparent-png.png'
                    : data?.punchOutData?.imageUrl,
              }}
              style={styles.imageFull}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttendanceMap;
