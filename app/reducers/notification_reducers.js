import * as types from '../actions/action_types';

export const NotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_NOTIFICATION + types.SUCCESS:
      return {...state, notifications: action.payload.data}
    default:
      return state;
  }
}