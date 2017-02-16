import * as types from '../actions/action_types';

export const StudyReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_STUDY_COURSES + types.SUCCESS:
      return {...state, courses: action.payload.data}
    case types.QUERY_STUDY_COURSES_DETAIL_HTTP + types.SUCCESS:
      return {...state, course: {content:action.payload.data}};
    default:
      return state;
  }
}