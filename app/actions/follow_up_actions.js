import * as types from './action_types';
import * as actions from './common_actions';

export const queryFollowUpPatientList = (token, index, number) => {
  return actions.requestGet(types.QUERY_FOLLOW_UP_PATIENT_LIST_HTTP, '/nurse/follow-up/patient?index=' + index + '&number=' + number, token);
}

export const queryFollowUpUnReadList = (token, index, number) => {
  return actions.requestGet(types.QUERY_FOLLOW_UP_UNREAD_LIST_HTTP, '/nurse/follow-up/patient/record?index='
    + index + '&number=' + number + '&patient_replied=YES&nurse_read=NO', token);
}


export const queryFollowUpReadList = (token, index, number) => {
  return actions.requestGet(types.QUERY_FOLLOW_UP_READ_LIST_HTTP, '/nurse/follow-up/patient/record?index='
    + index + '&number=' + number + '&patient_replied=YES&nurse_read=&follow_up_id=0&follow_up_type=follow_up', token);
}

export const queryTemplateList = (token, index, number) => {
  return actions.requestGet(types.QUERY_TEMPLATE_LIST_HTTP, '/nurse/follow-up/patient/questionnaire?index='
    + index + '&number=' + number, token);
}


