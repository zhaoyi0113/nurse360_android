import * as types from './action_types';
import * as commonActions from './common_actions';

export const getUserInfo = (token) => {

  return commonActions.requestGet(types.USER_INFO_HTTP, '/nurse', token);
}