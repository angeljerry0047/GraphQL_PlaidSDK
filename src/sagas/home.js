import { takeLatest, put, cancelled, call } from 'redux-saga/effects';
const contentful = require('contentful/dist/contentful.browser.min.js');

import { homeActions } from '../actions/home';
import { messageActions } from '../actions/message';
import { API } from 'aws-amplify';
import * as NavigationService from '../services/navigation/NavigationService';
import { SPACE_ID, CONTENT_DELIVERY_API_ACCESS_TOKEN } from '../config';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: CONTENT_DELIVERY_API_ACCESS_TOKEN,
});
const ERROR = 'Something went Wrong. Please try again';


/**
 * @module sagas/home
*/

/**
 * Get Account Balance
 * @param {string} payload
 * @yields {string} balances
 */
function* getBalance({ payload }) {
  try {
    const apexApiName = 'stackwellPlaidIntegration';
    const path = '/account/balance/get';

    const init = {
      headers: {
        Authorization: payload,
      },
    };
    const data = yield API.get(apexApiName, path, init);

    yield put(homeActions.getBalanceSuccess(data.balances));
  } catch (err) {
    console.log('Get balance error', err.message);
    yield put(homeActions.getBalanceFailed(ERROR));
  } finally {
    if (yield cancelled()) {
      console.log('Get balance task cancelled.');
    }
  }
}

/**
 * Get Apex Balance
 * @param {string} payload
 * @yields {string} ApexBalance
 */
function* getApexBalance({ payload }) {
  try {
    const apexApiName = 'cash';
    const path = '/cash/amount_available';

    const init = {
      headers: {
        Authorization: payload,
      },
    };
    const data = yield API.get(apexApiName, path, init);

    yield put(homeActions.getApexBalanceSuccess(data));
  } catch (err) {
    console.log('Get apex balance error', err.message);
    yield put(homeActions.getApexBalanceFailed(err));
  } finally {
    if (yield cancelled()) {
      console.log('Get apex balance task cancelled.');
    }
  }
}

/**
 * Create ACH Deposit
 * @param {string} payload contains token & data
 * @yields {string} TransactionConfirmation
 */
function* createAchDeposit({ payload }) {
  try {
    const { token, data } = payload;
    const apexApiName = 'cash';
    const path = '/cash/transfers/achs/deposits';

    const init = {
      headers: {
        Authorization: token,
      },
      body: data,
    };
    const res = yield API.post(apexApiName, path, init);
    yield put(homeActions.createDepositSuccess(res));
    NavigationService.navigate('TransferConfirm', { from: payload.from });
  } catch (err) {
    console.log('Create Deposit err.', err.message);
    yield put(homeActions.createDepositFailed(err.message));
  } finally {
    if (yield cancelled()) {
      console.log('Create Deposit task cancelled.');
    }
  }
}

/**
 * Create ACH Withdrawal
 * @param {string} payload
 * @yields {string} WithdrawalConfirmation
 */
function* createAchWithdrawal({ payload }) {
  try {
    const { token, data } = payload;
    const apexApiName = 'cash';
    const path = '/cash/transfers/achs/withdrawals';

    const init = {
      headers: {
        Authorization: token,
      },
      body: data,
    };
    const res = yield API.post(apexApiName, path, init);
    yield put(homeActions.createWithdrawalSuccess(res));
    NavigationService.navigate('TransferConfirm', { from: payload.from });
  } catch (err) {
    console.log('Create Withdrawal err.', err.message);
    yield put(homeActions.createWithdrawalFailed(err));
  } finally {
    if (yield cancelled()) {
      console.log('Create Withdrawal task cancelled.');
    }
  }
}

/**
 * Get Stock Details
 * @param {string} payload
 * @yields {string} StockDetails
 */
function* getStockDetails({ payload }) {
  try {
    const { token, cusip } = payload;
    const apexApiName = 'stock';
    const path = `/general-information?cusip=${cusip}`;

    const init = {
      headers: {
        Authorization: token,
      },
    };
    const res = yield API.get(apexApiName, path, init);
    yield put(homeActions.getStockDetailsSuccess(res));
  } catch (err) {
    console.log('Create Withdrawal err.', err.message);
    yield put(homeActions.getStockDetailsFailed(ERROR));
  } finally {
    if (yield cancelled()) {
      console.log('Get StockDetails task cancelled.');
    }
  }
}

/**
 * Get Timeseries
 * @param {string} payload
 * @yields {string} Timeseries
 */
function* getTimeSeries({ payload }) {
  try {
    const { token, cusip, interval } = payload;
    const apexApiName = 'stock';
    const path = `/graph-data?cusip=${cusip}&interval=${interval}`;

    const init = {
      headers: {
        Authorization: token,
      },
    };
    const data = yield API.get(apexApiName, path, init);

    if (data.Note) {
      yield put(homeActions.getTimeSeriesFailed(ERROR));
      yield put(
        messageActions.setMessage({
          text1: 'Thank you for using Alpha Vantage!',
          text2:
            'Our standard API call frequency is 5 calls per minute and 500 calls per day.',
          type: 'info',
        }),
      );
      return;
    }
    yield put(homeActions.getTimeSeriesSuccess(data));
  } catch (err) {
    console.log('getTimeSeries err', err);
    yield put(homeActions.getTimeSeriesFailed(ERROR));
  } finally {
    if (yield cancelled()) {
      console.log('Get TimeSeries task cancelled.');
    }
  }
}

