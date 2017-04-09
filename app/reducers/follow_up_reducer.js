import * as types from "../actions/action_types";

export const FollowUpReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_FOLLOW_UP_PATIENT_LIST_HTTP + types.SUCCESS:
      return {...state, patientList: parsePatients(action.payload.data)};
    case types.QUERY_FOLLOW_UP_UNREAD_LIST_HTTP + types.SUCCESS:
      return {...state, unreadList: parseFollowUps(action.payload.data)};
    case types.QUERY_FOLLOW_UP_READ_LIST_HTTP + types.SUCCESS:
      return {...state, readList: parseFollowUps(action.payload.data)};
    case types.QUERY_TEMPLATE_LIST_HTTP + types.SUCCESS:
      return {...state, templateList: action.payload.data};
    case types.QUERY_TEMPLATE_CATEGORY_ITEMS_HTTP + types.SUCCESS:
      return {...state, templateCategoryItems: parseTemplates(action.payload.data)};
    case types.QUERY_TEMPLATE_DETAIL_HTTP + types.SUCCESS:
      return {...state, templateDetail: parseTemplate(action.payload.data)};
    case types.CLEAR_TEMPLATE_DETAIL:
      return {...state, templateDetail: undefined};
    case types.CLEAR_TEMPLATE_CATEGORY_ITEMS:
      return {...state, templateCategoryItems: undefined};
    case types.CLEAR_FOLLOW_UP_LIST:
      return {...state, unreadList: undefined, readList: undefined};
    case types.QUERY_QUESTION_LIST_HTTP + types.SUCCESS:
      return {...state, questionList: action.payload.data};
    default:
      return state;
  }
}

const parsePatients = (patients) => {
  return patients.map(p=>{
    p.followUpId = p.id;
    return p;
  });
}

const parseTemplates = (templates) => {
  return templates.map((template) => {
    return parseTemplate(template);
  });
}

const parseTemplate = (t) => {
  const template = {...t};
  return template;
}

const parseFollowUps = (followUps) => {
  return followUps.map((followUp) => {
    return parseFollowUp(followUp);
  });
}

const parseFollowUp = (followUp) => {
  const follow = {...followUp};
  if (follow.followUpType === 'CONSULTATION') {
    const keyword = follow.followUpContent.category.keyword || '其他';
    follow.followUpContent.description = follow.followUpContent.diseaseDescription;
    follow.followUpContent.title = keyword + '问题随访';
  }
  return follow;
}