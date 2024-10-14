import {useSelector} from 'react-redux';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {Platform} from 'react-native';
import Constants from '../components/common/Constants';

const useApi = (contentType = 'application/json') => {
  const apiUrl = Constants?.BASE_URL;
  const accessToken = useSelector(state => state.login?.accessToken);

  const service = axios.create({
    headers: {
      'Content-Type': contentType,
      Accept: '*/*',
    },
  });

  const retryDelay = (retryNumber = 0) => {
    const seconds = Math.pow(2, retryNumber) * 1000;
    const randomMs = 1000 * Math.random();
    return seconds + randomMs;
  };

  axiosRetry(service, {
    retries: 2,
    retryDelay,
    retryCondition: axiosRetry.isRetryableError,
  });

  service.interceptors.response.use(response => response);

  const request = async (type, path, payload) => {
    if (payload !== undefined) {
      console.log('params:', payload);
    }

    type = Platform.OS === 'android' ? type.toUpperCase() : type;

    if (path.includes('http') || path.includes('https')) {
      if (path.startsWith('/')) path = path.substr(path.indexOf('/') + 1);
    } else {
      path = apiUrl + path;
      console.log('path=', path);
    }

    if (accessToken) {
      service.defaults.headers.Authorization = `Bearer ${accessToken}`;
    }

    try {
      if (type === 'GET') {
        return (await service.get(path)).data;
      }

      return (
        await service.request({
          method: type,
          url: path,
          responseType: 'json',
          data: payload,
        })
      ).data;
    } catch (error) {
      return handleRequestError(error);
    }
  };

  const handleRequestError = error => {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data
    ) {
      return handleValidationErrors(error.response.data);
    } else {
      return {error: error.message};
    }
  };

  const handleValidationErrors = data => {
    const {Message, ModelState} = data;
    let errorMessage = 'Unknown validation error';
    for (const key in ModelState) {
      if (ModelState.hasOwnProperty(key) && ModelState[key].length > 0) {
        errorMessage = ModelState[key][0];
        break;
      }
    }
    return {error: errorMessage};
  };

  return {request};
};

export default useApi;
