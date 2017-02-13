import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryNotification = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_NOTIFICATION_HTTP, '/nurse/extension/notification/' + index + '/' + number, token);
}