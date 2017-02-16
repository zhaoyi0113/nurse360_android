import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryStudyCourses = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_STUDY_COURSES, '/nurse/extension/course/' + index + '/' + number, token);
}

export const queryStudyCourseDetail = (token, id) => {
  return commonActions.requestGet(types.QUERY_STUDY_COURSES_DETAIL_HTTP, '/nurse/extension/course/detail_html?course_id=' + id, token, {responseType: 'text'});
}