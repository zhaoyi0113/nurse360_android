import * as types from './action_types';
import * as commonActions from './common_actions';

export const queryNotification = (token, index, number) => {
  return commonActions.requestGet(types.QUERY_NOTIFICATION, '/nurse/extension/notification/' + index + '/' + number, token);
}

export const queryNotificationDetail = (token, id) => {
  return commonActions.requestGet(types.QUERY_NOTIFICATION_DETAIL_HTTP, '/nurse/extension/notification/' + id, token);
}