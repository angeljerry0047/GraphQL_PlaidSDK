import {
  takeLatest,
  put,
  cancelled,
  all,
  call,
  select,
  take,
  fork,
} from 'redux-saga/effects';
import { API } from 'aws-amplify';
import moment from 'moment';

import * as NavigationService from '../services/navigation/NavigationService';

import { portfolioActions } from '../actions/portfolio';

/**
 * @module sagas/portfolio
 */

/**
 * Apex Account Status - Figure out if apex account is Suspended/Rejected or require any action; also get support contact details.
 * @param {string} payload contains token & from
 * @yields {string} Apex account details
 */
export function* getApexAccount({ payload }) {
  const apexApiName = 'apex';
  const path = '/apex/status';

  const { token, from } = payload;
  const error = 'Something went Wrong. Please try again.';
  const init = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const data = yield API.get(apexApiName, path, init);
    yield put(portfolioActions.getApexAccountSuccess(data));
    if (
      data.accountStatus === 'SUSPENDED' ||
      data.accountStatus === 'REJECTED' ||
      data.accountStatus === 'ACTION_REQUIRED'
    ) {
      NavigationService.navigate('ContactSupport');
      return;
    }
    yield put(
      portfolioActions.getApexAccountDetailRequest({
        token,
        apexAccount: data.apexAccount,
        from,
      }),
    );
  } catch (e) {
    console.log('getApexAccount err', e.message);
    yield put(portfolioActions.getApexAccountFailed(error));
  } finally {
    if (yield cancelled()) {
      console.log('getApexAccount task cancelled.');
    }
  }
}

/**
 * Apex Account Details
 * @param {string} payload contains token, apexAccount & from
 * @yields {string} Apex account details
 */
export function* getApexAccountDetail({ payload }) {
  const { token, apexAccount, from } = payload;
  const apexApiName = 'apex';
  const path = `/apex/${apexAccount}/account`;
  const apexPathOwnerPath = `/apex/${apexAccount}/owners`;
  const error = 'Something went Wrong. Please try again.';
  const init = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const data = yield API.get(apexApiName, path, init);
    const apexOwnerdata = yield API.get(apexApiName, apexPathOwnerPath, init);
    yield put(portfolioActions.getApexAccountDetailSuccess(data));
    yield put(
      portfolioActions.getApexAccountDetailSuccess({ owner: apexOwnerdata }),
    );
  } catch (e) {
    console.log('getApexAccountDetail err', e);
    yield put(portfolioActions.getApexAccountDetailFailed(error));
  } finally {
    if (yield cancelled()) {
      console.log('getApexAccountDetail task cancelled.');
    }
  }
}

/**
 * Get Apex Account Owner
 * @yields {string} User state
 * @yields {string} State portfolio
 */
export function* getApexAccountOwner() {
  const { user } = yield select((state) => state.user);
  const { apex } = yield select((state) => state.portfolio);
  const token = `Bearer ${user?.jwt}`;
  const apexApiName = 'apex';
  const apexPathOwnerPath = `/apex/${apex.apexAccount}/owners`;
  const error = 'Something went Wrong. Please try again.';
  const init = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const apexOwnerdata = yield API.get(apexApiName, apexPathOwnerPath, init);
    yield put(
      portfolioActions.getApexAccountOwnerSuccess({ owner: apexOwnerdata }),
    );
  } catch (e) {
    console.log('getApexAccountOwnerFailed err', e);
    yield put(portfolioActions.getApexAccountOwnerFailed(error));
  } finally {
    if (yield cancelled()) {
      console.log('getApexAccountOwnerFailed task cancelled.');
    }
  }
}

/**
 * Create an Apex Account
 * @param {string} payload contains token
 * @yields {string} Account Portfolio creation
 */
