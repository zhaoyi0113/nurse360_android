import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryInternalPatient = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_INTERNAL_PATIENTS, '/nurse/patient?index=' + index + '&number=' + number + '&is_in_hospital=YES', token);
}

export const queryExternalPatient = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_EXTERNAL_PATIENTS, '/nurse/patient?index=' + index + '&number=' + number + '&is_in_hospital=NO', token);
}
