import RNFS from 'react-native-fs';
import {Alert} from 'react-native';
import {DecodeBase64} from './DecodeBase64';
import {uploadToS3} from './S3Service';

export const handleImageUploadAWS = async (
  image,
  setImage = null,
  folder = null,
  path = null,
  setIsLoading = () => {},
) => {
  try {
    const filePath = image.path;

    const fileBuffer = await RNFS.readFile(filePath, 'base64');

    const binaryData = DecodeBase64(fileBuffer);

    const file = {
      name: image.filename || `${Date.now()}.jpg`,
      type: image.mime || 'image/jpeg',
      uri: filePath,
      body: binaryData,
    };

    const uploadedUrl = await uploadToS3(file, folder, path);
    console.log('Uploaded Image URL:', uploadedUrl);
    setIsLoading(false);

    if (setImage) {
      setImage({...image, uploadedUrl});
    }

    return uploadedUrl;
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    Alert.alert('Error', 'Failed to upload image. Please try again.');
  }
};
