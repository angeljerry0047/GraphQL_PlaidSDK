import { handleActions } from 'redux-actions';

import { notificationActions } from '../actions/notification';

const initState = {
  isLoading: false,
  error: null,
  notifications: [],
};
const notificationReducer = handleActions(
  {
    [notificationActions.setNotificationInfoRequest]: (state, { payload }) => {
      return { ...state, isLoading: true, error: null };
    },
    [notificationActions.setNotificationInfoSuccess]: (state) => {
      return { ...state, isLoading: false };
    },
    [notificationActions.setNotificationInfoFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [notificationActions.addNotifications]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        notifications: state.notifications.contact(payload),
      };
    },
    [notificationActions.deleteNotification]: (state, { payload }) => {
      const index = state.notifications.find((v) => v.id === payload);
      return {
        ...state,
        isLoading: false,
        notifications: state.notifications.splice(index, 1),
      };
    },
  },
  initState,
);

export default notificationReducer;
