import { takeLatest, put, cancelled } from 'redux-saga/effects';
import { API } from 'aws-amplify';

import { notificationActions } from '../actions/notification';

export function* setNotificationInfo({ payload }) {
  try {
    const { token, data } = payload;
    const apexApiName = 'stackwellNotification';
    const path = '/notifications/subscription';

    const init = {
      headers: {
        Authorization: token,
      },
      body: data,
    };
    yield API.post(apexApiName, path, init);
    yield put(notificationActions.setNotificationInfoSuccess());
  } catch (err) {
    console.log('set NotificationInfo err.', err.message);
    yield put(notificationActions.setNotificationInfoFailed(err.message));
  } finally {
    if (yield cancelled()) {
      console.log('set NotificationInfo task cancelled.');
    }
  }
}

export default function* notificationSaga() {
  yield takeLatest(
    notificationActions.setNotificationInfoRequest,
    setNotificationInfo,
  );
}
