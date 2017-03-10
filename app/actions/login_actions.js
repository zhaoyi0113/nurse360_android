import * as types from './action_types';
import sha1 from 'sha1';
import * as commonActions from './common_actions';
import * as keys from '../utils/keys';

export const login = (mobile, password) => {
  return commonActions.requestPost(types.LOGIN_HTTP, '/nurse/login', {
    mobile: mobile,
    password: sha1(password)
  }, null, {responseType: 'text'});

}

export const logout = (token) => {
  return commonActions.requestPut(types.LOGOUT_HTTP, '/nurse/logout', null, token, {responseType: 'text'});
}

export const requestSmsCode = (mobile) => {
  return commonActions.requestPost(types.REQUEST_SMS_CODE_HTTP, '/requestSmsCode', {
    mobilePhoneNumber: mobile,
    name: '全时护理',
    ttl: 30
  }, null, {
    headers: {'X-LC-Id': keys.LEANCLOUD_APP_ID, 'X-LC-Key': keys.LEANCLOUD_APP_KEY, 'Content-Type': 'application/json'},
    client: 'leanCloud'
  });
}

export const register = (mobile, password, smsCode, hospitalId, departmentId, jobTitle) => {
  return commonActions.requestPost(types.REGISTER_HTTP, '/nurse/register', {
    mobile: mobile,
    password: sha1(password),
    sms_code: smsCode,
    hospital_id: hospitalId,
    department_id: departmentId,
    job_title: jobTitle
  }, null, null);
}

export const forgetPassword = (mobile, verify, newPwd) => {
  return commonActions.requestPut(types.FORGET_PASSWORD_HTTP, '/nurse/password/reset', {
    smscode: verify,
    new_password: sha1(newPwd),
    mobile: mobile
  });
}