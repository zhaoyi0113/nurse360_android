import queryString from 'query-string';

import * as types from './action_types';

export const requestWaitingIndicator = (waiting) => {
  return {type: types.WAITING_INDICATOR, waitingIndicator: waiting};
}

export const clearAlert = () => {
  return {type: types.CLEAR_ALERT}
}

export const requestPost = (type, url, data, token) => {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  if (token) {
    headers.token = token;
  }
  return {
    type: type,
    payload: {
      request: {
        method: 'post',
        url: '/nurse/login',
        responseType: 'text',
        data: queryString.stringify(data),
        headers: headers
      }
    }
  }
}