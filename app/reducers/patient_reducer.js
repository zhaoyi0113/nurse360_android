import * as utils from './common_reducer';
import * as types from '../actions/action_types';
import {defaultUserPhoto} from '../constants';

export const PatientReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_INTERNAL_PATIENTS + types.SUCCESS:
      return {...state, internalPatients: parsePatients(action.payload.data)};
    case types.QUERY_EXTERNAL_PATIENTS + types.SUCCESS:
      return {...state, externalPatients: parsePatients(action.payload.data)};
    default:
      return state;
  }
}

const parsePatients = (patients) => {
  return patients.map(p => {
    return parsePatient(p);
  });
}

const parsePatient = (patient) => {
  const p = {...patient};
  p.patient.genderText = p.patient.gender === 'MALE' ? '男' : (p.patient.gender === 'FEMALE' ? '女' : '保密');
  p.patient.image = p.patient.headImageUrl ? {uri: p.patient.headImageUrl} : defaultUserPhoto;
  return p;
}