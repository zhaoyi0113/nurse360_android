import _ from 'lodash';
import * as types from '../actions/action_types';

export const CommonReducer = (state = {}, action) => {
  if (action.type.includes(types.FAIL)) {
    state = {...state, alert: {title: '', message: errorMessage[action.type]}}
  }

  switch (action.type) {
    case types.WAITING_INDICATOR:
      return {...state, ...action};
    case types.LOGIN_HTTP + types.FAIL:
      return {...state, waitingIndicator: false}
    case types.LOGIN_HTTP + types.SUCCESS:
      return {...state, waitingIndicator: false}
    case types.CLEAR_ALERT:
      state = _.omit(state, 'alert');
      return state;
    default:
      return state;
  }
}


export const errorMessage = {

}
errorMessage[types.LOGIN_HTTP+types.FAIL] = '登录失败';