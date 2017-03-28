import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryInternalPatient = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_INTERNAL_PATIENTS, '/nurse/patient?index=' + index + '&number=' + number + '&is_in_hospital=YES', token);
}

export const queryExternalPatient = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_EXTERNAL_PATIENTS, '/nurse/patient?index=' + index + '&number=' + number + '&is_in_hospital=NO', token);
}

export const queryInternalPatientList = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_INTERNAL_PATIENTS_LIST_HTTP, '/nurse/patient?index=' + index + '&number=' + number + '&is_in_hospital=YES', token);
}

export const queryExternalPatientList = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_EXTERNAL_PATIENTS_LIST_HTTP, '/nurse/patient?index=' + index + '&number=' + number + '&is_in_hospital=NO', token);
}

export const queryVisitList = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_PATIENT_VISIT_LIST_HTTP,
    '/nurse/follow-up/patient?index=' + index + '&number=' + number, token);
}

export const queryNurseCaseBookList = (token, userId, patientId, content='', index, number) => {
  return commonActions.requestGet(types.QUERY_NURSE_CASE_BOOKLIST_HTTP, '/nurse/casebook?user_id=' + userId + '&patient_id=' + patientId + '&content=' + content + '&index=' + index + '&number=' + number, token);
}