import AWS from 'aws-sdk';
import Constants from '../common/Constants';

AWS.config.update({
  accessKeyId: Constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: Constants.AWS_SECRET_ACCESS_KEY,
  region: Constants.AWS_REGION,
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
    const formattedURL = `${Constants.AWS_BASE_URL}/${params.Key}`;
    console.log('File uploaded successfully:', formattedURL);
    return formattedURL;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
