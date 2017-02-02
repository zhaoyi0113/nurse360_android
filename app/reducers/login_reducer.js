import * as types from '../actions/action_types';

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_HTTP:
      return {...state, ...action};
    default:
      return state;
  }
}