export function* createApexAccount({ payload }) {
  const apexApiName = 'apex';
  const path = '/apex';

  const { token, payload: apexPayload } = payload;
  const error = 'Something went Wrong. Please try again.';
  const init = {
    headers: {
      Authorization: token,
    },
    body: apexPayload,
  };

  try {
    const data = yield API.post(apexApiName, path, init);
    yield put(portfolioActions.createApexAccountSuccess(data));
    NavigationService.navigate('PortfolioAnalyzing');
  } catch (e) {
    console.log('createApexAccount err', e.message);
    yield put(portfolioActions.createApexAccountFailed(error));
    NavigationService.navigate('ContactSupport', {
      screen: 'GlobalError',
    });
  } finally {
    if (yield cancelled()) {
      console.log('create apex task cancelled.');
    }
  }
}

/**
 * Update an Apex Account
 * @param {string} payload contains token
 * @yields {string} Edited Account Portfolio
 */
export function* updateApexAccount({ payload }) {
  const apexApiName = 'apex';
  const path = '/apex';

  const { token, payload: apexPayload, router, description } = payload;
  const error = 'Something went Wrong. Please try again.';
  const init = {
    headers: {
      Authorization: token,
    },
    body: apexPayload,
  };

  try {
    const data = yield API.put(apexApiName, path, init);
    yield put(portfolioActions.updateApexAccountSuccess(data));
    if (router) {
      NavigationService.navigate(router, { description });
    } else {
      NavigationService.navigate('TransferHome');
    }
  } catch (e) {
    console.log('updateApexAccount err', e.message);
    yield put(portfolioActions.updateApexAccountFailed(error));
    NavigationService.navigate('ContactSupport', {
      screen: 'GlobalError',
    });
  } finally {
    if (yield cancelled()) {
      console.log('update apex task cancelled.');
    }
  }
}

/**
 * Get Plaid Token Link
 * @param {string} payload contains authorization token
 * @yields {string} Plaid Link Token
 */
export function* getPlaidLinkToken({ payload }) {
  const { token } = payload;
  const apiName = 'stackwellPlaidIntegration';
  const path = '/get-link-token';
  const init = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const data = yield API.get(apiName, path, init);
    yield put(portfolioActions.getPlaidLinkTokenSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(portfolioActions.getPlaidLinkTokenFailed(error));
  }
}

/**
 * Exchange Plaid Public Token
 * @param {string} payload contains token, publicToken, Accounts, plaidInfoId, from, account_id & email
 * @yields {string} Plaid Public Token Success
 */
export function* exchangePlaidPublicToken({ payload }) {
  const { token, publicToken, accounts, plaidInfoId, from, account_id, email } =
    payload;
  const apiName = 'stackwellPlaidIntegration';
  const path = '/public-token-exchange';

  const init = {
    headers: {
      Authorization: token,
    },
    body: {
      token: publicToken,
      account_id,
      email,
    },
  };

  if (plaidInfoId) {
    init.queryStringParameters = {
      plaidInfoId,
    };
  }

  try {
    const data = yield API.post(apiName, path, init);
    yield put(
      portfolioActions.exchangePlaidPublicTokenSuccess({ ...data, accounts }),
    );
    if (
      from === 'ConfirmSchedule' ||
      from === 'StartContributionReview' ||
      from === 'TransferFunds'
    ) {
      return;
    }
    NavigationService.navigate('ConfirmSchedule');
  } catch (error) {
    console.log('exchangePlaidPublicTokenFailed', error);
    yield put(portfolioActions.exchangePlaidPublicTokenFailed(error.message));
  }
}

/**
 * Change Bank Account
 * @param {string} payload contains token, publicToken, Accounts, ApexUserInfoId, eachMonthContributions, plaidInfoId & email
 * @yields {string} Change Bank Account details
 */
