import * as utils from './common_reducer';
import * as types from '../actions/action_types';

export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_ORDERS + types.SUCCESS:
      return {...state, orders: parseUserOrders(action.payload.data)};
    case types.FETCH_ORDER_HTTP + types.SUCCESS:
      return {...state, fetchOrder: action.payload.data};
    case types.QUERY_ORDER_HTTP + types.SUCCESS:
      return {...state, order: parseUserOrder(action.payload.data[0])};
    case types.QUERY_ORDER_LIST_HTTP+types.SUCCESS:
      return {...state, orderList: parseUserOrders(action.payload.data)};
    default:
      return state;
  }
}

export const ORDER_STATUS_NAME = {
  TO_SERVICE: '待接单',
  IN_PROCESS: '服务中',
  COMPLETED: '服务完成',
  CANCEL: '取消订单',
  REFUND_IN_PROCESS: '退款中',
}

export const ORDER_ACTION_NAME = {
  TO_SERVICE: '抢单',
  IN_PROCESS: '您已抢单',
  COMPLETED: '您已抢单',
  CANCEL: '您已取消',
  REFUND_IN_PROCESS: '退款中',
}

export const getOrderTitleIcon = (status) => {
  switch (status) {
    case 'TO_SERVICE':
      return require('../images/order/alPay.png');
    case 'COMPLETED':
      return require('../images/order/finishPay.png');
    case 'CANCEL':
      return require('../images/order/cancelPay.png');
    case 'IN_PROCESS':
      return require('../images/order/waitPay.png');
    case 'REFUND_IN_PROCESS':
      return require('../images/order/alPay.png');
    default:
      return require('../images/order/alPay.png');
  }
}

export const parseOrderStatus = (status) => {
  return ORDER_STATUS_NAME[status];
}

export const getOrderAction = (status) => {
  return ORDER_ACTION_NAME[status];
}

export const parseUserOrders = (data) => {
  let orders = [];
  data.forEach((o) => {
    orders.push(parseUserOrder(o));
  })
  return orders;
}

export const parseUserOrder = (data) => {
  let order = {...data};
  if (data && data.vendorHospital) {
    order.hospitalName = data.vendorHospital.name;

  }
  order.statusName = parseOrderStatus(order.orderStatus);
  order.actionName = getOrderAction(order.orderStatus);
  order.titleIcon = getOrderTitleIcon(order.orderStatus);
  if (order.serviceItem.imageUrl) {
    order.icon = {uri: order.serviceItem.imageUrl};
  } else {
    order.icon = require('../images/order/serviceIcon.png');
  }
  if (data.serviceItem) {
    order.serviceName = data.serviceItem.name;
    order.orderDate = utils.getDate(data.serviceStartTime);
    order.needVisitPatientRecord = data.serviceItem.needVisitPatientRecord;
  }
  return order;
}

