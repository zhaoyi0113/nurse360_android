import _ from 'lodash';
import * as types from '../actions/action_types';

export const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_INFO_HTTP + types.SUCCESS:
      return {...state, userInfo: action.payload.data};
    default:
      return state;
  }
}