export function* changeBankAccount({ payload }) {
  const {
    token,
    publicToken,
    accounts,
    apexUserInfoId,
    eachMonthContribution,
    plaidInfoId,
    email,
    router,
  } = payload;

  const apiName = 'stackwellPlaidIntegration';
  const exchangePath = '/public-token-exchange';
  const updatePath = '/account-info';
  const accountInfoPath = '/auth/get';

  const cashApiName = 'cash';
  const cashPath = '/cash/ach_relationships';

  const init = {
    headers: {
      Authorization: token,
    },
    body: {
      token: publicToken,
      account_id: accounts[0].id,
      email,
    },
  };
  if (plaidInfoId) {
    init.queryStringParameters = {
      plaidInfoId,
    };
  }
  try {
    const exchangeData = yield API.post(apiName, exchangePath, init);
    const { access_token, id } = exchangeData;
    const updateInit = {
      headers: {
        Authorization: token,
      },
      body: {
        account: accounts[0],
      },
      queryStringParameters: {
        id,
      },
    };
    const data = yield API.put(apiName, updatePath, updateInit);
    const {
      Attributes: {
        account_id: plaidAccountId,
        account_type: bankAccountType,
        account_mask: mask,
        account_name: nickname,
      },
    } = data;

    const accountInfoInit = {
      headers: {
        Authorization: token,
      },
      queryStringParameters: {
        accessToken: access_token,
        plaidAccountId: plaidAccountId,
      },
    };

    const accountData = yield API.get(
      apiName,
      accountInfoPath,
      accountInfoInit,
    );

    const { account: bankAccount, routing: bankRoutingNumber } = accountData;

    const achRelationshipInit = {
      headers: {
        Authorization: token,
      },
      body: {
        apexUserInfoId,
        bankAccount,
        bankRoutingNumber,
        bankAccountType: 'CHECKING', // just for demo The test accounts
        bankAccountOwnerName: `${nickname} ${mask}`,
        nickname,
        monthlyContribution: eachMonthContribution,
      },
    };

    yield API.post(cashApiName, cashPath, achRelationshipInit);
    yield put(portfolioActions.changeBankAccountSuccess(accounts));
    if (router && router.params?.where) {
      NavigationService.navigate(router.params.where, {
        from: router.params.from,
      });
    } else if (router) {
      NavigationService.navigate(router, {
        from: payload.from,
        plaidData: payload.plaidData,
      });
    } else {
      NavigationService.navigate('ChangeBankConfirm');
    }
  } catch (error) {
    console.log('save bank err', error.message);
    const errMessage = error.message || 'Something went wrong!';
    yield put(portfolioActions.changeBankAccountFailed(errMessage));
    NavigationService.navigate('ContactSupport', {
      screen: 'GlobalError',
    });
  }
}

/**
 * Make a Transfer - Scheduling transfers for ACH Deposits
 * @param {string} payload contains token, plaidInfoId, apexUserInfoId, plaidAccessToken, account, monthlyContribution, scheduledMonthlyAmount
 * @yields {string} Successfully Transfering & Posting scheduled monthly payments
 */
export function* makeTransfer({ payload }) {
  const {
    token,
    plaidInfoId,
    apexUserInfoId,
    plaidAccessToken,
    account,
    monthlyContribution,
    scheduledMonthlyAmount,
    from,
  } = payload;
  const apiName = 'stackwellPlaidIntegration';
  const path = '/account-info';
  const accountInfoPath = '/auth/get';

  const cashApiName = 'cash';
  const cashPath = '/cash/ach_relationships';
  const scheduledMonthlyPath = '/cash/scheduled-transfers/achs/deposits';

  const init = {
    headers: {
      Authorization: token,
    },
    body: {
      account,
    },
    queryStringParameters: {
      id: plaidInfoId,
    },
  };

  try {
    const data = yield API.put(apiName, path, init);
    const {
      Attributes: {
        account_id: plaidAccountId,
        account_type: bankAccountType,
        account_mask: mask,
        account_name: nickname,
      },
    } = data;

    const accountInfoInit = {
      headers: {
        Authorization: token,
      },
      queryStringParameters: {
        accessToken: plaidAccessToken,
        plaidAccountId,
      },
    };

    const accountData = yield API.get(
      apiName,
      accountInfoPath,
      accountInfoInit,
    );

    const { account: bankAccount, routing: bankRoutingNumber } = accountData;

    const achRelationshipInit = {
      headers: {
        Authorization: token,
      },
      body: {
        apexUserInfoId,
        bankAccount,
        bankRoutingNumber,
        bankAccountType: 'CHECKING', // just for demo The test accounts doesn't have the CHECKING or SAVING  bankAccountType.toUpperCase(), // 'CHECKING',
        bankAccountOwnerName: `${nickname} ${mask}`,
        nickname,
        monthlyContribution,
      },
    };

    yield API.post(cashApiName, cashPath, achRelationshipInit);
    // Create scheduled transfers
    const _data = yield API.post(cashApiName, scheduledMonthlyPath, {
      headers: {
        Authorization: token,
      },
      body: {
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        amount: monthlyContribution,
      },
    });
    yield put(portfolioActions.makeTransferSuccess(_data));
    if (from === 'home') {
      NavigationService.navigate('ContributionStartConfirm');
      return;
    }
    NavigationService.navigate('TransferConfirm');
  } catch (error) {
    console.log(error.message);
    const errMessage = error.message || 'Something went wrong!';
    yield put(portfolioActions.makeTransferFailed(errMessage));
  }
}

