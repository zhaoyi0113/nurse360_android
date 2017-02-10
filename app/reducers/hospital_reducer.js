import * as types from "../actions/action_types";

export const HospitalReducer = (state = {}, action) => {
  switch (action.type) {
    case types.HOSTPIAL_SEARCH + types.SUCCESS:
      return {...state, hospitalList: action.payload.data};
    default:
      return state;
  }
}
