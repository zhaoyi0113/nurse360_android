import _ from 'lodash';
import * as types from '../actions/action_types';

export const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_INFO_HTTP + types.SUCCESS:
      return {...state, userInfo: parseUserInfo(action.payload.data)};
    default:
      return state;
  }
}

const parseUserInfo = (data) => {
  let userInfo = {...data};
  if (data.properties && data.properties.qualification) {
    userInfo.departmentName = data.properties.qualification.departmentName + '-' + data.properties.qualification.parentDepartmentName;
    userInfo.hospitalName = data.properties.qualification.hospitalName;
    userInfo.wallet = data.properties.wallet_remain;
  }
  return userInfo;
}