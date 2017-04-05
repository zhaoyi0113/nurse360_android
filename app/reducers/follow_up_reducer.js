import * as types from "../actions/action_types";

export const FollowUpReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_FOLLOW_UP_PATIENT_LIST_HTTP + types.SUCCESS:
      return {...state, patientList: action.payload.data};
    case types.QUERY_FOLLOW_UP_UNREAD_LIST_HTTP + types.SUCCESS:
      return {...state, unreadList: action.payload.data};
    case types.QUERY_FOLLOW_UP_READ_LIST_HTTP + types.SUCCESS:
      return {...state, readList: action.payload.data};
    case types.QUERY_TEMPLATE_LIST_HTTP + types.SUCCESS:
      return {...state, templateList: action.payload.data};
    case types.QUERY_TEMPLATE_CATEGORY_ITEMS_HTTP + types.SUCCESS:
      return {...state, templateCategoryItems: parseTemplates(action.payload.data)};
    default:
      return state;
  }
}

const parseTemplates = (templates) => {
  return templates.map((template) => {
    return parseTemplate(template);
  });
}

const parseTemplate = (t) => {
  const template = {...t};
  template.detail = JSON.parse(t.conclusion);
  return template;
}