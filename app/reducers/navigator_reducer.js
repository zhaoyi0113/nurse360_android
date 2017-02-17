import * as types from '../actions/action_types';

export const NavigatorReducer = (state={}, action) => {
  switch (action.type) {
    case types.SET_NAVIGATOR:
      return {...state, ...action};
    default:
      return state;
  }
}