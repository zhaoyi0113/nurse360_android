import * as types from './action_types';
import * as actions from './common_actions';

// 获得随访患者列表
export const queryFollowUpPatientList = (token, index, number) => {
  return actions.requestGet(types.QUERY_FOLLOW_UP_PATIENT_LIST_HTTP, '/nurse/follow-up/patient?index=' + index + '&number=' + number, token);
}

//获得未读回复列表
export const queryFollowUpUnReadList = (token, followUpId, index, number) => {
  return actions.requestGet(types.QUERY_FOLLOW_UP_UNREAD_LIST_HTTP, '/nurse/follow-up/patient/record?index='
    + index + '&number=' + number + '&patient_replied=YES&nurse_read=NO&follow_up_id=' + followUpId, token);
}

//获得已推送列表
export const queryFollowUpReadList = (token, followUpId, index, number) => {
  return actions.requestGet(types.QUERY_FOLLOW_UP_READ_LIST_HTTP, '/nurse/follow-up/patient/record?index='
    + index + '&number=' + number + '&patient_replied=""&nurse_read=YES&&follow_up_id=' + followUpId, token);
}

export const clearFollowUpList = () => {
  return {type: types.CLEAR_FOLLOW_UP_LIST};
}

export const queryTemplateList = (token, index, number) => {
  return actions.requestGet(types.QUERY_TEMPLATE_LIST_HTTP, '/nurse/follow-up/patient/questionnaire?index='
    + index + '&number=' + number, token);
}

export const queryTemplateCategoryItems = (token, categoryId, index = 0, number = 100) => {
  return actions.requestGet(types.QUERY_TEMPLATE_CATEGORY_ITEMS_HTTP,
    '/nurse/follow-up/patient/questionnaire/category?category_id=' + categoryId + '&number=' + number + '&index=' + index, token);
}

export const clearTemplateCategoryItems = () => {
  return {type: types.CLEAR_TEMPLATE_CATEGORY_ITEMS};
}

export const queryTemplateDetail = (token, id) => {
  return actions.requestGet(types.QUERY_TEMPLATE_DETAIL_HTTP, '/nurse/follow-up/patient/questionnaire/' + id, token);
}

export const clearTemplateDetail = () => {
  return {type: types.CLEAR_TEMPLATE_DETAIL};
}

// 发送随访问卷
export const sendTemplate = (token, followUpId, followUpType, consultationId, questionnaireId) => {
  return actions.requestPost(types.SEND_TEMPLATE_HTTP, '/nurse/follow-up/patient/record', {
    follow_up_id: followUpId,
    follow_up_type: followUpType,
    consultation_id: consultationId,
    questionnaire_id: questionnaireId
  }, token);
}
