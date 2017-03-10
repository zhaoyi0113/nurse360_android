import * as types from '../actions/action_types';
import * as orderUtils from './order_reducer';

export const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_INFO_HTTP + types.SUCCESS:
      return {...state, userInfo: parseUserInfo(action.payload.data)};
    case types.USER_ORDER_HTTP + types.SUCCESS:
      return {...state, userOrder: orderUtils.parseUserOrders(action.payload.data)};
    case types.USER_COURSE_HTTP + types.SUCCESS:
      return {...state, userCourses: action.payload.data}
    case types.USER_ORDERS+types.SUCCESS:
      return {...state, userOrders: orderUtils.parseUserOrders(action.payload.data)}
    default:
      return state;
  }
}

const parseUserInfo = (data) => {
  let userInfo = {...data};
  if (data.properties && data.properties.qualification) {
    userInfo.departmentName = data.properties.qualification.parentDepartmentName + '-' + data.properties.qualification.departmentName;
    userInfo.hospitalName = data.properties.qualification.hospitalName;
    userInfo.wallet = data.properties.wallet_remain;
  }
  return userInfo;
}