export function* getTransfer({ payload }) {
  const cashApiName = 'cash';
  const scheduledMonthlyPath = '/cash/scheduled-transfers/achs/deposits';

  try {
    // get scheduled transfers
    const data = yield API.get(cashApiName, scheduledMonthlyPath, {
      headers: {
        Authorization: payload,
      },
    });
    console.log('getTransfer data====>', data);
    if (
      !data ||
      data.length === 0 ||
      data.amount === 0 ||
      data.status === 'CANCELED'
    ) {
      NavigationService.navigate('MonthlyContributionEmpty');
    } else {
      NavigationService.navigate('MonthlyContributions');
    }
    yield put(portfolioActions.getTransferSuccess(data));
  } catch (error) {
    console.log('getTransferFailed', error.message);
    const errMessage = error.message || 'Something went wrong!';
    yield put(portfolioActions.getTransferFailed(errMessage));
  } finally {
    if (yield cancelled()) {
      console.log('get transfer task cancelled.');
    }
  }
}

export function* createTransfer({ payload }) {
  const { token, monthlyContribution } = payload;

  const cashApiName = 'cash';
  const scheduledMonthlyPath = '/cash/scheduled-transfers/achs/deposits';

  try {
    // create scheduled transfers
    const data = yield API.post(cashApiName, scheduledMonthlyPath, {
      headers: {
        Authorization: token,
      },
      body: {
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        amount: monthlyContribution,
      },
    });
    console.log('createTransferSuccess===>', data);
    yield put(portfolioActions.createTransferSuccess(data));
    NavigationService.navigate('ContributionStartConfirm');
  } catch (error) {
    console.log('createTransferFailed', error.message);
    const errMessage = error.message || 'Something went wrong!';
    yield put(portfolioActions.createTransferFailed(errMessage));
    NavigationService.navigate('ContactSupport', {
      screen: 'GlobalError',
    });
  }
}

export function* updateTransfer({ payload }) {
  const { token, depositId, monthlyContribution } = payload;

  const cashApiName = 'cash';
  const scheduledMonthlyPath = `/cash/scheduled-transfers/achs/deposits/${depositId}/update`;

  try {
    // Update scheduled transfers
    const data = yield API.post(cashApiName, scheduledMonthlyPath, {
      headers: {
        Authorization: token,
      },
      body: {
        amount: monthlyContribution,
      },
    });
    console.log('updateTransferSuccess===>', data);
    yield put(portfolioActions.updateTransferSuccess(data));
    NavigationService.navigate('ContributionEditConfirm');
  } catch (error) {
    console.log('updateTransferFailed', error.message);
    const errMessage = error.message || 'Something went wrong!';
    yield put(portfolioActions.updateTransferFailed(errMessage));
  }
}

