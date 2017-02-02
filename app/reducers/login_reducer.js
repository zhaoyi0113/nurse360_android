import _ from 'lodash';
import * as types from '../actions/action_types';

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_HTTP:
      return {...state, ...action};
    case types.LOGIN_HTTP + types.FAIL:
      return {...state, error: action.error.data};
    case types.LOGIN_HTTP + types.SUCCESS:
      if ('error' in state) {
        state = _.omit(state, error);
      }
      return {...state, token: true};
    default:
      return state;
  }
}