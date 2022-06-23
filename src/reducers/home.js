import { handleActions } from 'redux-actions';

import { homeActions } from '../actions/home';

const initState = {
  balances: null,
  isLoading: false,
  isLoaded: false,
  error: null,
  amount: 0,
  achDeposit: null,
  achwithdrawal: null,
  apex: null,
  stockDetails: null,
  timeSeries: null,
  selectedStock: null,
  transactions: [],
  transaction: null,
  transactionIsLoading: false,
  balanceIsLoading: false,
  apexBalanceIsLoading: false,
  stories: [],
  storyLoading: false,
  accountCloseLoading: false,
};

const homeReducer = handleActions(
  {
    [homeActions.clearHomeData]: () => {
      return { ...initState };
    },
    [homeActions.getBalanceRequest]: (state) => {
      return { ...state, balanceIsLoading: true, isLoaded: false, error: null };
    },
    [homeActions.getBalanceSuccess]: (state, { payload }) => {
      return {
        ...state,
        balanceIsLoading: false,
        isLoaded: true,
        balances: payload,
      };
    },
    [homeActions.getBalanceFailed]: (state, { payload }) => {
      return {
        ...state,
        balanceIsLoading: false,
        isLoaded: true,
        error: payload,
      };
    },
    [homeActions.getApexBalanceRequest]: (state) => {
      return {
        ...state,
        apexBalanceIsLoading: true,
        isLoaded: false,
        error: null,
      };
    },
    [homeActions.getApexBalanceSuccess]: (state, { payload }) => {
      return {
        ...state,
        apexBalanceIsLoading: false,
        isLoaded: true,
        apex: payload,
      };
    },
    [homeActions.getApexBalanceFailed]: (state, { payload }) => {
      return {
        ...state,
        apexBalanceIsLoading: false,
        isLoaded: true,
        error: payload,
      };
    },
    [homeActions.setTransferAmount]: (state, { payload }) => {
      return {
        ...state,
        amount: payload,
      };
    },
    [homeActions.createDepositRequest]: (state) => {
      return { ...state, isLoading: true, isLoaded: false, error: null };
    },
    [homeActions.createDepositSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        achDeposit: payload,
      };
    },
    [homeActions.createDepositFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: payload,
      };
    },
    [homeActions.createWithdrawalRequest]: (state) => {
      return { ...state, isLoading: true, isLoaded: false, error: null };
    },
    [homeActions.createWithdrawalSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        achwithdrawal: payload,
      };
    },
    [homeActions.createWithdrawalFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: payload,
      };
    },
    [homeActions.getStockDetailsRequest]: (state) => {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        isStockDetailsLoading: true,
        isStockDetailsLoaded: false,
        error: null,
      };
    },
    [homeActions.getStockDetailsSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isStockDetailsLoading: false,
        isStockDetailsLoaded: true,
        stockDetails: payload,
      };
    },
    [homeActions.getStockDetailsFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isStockDetailsLoading: false,
        isStockDetailsLoaded: true,
        error: payload,
      };
    },
    [homeActions.getTimeSeriesRequest]: (state) => {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        isTimeSeriesLoading: true,
        isTimeSeriesLoaded: false,
        error: null,
      };
    },
    [homeActions.getTimeSeriesSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isTimeSeriesLoading: false,
        isTimeSeriesLoaded: true,
        timeSeries: payload,
      };
    },
    [homeActions.getTimeSeriesFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isTimeSeriesLoading: false,
        isTimeSeriesLoaded: true,
        error: payload,
      };
    },
    [homeActions.setStock]: (state, { payload }) => {
      return { ...state, selectedStock: payload };
    },
    [homeActions.getTransactionsRequest]: (state) => {
      return {
        ...state,
        transactionIsLoading: true,
        isLoaded: false,
        error: null,
      };
    },
    [homeActions.getTransactionsSuccess]: (state, { payload }) => {
      return {
        ...state,
        transactionIsLoading: false,
        isLoaded: true,
        transactions: payload,
      };
    },
    [homeActions.getTransactionsFailed]: (state, { payload }) => {
      return {
        ...state,
        transactionIsLoading: false,
        isLoaded: true,
        error: payload,
      };
    },
    [homeActions.getTransactionDetailRequest]: (state) => {
      return { ...state, isLoading: true, isLoaded: false, error: null };
    },
    [homeActions.getTransactionDetailSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        transaction: { ...state.transaction, ...payload },
      };
    },
    [homeActions.getTransactionDetailFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: payload,
      };
    },
    [homeActions.transactionCancelRequest]: (state) => {
      return { ...state, isLoading: true, isLoaded: false, error: null };
    },
    [homeActions.transactionCancelSuccess]: (state) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: null,
      };
    },
    [homeActions.transactionCancelFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: payload,
      };
    },
    [homeActions.getStoriesRequest]: (state) => {
      return { ...state, storyLoading: true, isLoaded: false, error: null };
    },
    [homeActions.getStoriesSuccess]: (state, { payload }) => {
      return {
        ...state,
        storyLoading: false,
        isLoaded: true,
        stories: payload,
      };
    },
    [homeActions.getStoriesFailed]: (state, { payload }) => {
      return {
        ...state,
        storyLoading: false,
        isLoaded: true,
        error: payload,
      };
    },
    [homeActions.setCloseReasonRequest]: (state) => {
      return {
        ...state,
        accountCloseLoading: true,
        error: null,
      };
    },
    [homeActions.setCloseReasonSuccess]: (state, { payload }) => {
      return {
        ...state,
        accountCloseLoading: false,
      };
    },
    [homeActions.setCloseReasonFailed]: (state, { payload }) => {
      return {
        ...state,
        accountCloseLoading: false,
        error: payload,
      };
    },
  },
  initState,
);

export default homeReducer;
