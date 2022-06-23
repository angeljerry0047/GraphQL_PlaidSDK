import { takeLatest, put, cancelled, select, call } from 'redux-saga/effects';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUserInformation } from '../graphql/mutations';

import { userActions } from '../actions/user';
import { statusActions } from '../actions/status';

export function* setAppCurrentStatus({ payload }) {
  const { user } = yield select((state) => state.user);
  try {
    console.log('userId======>', user.id);
    const userInfo = yield call(
      [API, 'graphql'],
      graphqlOperation(updateUserInformation, {
        input: {
          id: user.id,
          appStatus: {
            ...payload,
          },
        },
      }),
    );
    yield put(userActions.setUserInfo(userInfo.data.updateUserInformation));
  } catch (e) {
    console.log('app status err', e);
  } finally {
    if (yield cancelled()) {
      console.log('app status task cancelled.');
    }
  }
}

export default function* statusSagas() {
  yield takeLatest(statusActions.setAppCurrentStatus, setAppCurrentStatus);
}
