import * as types from './action_types';
import * as actions from './common_actions';


export const queryHospital = (name, index, number) => {
  return actions.requestGet(types.HOSTPIAL_SEARCH, '/hospital_department/hospital?fuzzy_name=' + name + '&index=' + index + '&number=' + number);
}

