import * as utils from './common_reducer';
import * as types from '../actions/action_types';
import {defaultUserPhoto} from '../constants';

export const PatientReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_INTERNAL_PATIENTS + types.SUCCESS:
      return {...state, internalPatients: parsePatients(action.payload.data)};
    case types.QUERY_EXTERNAL_PATIENTS + types.SUCCESS:
      return {...state, externalPatients: parsePatients(action.payload.data)};
    case types.QUERY_INTERNAL_PATIENTS_LIST_HTTP + types.SUCCESS:
      return {...state, internalPatientList: parsePatients(action.payload.data)};
    case types.QUERY_EXTERNAL_PATIENTS_LIST_HTTP + types.SUCCESS:
      return {...state, externalPatientList: parsePatients(action.payload.data)};
    case types.QUERY_PATIENT_VISIT_LIST_HTTP + types.SUCCESS:
      return {...state, patientVisitList: parsePatients(action.payload.data)};
    case types.QUERY_NURSE_CASE_BOOKLIST_HTTP + types.SUCCESS:
      return {...state, patientCaseBookList: parseCaseBookList(action.payload.data)};
    case types.QUERY_NURSE_CASE_BOOK_DETAIL_HTTP + types.SUCCESS:
      return {...state, caseBook: action.payload.data};
    case types.CLEAR_CASEBOOK:
      return {...state, caseBook: undefined};
    case types.CLEAR_NURSE_CASEBOOK_LIST:
      return {...state, patientCaseBookList: undefined};
    case types.QUERY_VISIT_LIST_HTTP + types.SUCCESS:
      return {...state, patientVisitList: parsePatientVisits(action.payload.data)};
    default:
      return state;
  }
}

const parsePatients = (patients) => {
  return patients.map(p => {
    parsePatient(p.patient);
    return p;
  });
}

const parseCaseBookList = (caseBooks) => {
  return caseBooks.map(c => {
    parsePatient(c.patient);
    return c;
  });
}

const parsePatient = (patient) => {
  patient.genderText = patient.gender === 'MALE' ? '男' : (patient.gender === 'FEMALE' ? '女' : '保密');
  patient.image = patient.headImageUrl ? {uri: patient.headImageUrl} : defaultUserPhoto;
  return patient;
}

const parsePatientVisits = (visits) => {
  return visits.map(visit=>{
    return parsePatientVisit(visit);
  })
}

const parsePatientVisit = (visit) => {
  visit.serviceItems = JSON.parse(visit.serviceItem);
  return visit;
}