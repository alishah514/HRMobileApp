import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Constants from '../../components/common/Constants';
import {
  convertStringToByteArray,
  generateKey,
  decrypt,
} from '../../components/ReusableComponents/Security';
import ShowScanDataModal from './ShowScanDataModal';
import CommonSafeAreaViewComponent from '../../components/ReusableComponents/CommonComponents/CommonSafeAreaViewComponent';
import Header from '../../components/ReusableComponents/Header/Header';
import {Colors} from '../../components/common/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../i18n/i18n';
import {useSelector} from 'react-redux';
import CommonStyles from '../../components/common/CommonStyles';
import styles from './styles';

export default function ScanQRScreen({navigation}) {
  const currentLanguage = useSelector(state => state.language.language);

  const [scannedData, setScannedData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleScanSuccess = async e => {
    try {
      if (scannedData) return;
      const data = e.data;
      setScannedData(data);

      const key = await generateKey(
        Constants.ENCR_PASS,
        Constants.ENCR_SALT,
        Constants.ENCR_COST,
        Constants.ENCR_LENGTH,
      );
      const decryptedData = await decrypt(data, key);

      const parsedData = JSON.parse(decryptedData);

      setScannedData(parsedData);
      setModalVisible(true);
    } catch (error) {
      console.error('Error decrypting QR code:', error);
      Alert.alert('Error', 'Failed to decrypt the QR code.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <CommonSafeAreaViewComponent styling={styles.container}>
      <Header
        title={I18n.t('scanQrCode')}
        onLeftIconPressed={handleDrawerOpen}
        leftIcon={
          <Ionicons
            name="menu"
            size={Constants.SIZE.medIcon}
            color={Colors.whiteColor}
          />
        }
      />

      <QRCodeScanner
        onRead={handleScanSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        showMarker={true}
        markerStyle={styles.marker}
        topContent={
          <Text
            style={[
              CommonStyles.font4P,
              CommonStyles.textWhite,
              CommonStyles.bold500,
              CommonStyles.padding3,
            ]}>
            Align the QR code within the frame to scan.
          </Text>
        }
      />

      <ShowScanDataModal
        isModalVisible={isModalVisible}
        toggleModal={closeModal}
        scannedData={scannedData}
      />
    </CommonSafeAreaViewComponent>
  );
}
