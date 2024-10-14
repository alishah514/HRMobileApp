import axios from 'axios';
import ExtractValues from '../../components/utils/ExtractValues';

const FirestoreApiComponent = async (
  url,
  method,
  body = null,
  postLeave = false,
) => {
  try {
    const config = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && {data: body}),
    };

    const response = await axios(config);

    if (method.toLowerCase() === 'get') {
      return handleGetResponse(response);
    } else if (method.toLowerCase() === 'post') {
      return handlePostResponse(response, postLeave);
    }
  } catch (error) {
    if (error.response) {
      console.error(
        'Error making API call:',
        error.response.status,
        error.response.data,
      );
    } else {
      console.error('Error making API call:', error.message);
    }
    throw error;
  }
};

const handleGetResponse = response => {
  return response.data.documents
    .map(doc => {
      const fields = doc.fields || {};
      return ExtractValues(fields);
    })
    .filter(user => user !== null);
};

const handlePostResponse = (response, postLeave) => {
  if (postLeave) {
    console.log('response.data', response);
    return response.data;
  }
  return response.data
    .map(item => {
      const document = item.document || {};
      const fields = document.fields || {};
      return ExtractValues(fields);
    })
    .filter(user => user !== null);
};

export default FirestoreApiComponent;
