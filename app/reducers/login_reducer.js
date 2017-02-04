import _ from 'lodash';
import * as types from '../actions/action_types';

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_HTTP + types.SUCCESS:
      return {...state, token: action.payload.data};
    default:
      return state;
  }
}