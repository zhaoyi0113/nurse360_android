import * as types from '../actions/action_types';

export const NotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.QUERY_NOTIFICATION + types.SUCCESS:
      return {...state, notifications: parseNotifications(action.payload.data)}
    default:
      return state;
  }
}

const parseNotifications = (notifications) => {
  return notifications.map((notif)=>{
    notif.image = notif.significance === 'NO' ? require('../images/notification/inform_blue.png')
      : require('../images/notification/inform_red.png')
    return notif;
  });
}