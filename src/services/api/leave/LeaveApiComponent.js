import axios from 'axios';
import ExtractValues from '../../../components/utils/ExtractValues';

const LeaveApiComponent = async (
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
    } else if (method.toLowerCase() === 'patch') {
      return handlePatchResponse(response);
    } else if (method.toLowerCase() === 'delete') {
      return handleDeleteResponse(response); // New handling for DELETE
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

// Existing response handlers remain unchanged
const handleGetResponse = response => {
  if (!Array.isArray(response.data.documents)) {
    console.error(
      'Expected response.data.documents to be an array',
      response.data,
    );
    return [];
  }

  return response.data.documents
    .map(doc => {
      const fields = doc.fields || {};
      const name = doc.name || null;
      const createTime = doc.createTime || null;
      const updateTime = doc.updateTime || null;

      const values = ExtractValues(fields);

      return {
        name,
        createTime,
        updateTime,
        ...values,
      };
    })
    .filter(user => user !== null);
};

const handlePostResponse = (response, postLeave) => {
  if (postLeave) {
    return response.data;
  }

  if (!Array.isArray(response.data)) {
    console.error('Expected response.data to be an array', response.data);
    return [];
  }

  return response.data
    .map(item => {
      const document = item.document || {};
      const fields = document.fields || {};
      const documentName = document.name || null;
      const createTime = document.createTime || null;
      const updateTime = document.updateTime || null;

      const values = ExtractValues(fields);

      return {
        name: documentName,
        createTime,
        updateTime,
        ...values,
      };
    })
    .filter(user => user !== null);
};

const handlePatchResponse = response => {
  return response.data;
};

// New response handler for DELETE requests
const handleDeleteResponse = response => {
  // Typically, DELETE responses do not contain a body
  return {success: true, message: 'Resource deleted successfully'};
};

export default LeaveApiComponent;
