import * as types from './action_types';
import * as commonActions from './common_actions';

export const getUserInfo = (token) => {
  return commonActions.requestGet(types.USER_INFO_HTTP, '/nurse', token);
}

export const getUserOrder = (token, index, number) => {
  return commonActions.requestGet(types.USER_ORDER_HTTP, '/nurse/order/self/?index=' + index + '&number=' + number, token);
}