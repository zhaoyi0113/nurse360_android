import * as types from './action_types';
import sha1 from 'sha1';
import queryString from 'query-string';

export const login = (mobile, password) => {
  console.log('login ', mobile, sha1(password));


  return {
    type: types.LOGIN,
    payload: {
      request: {
        method: 'post',
        url: '/nurse/login',
        data: queryString.stringify({mobile: mobile, password: sha1(password)}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
      }
    }
  };
}