import React, {useEffect} from 'react';
import Aes from 'react-native-aes-crypto';
import Constants from '../common/Constants';

export const convertStringToByteArray = str => {
  let hex = '';
  for (let i = 0, l = str.length; i < l; i++) {
    hex += str.charCodeAt(i).toString(16);
  }

  while (hex.length < 32) {
    hex += '0';
  }

  return hex.substring(0, 32);
};

export const generateKey = async (password, salt, cost, length) => {
  try {
    const key = await Aes.pbkdf2(password, salt, cost, length, 'SHA256');
    return key;
  } catch (error) {
    console.error('Error generating key:', error);
    throw error;
  }
};

export const encrypt = async (text, key) => {
  try {
    const iv = convertStringToByteArray(Constants.STRING_BYTE);
    const cipher = await Aes.encrypt(text, key, iv, 'aes-256-cbc');
    return {cipher, iv};
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
};

export const decrypt = async (encryptedData, key) => {
  try {
    const iv = convertStringToByteArray(Constants.STRING_BYTE);
    const decryptedData = await Aes.decrypt(
      encryptedData,
      key,
      iv,
      'aes-256-cbc',
    );
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
};

const Security = ({data, onEncrypted}) => {
  useEffect(() => {
    const handleEncryption = async () => {
      try {
        const key = await generateKey(
          Constants.ENCR_PASS,
          Constants.ENCR_SALT,
          Constants.ENCR_COST,
          Constants.ENCR_LENGTH,
        );
        const {cipher} = await encrypt(data, key);
        if (onEncrypted) {
          onEncrypted(cipher);
        }
      } catch (error) {
        console.error('Error in encryption:', error);
      }
    };

    handleEncryption();
  }, [data, onEncrypted]);

  return null;
};

export default Security;
