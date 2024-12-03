import AWS from 'aws-sdk';
import {
  AWS_BASE_URL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} from '@env';

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadToS3 = async file => {
  const params = {
    Bucket: 'm3logi-test-bucket',
    Key: `hrmobileapp/pictures/${Date.now()}_${file.name}`,
    Body: file.body,
    ContentType: file.type,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    const formattedURL = `${AWS_BASE_URL}/${params.Key}`;
    console.log('File uploaded successfully:', formattedURL);
    return formattedURL;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
