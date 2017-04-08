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

export const queryNurseCaseBookList = (token, userId, patientId, content = '', index, number) => {
  return commonActions.requestGet(types.QUERY_NURSE_CASE_BOOKLIST_HTTP, '/nurse/casebook?user_id=' + userId + '&patient_id=' + patientId + '&content=' + content + '&index=' + index + '&number=' + number, token);
}

export const queryNurseCaseBookDetail = (token, id) => {
  return commonActions.requestGet(types.QUERY_NURSE_CASE_BOOK_DETAIL_HTTP, '/nurse/casebook/' + id, token);
}

//新建病例
export const createNewCaseBook = (token, data) => {
  return commonActions.requestPost(types.CREATE_NEW_CASE_BOOK_HTTP, '/nurse/casebook', data, token);
}

//修改病例
export const updateCaseBook = (token, data) => {
  return commonActions.requestPut(types.UPDATE_CASEBOOK_HTTP, '/nurse/casebook', data, token);
}

//添加一条病例记录
export const createCaseRecord = (token, data) => {
  return commonActions.requestPost(types.CREATE_CASE_RECORD_HTTP, '/nurse/casebook/case', data, token);
}

//修改病例记录
export const updateCaseRecord = (token, caseId, record) => {
  return commonActions.requestPut(types.UPDATE_CASE_RECORD_HTTP, '/nurse/casebook/case', {
    case_record: record,
    case_id: caseId
  }, token);
}

export const clearCaseBook = () => {
  return {type: types.CLEAR_CASEBOOK};
}

export const clearNurseCaseBookList = () => {
  return {type: types.CLEAR_NURSE_CASEBOOK_LIST};
}

//获取出诊记录
export const queryPatientVisitList = (token, userId, patientId, index, number) => {
  return commonActions.requestGet(types.QUERY_VISIT_LIST_HTTP, '/nurse/visit/patient?user_id='
    + userId + '&patient_id=' + patientId + '&index=' + index + '&number=' + number, token);
}

export const addPatient = (token, userId, patientId) => {
  const data = {user_id: userId, patient_id: patientId}
  return commonActions.requestPost(types.ADD_FOLLOUP_PATIENT_HTTP, '/nurse/follow-up/patient', data, token);
}