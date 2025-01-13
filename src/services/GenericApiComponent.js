import axios from 'axios';
import ExtractValues from '../components/utils/ExtractValues';

const GenericApiComponent = async (url, method, body = null, options = {}) => {
  const {postFlag = false, resourceType = '', customHandlers = {}} = options;

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

    switch (method.toLowerCase()) {
      case 'get':
        return (customHandlers.getHandler || handleGetResponse)(
          response,
          resourceType,
        );
      case 'post':
        return (customHandlers.postHandler || handlePostResponse)(
          response,
          postFlag,
        );
      case 'patch':
        return (customHandlers.patchHandler || handlePatchResponse)(response);
      case 'delete':
        return (customHandlers.deleteHandler || handleDeleteResponse)(response);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
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
    .filter(item => item !== null);
};

const handlePostResponse = (response, postFlag) => {
  if (postFlag) {
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
    .filter(item => item !== null);
};

// Generic PATCH response handler
const handlePatchResponse = response => {
  return response.data;
};

// Generic DELETE response handler
const handleDeleteResponse = () => {
  return {success: true, message: 'Resource deleted successfully'};
};

export default GenericApiComponent;
