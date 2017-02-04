import queryString from 'query-string';

import * as types from './action_types';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const requestWaitingIndicator = (waiting) => {
  return {type: types.WAITING_INDICATOR, waitingIndicator: waiting};
}

export const clearAlert = () => {
  return {type: types.CLEAR_ALERT}
}

export const requestPost = (type, url, data, token, options) => {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  if (token) {
    headers.ACCESS_TOKEN = token;
  }
  let responseType = 'json';
  if(options && options.responseType){
    responseType = options.responseType;
  }
  return {
    type: type,
    payload: {
      request: {
        method: 'post',
        url: '/nurse/login',
        responseType: responseType,
        data: queryString.stringify(data),
        headers: headers
      }
    }
  }
}

export const requestGet = (type, url, token) => {
  let headers = {};
  if(token){
    headers.ACCESS_TOKEN = token;
  }
  return {
    type: type,
    payload: {
      request:{
        method: 'get',
        url: url,
        responseType: 'json',
        headers: headers
      }
    }
  }
}