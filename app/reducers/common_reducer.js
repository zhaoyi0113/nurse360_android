import _ from 'lodash';
import * as types from '../actions/action_types';
import moment from 'moment';

export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'


export const CommonReducer = (state = {}, action) => {
  if (action.type.includes(types.FAIL)) {
    state = {...state, alert: {title: '', message: getErrorMessage(action)}}
  }

  switch (action.type) {
    case types.WAITING_INDICATOR:
      return {...state, waitingIndicator: action.waitingIndicator};
    case types.CLEAR_ALERT:
      state = _.omit(state, 'alert');
      return state;
    default:
      let extra = {};
      if (action.type.includes('HTTP') && (action.type.includes(types.FAIL) || action.type.includes(types.SUCCESS))) {
        extra.waitingIndicator = false;
      }
      if (action.type.includes('HTTP') && !action.type.includes(types.FAIL) && !action.type.includes(types.SUCCESS)) {
        extra.waitingIndicator = true;
      }
      return {...state, ...extra};
  }
}

export const errorMessage = {}

errorMessage[types.LOGIN_HTTP + types.FAIL] = '登录失败';

const getErrorMessage = (action) => {
  if (errorMessage[action.type]) {
    return errorMessage[action.type];
  }
  if (action.type === types.REQUEST_SMS_CODE_HTTP + types.FAIL) {
    if (action.error && action.error.response && action.error.response.data) {
      switch (action.error.response.data.code) {
        case 601:
        case 127:
          return action.error.response.data.error;
        default:
          return '发送验证码失败';
      }

    }
  }
  return '网络错误';
}

export const getTime = (time) => {
  if (time) {
    return moment(time).format(DEFAULT_DATE_TIME_FORMAT);
  }
}

export const getDate = (date) => {
  if (date) {
    return moment(date).format(DEFAULT_DATE_FORMAT)
  }
}

