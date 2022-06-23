import { all } from 'redux-saga/effects';

import createPortfolioSaga from './portfolio';
import homeSaga from './home';
import userSaga from './user';
import statusSaga from './status';
import notificationSaga from './notification';

export default function* root() {
  yield all([
    createPortfolioSaga(),
    homeSaga(),
    userSaga(),
    statusSaga(),
    notificationSaga(),
  ]);
}
