import _ from 'lodash';
import * as types from '../actions/action_types';

export const CommonReducer = (state = {}, action) => {
  if (action.type.includes(types.FAIL)) {
    state = {...state, alert: {title: '', message: errorMessage[action.type] || '网络错误'}}
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