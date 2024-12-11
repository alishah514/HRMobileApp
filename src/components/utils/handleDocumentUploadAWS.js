import RNFS from 'react-native-fs';
import {uploadToS3} from './S3Service';
import {DecodeBase64} from './DecodeBase64';

export const handleDocumentUploadAWS = async (document, folder) => {
  try {
    const filePath = document.uri;

    const fileBuffer = await RNFS.readFile(filePath, 'base64');

    const binaryData = DecodeBase64(fileBuffer);

    const file = {
      name: document.name || `${Date.now()}_document`,
      type: document.type || 'application/octet-stream',
      uri: filePath,
      body: binaryData,
    };

    const uploadedUrl = await uploadToS3(file, folder);
    return uploadedUrl;
  } catch (error) {
    console.error('Error uploading document to S3:', error);
    throw new Error('Failed to upload document. Please try again.');
  }
};
