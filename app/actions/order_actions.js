import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryOrders = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_ORDERS, '/nurse/order?index=' + index + '&number=' + number, token);
}

export const fetchOrder = (token, id) => {
  return commonActions.requestPut(types.FETCH_ORDER_HTTP, '/nurse/order/fetch', {order_id: id}, token);
}

export const cancelOrder = (token, id) => {
  return commonActions.requestPut(types.CANCEL_ORDER_HTTP, '/nurse/order/cancel', {order_id: id}, token);
}