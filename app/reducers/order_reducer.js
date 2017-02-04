
import * as utils from './common_reducer';

export const ORDER_STATUS_NAME = {
  TO_SERVICE: '待接单',
  IN_PROCESS: '服务中',
  COMPLETED: '服务完成',
  CANCEL: '取消订单',
}

export const ORDER_ACTION_NAME = {
  TO_SERVICE: '抢单',
  IN_PROCESS: '您已抢单',
  COMPLETED: '您已抢单',
  CANCEL: '您已取消',
}

export const parseOrderStatus = (status) => {
  return ORDER_STATUS_NAME[status];
}

export const getOrderAction = (status) => {
  return ORDER_ACTION_NAME[status];
}

export const parseUserOrders = (data) => {
  let order = {};
  if (data && data.length > 0) {
    order = parseUserOrder(data[0]);
  }
  return order;
}

export const parseUserOrder = (data) => {
  let order = {...data};
  if (data && data.vendorHospital) {
    order.hospitalName = data.vendorHospital.name;

  }
  order.statusName = parseOrderStatus(order.orderStatus);
  order.actionName = getOrderAction(order.orderStatus);
  order.icon = order.serviceItem.imageUrl;
  if (data.serviceItem) {
    order.serviceName = data.serviceItem.name;
    order.orderDate = utils.getDate(data.serviceItem.time);
  }
  return order;
}