/**
 * Get Transaction History - 
 * Filter the scheduled transfers from list response to prevent showing recurring activity twice.
 * @param {string} payload
 * @yields {string} Transaction History
 */
function* getTransactions({ payload }) {
  try {
    const apexApiName = 'cash';
    const path = '/cash/transaction_history';

    const init = {
      headers: {
        Authorization: payload,
      },
    };
    const data = yield API.get(apexApiName, path, init);

    // Remove scheduled transfer from list if any recurring transfer shows
    // to prevent showing the recurring activity twice.
    const transferList = data.transferList;
    console.log('transfer list: ', transferList);
    const transactions = transferList.some(
      (transaction) =>
        transaction.transferType === 'ACH_DEPOSIT' &&
        transaction.occurrences === 'recurring',
    )
      ? transferList.filter(
          (transaction) => transaction.transferType !== 'scheduled-transfer',
        )
      : transferList;

    yield put(homeActions.getTransactionsSuccess(transactions));
  } catch (err) {
    console.log('Get transactions error', err.message);
    yield put(homeActions.getTransactionsFailed(ERROR));
  } finally {
    if (yield cancelled()) {
      console.log('Get transactions task cancelled.');
    }
  }
}

/**
 * Get Single Deposit/Withdrawal Transaction Details
 * @param {string} payload
 * @yields {string} Transaction Details
 */
function* getAchTransactionDetail({ payload }) {
  try {
    const { token, id, type } = payload;
    const apexApiName = 'cash';
    let path = `/cash/transfers/achs/deposits/${id}`;
    if (type === 'withdrawal') {
      path = `/cash/transfers/achs/withdrawals/${id}`;
    }

    const init = {
      headers: {
        Authorization: token,
      },
    };
    const data = yield API.get(apexApiName, path, init);
    yield put(homeActions.getTransactionDetailSuccess(data));
  } catch (err) {
    console.log('Get transactions detail error', err);
    yield put(homeActions.getTransactionDetailFailed(ERROR));
  } finally {
    if (yield cancelled()) {
      console.log('Get transactions task cancelled.');
    }
  }
}

/**
 * Cancel ACH Transaction - Cancel liquidation/ACH Withdrawal for a particular transferId
 * @param {string} payload
 * @yields {string} Transaction Cancellation Status
 */
function* achTransactionCancel({ payload }) {
  try {
    const { token } = payload;
    const apexApiName = 'cash';
    let path = `/cash/transfers/achs/deposits/${payload.transaction.transferId}/cancel`;
    if (
      payload.transaction.transferType.toLowerCase() === 'liquidation' ||
      payload.transaction.transferType.toLowerCase() === 'ach_withdrawal'
    ) {
      path = `/cash/transfers/achs/withdrawals/${payload.transaction.transferId}/cancel`;
    }

    const init = {
      headers: {
        Authorization: token,
      },
      body: { reason: 'transaction cancel' },
    };
    yield API.post(apexApiName, path, init);
    yield put(homeActions.transactionCancelSuccess());
    yield put(homeActions.getTransactionsRequest());
    NavigationService.navigate('TransactionCancelSuccess');
  } catch (err) {
    console.log('Cancel transactions error.', err);
    yield put(homeActions.transactionCancelFailed(ERROR));
  } finally {
    if (yield cancelled()) {
      console.log('Cancel transactions task cancelled.');
    }
  }
}

/**
 * Get All Stories from Contentful
 *@yields {string} Stories Data
 */
function* getStories() {
  try {
    const data = yield call(client.getEntries);
    yield put(homeActions.getStoriesSuccess(data.items));
  } catch (err) {
    yield put(homeActions.getStoriesFailed(err));
  } finally {
    if (yield cancelled()) {
      console.log('getStories task cancelled.');
    }
  }
}

/**
 * Close Apex Account with a Reason
 * @param {string} payload
 * @yields {string} Apex account Closure
 */
function* setCloseReason({ payload }) {
  const apexApiName = 'apex';
  const path = '/apex/close';
  const error = 'Something went Wrong. Please try again';
  const { token, reason } = payload;
  const init = {
    headers: {
      Authorization: token,
    },
    body: { reason },
  };
  try {
    yield API.put(apexApiName, path, init);
    yield put(homeActions.setCloseReasonSuccess());
    NavigationService.navigate('CloseAccountConfirm');
  } catch (e) {
    console.log('setCloseReason err', e.message);
    yield put(homeActions.setCloseReasonFailed(error));
  } finally {
    if (yield cancelled()) {
      console.log('Set close reason task cancelled.');
    }
  }
}

export default function* homeSagas() {
  yield takeLatest(homeActions.getBalanceRequest, getBalance);
  yield takeLatest(homeActions.getApexBalanceRequest, getApexBalance);
  yield takeLatest(homeActions.createDepositRequest, createAchDeposit);
  yield takeLatest(homeActions.createWithdrawalRequest, createAchWithdrawal);
  yield takeLatest(homeActions.getStockDetailsRequest, getStockDetails);
  yield takeLatest(homeActions.getTimeSeriesRequest, getTimeSeries);
  yield takeLatest(homeActions.getTransactionsRequest, getTransactions);
  yield takeLatest(
    homeActions.getTransactionDetailRequest,
    getAchTransactionDetail,
  );
  yield takeLatest(homeActions.transactionCancelRequest, achTransactionCancel);
  yield takeLatest(homeActions.getStoriesRequest, getStories);
  yield takeLatest(homeActions.setCloseReasonRequest, setCloseReason);
}
