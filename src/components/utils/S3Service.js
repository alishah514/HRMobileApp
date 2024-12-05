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

export const uploadToS3 = async (file, folder, path) => {
  let key = `hrmobileapp/${Date.now()}_${file.name}`;

  if (folder) {
    key = `hrmobileapp/${folder}/${Date.now()}_${file.name}`;
  }

  if (path) {
    const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
    key = `${path}${fileExtension}`;
  }

  const params = {
    Bucket: 'm3logi-test-bucket',
    Key: key,
    Body: file.body,
    ContentType: file.type,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    const formattedURL = `${AWS_BASE_URL}/${params.Key}`;
    return formattedURL;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
