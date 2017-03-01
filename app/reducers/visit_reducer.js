import * as types from '../actions/action_types';

export const VisitReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_VISIT_ITEMS_HTTP + types.SUCCESS:
      return {...state, visitItems: action.payload.data};
    default:
      return state;
  }
}