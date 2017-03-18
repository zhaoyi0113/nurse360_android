import * as types from './action_types';
import * as commonActions from './common_actions';
import sha1 from 'sha1';
export const getUserInfo = (token) => {
  return commonActions.requestGet(types.USER_INFO_HTTP, '/nurse', token);
}

export const getUserOrder = (token, index, number) => {
  return commonActions.requestGet(types.USER_ORDER_HTTP, '/nurse/order/self/?index=' + index + '&number=' + number, token);
}

export const getUserOrders = (token, index, number) => {
  return commonActions.requestGet(types.USER_ORDERS, '/nurse/order/self/?index=' + index + '&number=' + number, token);
}

export const getUserHistoryCourse = (token, index, number) => {
  return commonActions.requestGet(types.USER_COURSE_HTTP, '/nurse/extension/course/self/' + index + '/' + number, token)
}

export const sendSuggestionFeedback = (token, content) => {
  return commonActions.requestPost(types.SEND_FEEDBACK_HTTP, '/nurse/suggestion', {
    suggestion: content,
    platform: 'NURSE360_ANDROID'
  }, token);
}

export const changePassword = (token, oldPwd, newPwd) => {
  return commonActions.requestPut(types.UPDATE_PASSWORD_HTTP, '/nurse/password', {
    password: sha1(oldPwd),
    new_password: sha1(newPwd)
  }, token);
}

export const updateUserInfo = (token, userInfo)=>{
  return commonActions.requestPut(types.UPDATE_USER_INFO_HTTP, '/nurse', userInfo, token);
}
