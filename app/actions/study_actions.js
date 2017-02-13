import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryStudyCourses = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_STUDY_COURSES_HTTP, '/nurse/extension/course/' + index + '/' + number, token);
}