export function* cancelTransfer({ payload }) {
  const { token } = payload;

  const cashApiName = 'cash';
  const scheduledMonthlyPath = '/cash/scheduled-transfers/achs/deposits/cancel';

  try {
    // Cancel scheduled transfers
    const data = yield API.post(cashApiName, scheduledMonthlyPath, {
      headers: {
        Authorization: token,
      },
      body: {
        comment: 'Monthly Contribution Cancel',
      },
    });
    console.log('cancelTransferSuccess', data);
    yield put(portfolioActions.cancelTransferSuccess());
    NavigationService.navigate('ContributionStopConfirm');
  } catch (error) {
    console.log('cancelTransferFailed', error.message);
    const errMessage = error.message || 'Something went wrong!';
    yield put(portfolioActions.cancelTransferFailed(errMessage));
  }
}

export function* getPortfolio({ payload }) {
  const init = {
    headers: {
      Authorization: payload,
    },
  };
  try {
    const data = yield call(
      [API, API.get],
      'portfolios',
      '/portfolios/account_settings',
      init,
    );
    yield put(portfolioActions.getPortfolioSuccess(data));
  } catch (err) {
    console.log('getPortfolio err', err);
    yield put(portfolioActions.getPortfolioFailed(err));
  }
}

export function* updatePortfolio({ payload }) {
  const { modelId, token, router } = payload;
  const init = {
    headers: {
      Authorization: token,
    },
    body: {
      modelId,
    },
  };
  try {
    yield call(
      [API, API.put],
      'portfolios',
      '/portfolios/account_settings',
      init,
    );
    yield put(portfolioActions.updatePortfolioSuccess(modelId));
    yield put(portfolioActions.loadAllModelsRequest());
    if (router) {
      NavigationService.navigate(router);
    }
  } catch (err) {
    console.log('updatePortfolio err', err);
    yield put(portfolioActions.updatePortfolioFailed(err));
    NavigationService.navigate('ContactSupport', {
      screen: 'GlobalError',
    });
  }
}

export function* getAgreementPolicy({ payload }) {
  let apiName = 'apexDocuments';
  const { url, doc } = payload;
  let path = `/legal/${url}`;
  try {
    const data = yield API.get(apiName, path);
    if (payload.url === 'stackwell-documents') {
      yield put(
        portfolioActions.getAgreementPolicySuccess({
          content: data.documents,
          type: 'documents',
          doc,
        }),
      );
      NavigationService.navigate('AgreementDocuments');
    } else {
      yield put(
        portfolioActions.getAgreementPolicySuccess({
          content: data.contents,
          type: 'content',
          doc,
        }),
      );
      NavigationService.navigate('AgreementPolicy', { type: payload.url });
    }
  } catch (error) {
    console.log(error);
    yield put(portfolioActions.getAgreementPolicyFailed(error));
  }
}

export function* getPlaidAccountDetail({ payload }) {
  const apiName = 'stackwellPlaidIntegration';
  const path = '/get-account-info';
  const init = {
    headers: {
      Authorization: payload,
    },
  };
  try {
    const data = yield API.get(apiName, path, init);
    console.log('data', data);
    if (data?.message === 'ITEM_LOGIN_REQUIRED') {
      yield put(portfolioActions.getPlaidAccountDetailFailed(data?.message));
    } else {
      yield put(portfolioActions.getPlaidAccountDetailSuccess(data));
    }
  } catch (error) {
    console.log(error);
    yield put(portfolioActions.getPlaidAccountDetailFailed(error.message));
  }
}

export function* cancelAchRelationship({ payload }) {
  const { token, router, accounts } = payload;
  const apiName = 'cash';
  const removePath = '/cash/remove-bank';
  const scheduledMonthlyPath = '/cash/scheduled-transfers/achs/deposits/cancel';
  const init = {
    headers: {
      Authorization: token,
    },
    body: {
      comment: 'A user unlinks their bank account.',
    },
  };
  try {
    yield API.post(apiName, scheduledMonthlyPath, {
      headers: {
        Authorization: token,
      },
      body: {
        comment: 'Monthly Contribution Cancel',
      },
    });
    yield API.post(apiName, removePath, init);
    yield put(portfolioActions.cancelAchRelationshipSuccess());
    if (router) {
      NavigationService.navigate(router, accounts);
    }
  } catch (err) {
    console.log('cancel achRelationship err', err);
    yield put(portfolioActions.cancelAchRelationshipFailed(err));
  }
}

