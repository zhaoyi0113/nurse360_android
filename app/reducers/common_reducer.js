import * as types from '../actions/action_types';

export const CommonReducer = (state = {}, action) => {
  switch (action.type) {
    case types.WAITING_INDICATOR:
      return {...state, ...action};
    case types.LOGIN_HTTP + types.FAIL:
      return {...state, waitingIndicator: false}
    case types.LOGIN_HTTP + types.SUCCESS:
      return {...state, waitingIndicator: false}
    default:
      return state;
  }
}