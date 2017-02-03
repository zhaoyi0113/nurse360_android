import * as types from './action_types';
import sha1 from 'sha1';
import * as commonActions from './common_actions';

export const login = (mobile, password) => {
  return commonActions.requestPost(types.LOGIN_HTTP, '/nurse/login', {mobile: mobile, password: sha1(password)});

}