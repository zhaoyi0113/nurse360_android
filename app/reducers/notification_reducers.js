import * as types from '../actions/action_types';

export const NotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_NOTIFICATION + types.SUCCESS:
      return {...state, notifications: parseNotifications(action.payload.data)}
    case types.QUERY_NOTIFICATION_DETAIL_HTTP + types.SUCCESS:
      return {...state, notification: action.payload.data};
    case types.QUERY_NOTIFICATION_LIST_HTTP + types.SUCCESS:
      return {...state, notificationList: parseNotifications(action.payload.data)};
    case types.READ_NOTIFICATION + types.SUCCESS:
      const {notifications} = state;
      notifications && notifications.map((noti) => {
        if (noti.id === action.payload.data.notificationId) {
          noti.hasRead = 'YES';
        }
      });
      return {...state, notifications};
    default:
      return state;
  }
}

const parseNotifications = (notifications) => {
  return notifications.map((notif) => {
    notif.image = notif.significance === 'NO' ? require('../images/notification/inform_blue.png')
      : require('../images/notification/inform_red.png')
    return notif;
  });
}