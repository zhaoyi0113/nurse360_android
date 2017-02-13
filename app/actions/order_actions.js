import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryOrders = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_ORDERS, '/nurse/order?index=' + index + '&number=' + number, token);
}