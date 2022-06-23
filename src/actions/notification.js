import { createActions } from 'redux-actions';

const notificationActions = createActions({
  SET_NOTIFICATION_INFO_REQUEST: undefined,
  SET_NOTIFICATION_INFO_SUCCESS: undefined,
  SET_NOTIFICATION_INFO_FAILED: undefined,
  ADD_NOTIFICATIONS: undefined,
  DELETE_NOTIFICATION: undefined,
});

export { notificationActions };
