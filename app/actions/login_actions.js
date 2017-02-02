import * as types from './action_types';
import sha1 from 'sha1';
import queryString from 'query-string';

export const login = (mobile, password) => {

  return {
    type: types.LOGIN_HTTP,
    payload: {
      request: {
        method: 'post',
        url: '/nurse/login',
        responseType: 'text',
        data: queryString.stringify({mobile: mobile, password: sha1(password)}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
      }
    }
  }

}