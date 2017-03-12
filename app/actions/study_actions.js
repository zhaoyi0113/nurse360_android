import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryStudyCourses = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_STUDY_COURSES, '/nurse/extension/course/' + index + '/' + number, token);
}

export const queryStudyCourseList = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_STUDY_COURSE_LIST_HTTP, '/nurse/extension/course/' + index + '/' + number, token);
}

export const queryStudyCourseDetail = (token, id) => {
  return commonActions.requestGet(types.QUERY_STUDY_COURSES_DETAIL_HTTP, '/nurse/extension/course/detail_html?course_id=' + id, token, {responseType: 'text'});
}

export const readStudyCourse = (token, id) => {
  return commonActions.requestPost(types.READ_STUDY_COURSE, '/nurse/extension/course', {'course_id':id}, token);
}