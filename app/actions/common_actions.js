import queryString from 'query-string';

import * as types from './action_types';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const requestWaitingIndicator = (waiting) => {
  return {type: types.WAITING_INDICATOR, waitingIndicator: waiting};
}

export const clearAlert = () => {
  return {type: types.CLEAR_ALERT}
}

export const requestPut = (type, url, data, token, options) => {
  return requestPutPost(type, url, 'put', data, token, options);
}

export const requestPost = (type, url, data, token, options) => {
  return requestPutPost(type, url, 'post', data, token, options);
}

export const requestPutPost = (type, url, method, data, token, options) => {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  if (token) {
    headers.ACCESS_TOKEN = token;
  }
  let responseType = 'json';
  if (options && options.responseType) {
    responseType = options.responseType;
  }
  let requestData = data? queryString.stringify(data):{};
  return {
    type: type,
    payload: {
      request: {
        method: method,
        url: url,
        responseType: responseType,
        data: requestData,
        headers: headers
      }
    }
  }
}

export const requestGet = (type, url, token) => {
  let headers = {};
  if (token) {
    headers.ACCESS_TOKEN = token;
  }
  return {
    type: type,
    payload: {
      request: {
        method: 'get',
        url: url,
        responseType: 'json',
        headers: headers
      }
    }
  }
}