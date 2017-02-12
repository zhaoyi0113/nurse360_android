import * as types from "../actions/action_types";

export const HospitalReducer = (state = {}, action) => {
  switch (action.type) {
    case types.HOSTPIAL_SEARCH + types.SUCCESS:
      return {...state, hospitalList: action.payload.data};
    case types.DEPARTMENT_LIST_HTTP + types.SUCCESS:
      return {...state, departmentList: action.payload.data};
    default:
      return state;
  }
}
