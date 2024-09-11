import axios from 'axios';
import axiosRetry from 'axios-retry';
import {Alert, Platform} from 'react-native';
import * as Storage from './StorageService';
import Constants from '../components/common/Constants';

class ImageApi {
  constructor() {
    this.apiUrl = Constants?.BASE_URL;
    let service = axios.create({
      headers: {
        'Content-Type': 'multipart/form-data',
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
      // retry on Network Error & 5xx responses
      retryCondition: axiosRetry.isRetryableError,
    });

    service.interceptors.response.use(this._handleSuccess);
    this.service = service;
  }

  _handleSuccess(response) {
    return response;
  }

  _redirectTo = (document, path) => {
    document.location = path;
  };

  /**
   * Method to handle api requests.
   * @param {string} type
   * @param {string} path
   * @param {Object} [payload]
   */
  async request(type, path, payload, bearerToken) {
    if (payload != undefined) {
      console.log('params:', payload);
      console.log('params Image:', payload?._parts);
    }

    type = Platform.OS === 'android' ? type.toUpperCase() : type;

    if (path.includes('http') || path.includes('https')) {
      if (path.startsWith('/')) path = path.substr(path.indexOf('/') + 1);
    } else {
      path = this.apiUrl + path;
      console.log('path=', path);
    }

    if (typeof bearerToken === 'undefined') {
      bearerToken = await Storage.getData(Constants?.BEARER_TOKEN);
    }

    if (bearerToken) {
      this.service.defaults.headers.Authorization = `Bearer ${bearerToken}`;
    }

    if (type === 'get') {
      return this.service.get(path).then(response => response.data);
    }

    return this.service
      .request({
        method: type,
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data
        ) {
          return this.handleValidationErrors(error.response.data);
        } else {
          return {error: error.message};
        }
      });
  }

  handleValidationErrors(data) {
    const {Message, ModelState} = data;
    let errorMessage = 'Unknown validation error';
    for (const key in ModelState) {
      if (ModelState.hasOwnProperty(key) && ModelState[key].length > 0) {
        errorMessage = ModelState[key][0];
        break;
      }
    }

    return {error: errorMessage};
  }
}

export default new ImageApi();