function* loadModel(id, headers) {
  const result = yield call(
    [API, API.get],
    'portfolios',
    `/portfolios/models/${id}`,
    { headers },
  );
  return result;
}

function* loadAllModels() {
  try {
    const { user } = yield select((state) => state.user);
    const token = `Bearer ${user?.jwt}`;
    const headers = {
      Authorization: token,
    };
    const result = yield call(
      [API, API.get],
      'portfolios',
      '/portfolios/models',
      { headers },
    );
    const allModels = yield all(
      result.map((model) => call(loadModel, model.id, headers)),
    );
    yield put(portfolioActions.loadAllModelsSuccess(allModels));
  } catch (err) {
    console.log('load model', err);
    const message = err.message || 'Unable to load models';
    yield put(portfolioActions.loadAllModelsFailed(message));
  } finally {
    if (yield cancelled()) {
      console.log('load models cancelled');
    }
  }
}

function* getApexBalanceAmount() {
  const { user } = yield select((state) => state.user);
  const token = `Bearer ${user?.jwt}`;
  let apiName = 'apex';
  let path = '/apex/balance';
  const init = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const data = yield API.get(apiName, path, init);
    yield put(portfolioActions.getApexBalanceAmountSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(portfolioActions.getApexBalanceAmountFailed(error));
  }
}

function* createPortfolioSaga() {
  yield takeLatest(portfolioActions.loadAllModelsRequest, loadAllModels);
  yield takeLatest(portfolioActions.getApexAccountRequest, getApexAccount);
  yield takeLatest(
    portfolioActions.getApexAccountDetailRequest,
    getApexAccountDetail,
  );
  yield takeLatest(
    portfolioActions.createApexAccountRequest,
    createApexAccount,
  );
  yield takeLatest(
    portfolioActions.updateApexAccountRequest,
    updateApexAccount,
  );
  yield takeLatest(
    portfolioActions.getPlaidLinkTokenRequest,
    getPlaidLinkToken,
  );
  yield takeLatest(
    portfolioActions.exchangePlaidPublicTokenRequest,
    exchangePlaidPublicToken,
  );

  yield takeLatest(portfolioActions.makeTransferRequest, makeTransfer);
  yield takeLatest(portfolioActions.getTransferRequest, getTransfer);
  yield takeLatest(portfolioActions.createTransferRequest, createTransfer);
  yield takeLatest(portfolioActions.updateTransferRequest, updateTransfer);
  yield takeLatest(portfolioActions.cancelTransferRequest, cancelTransfer);
  yield takeLatest(portfolioActions.updatePortfolioRequest, updatePortfolio);
  yield takeLatest(portfolioActions.getPortfolioRequest, getPortfolio);
  yield takeLatest(
    portfolioActions.getPlaidAccountDetailRequest,
    getPlaidAccountDetail,
  );
  yield takeLatest(
    portfolioActions.getAgreementPolicyRequest,
    getAgreementPolicy,
  );
  yield takeLatest(
    portfolioActions.getApexBalanceAmountRequest,
    getApexBalanceAmount,
  );
  yield takeLatest(
    portfolioActions.cancelAchRelationshipRequest,
    cancelAchRelationship,
  );
  yield takeLatest(
    portfolioActions.getApexAccountOwnerRequest,
    getApexAccountOwner,
  );
  yield takeLatest(
    portfolioActions.changeBankAccountRequest,
    changeBankAccount,
  );
}

function* watchCompletionSaga() {
  yield all([
    take(portfolioActions.createApexAccountSuccess),
    take(portfolioActions.loadAllModelsSuccess),
  ]);
  yield call(NavigationService.navigate, 'SelectedPortfolio');
}

export default function* portfolioSaga() {
  yield all([fork(createPortfolioSaga)]);
}
