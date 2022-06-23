import { handleActions } from 'redux-actions';

import { portfolioActions } from '../actions/portfolio';

const initState = {
  portfolio: null,
  originalPortfolioAnswers: null,
  apex: null,
  isLoading: false,
  plaidLoading: false,
  error: null,
  models: [],
  isLoadingModels: false,
  type: '',
  accounts: [],
  agreementPolicy: '',
  documents: [],
  apexBalance: null,
  modelId: '',
  isLoadingApexBalanceAmount: false,
  isLoadingPlaidLinkToken: false,
  isLoadingApexAccount: false,
  isLoadingApexAccountDetail: false,
  isLoadingCancelAchRelationship: false,
  isLoadingChangeBank: false,
  scheduledTransfer: null,
  updateMode: false,
};

const portfolioReducer = handleActions(
  {
    [portfolioActions.clearPortfolioData]: (state) => {
      return { ...initState, models: state.models };
    },
    [portfolioActions.setPortfolioInfo]: (state, { payload }) => {
      const portfolio = { ...state.portfolio, ...payload };
      return { ...state, portfolio, isLoading: false };
    },
    [portfolioActions.setOriginalPortfolioAnswers]: (state, { payload }) => {
      const originalPortfolioAnswers = {
        ...state.originalPortfolioAnswers,
        ...payload,
      };
      return { ...state, originalPortfolioAnswers };
    },
    [portfolioActions.getApexAccountRequest]: (state) => {
      return { ...state, isLoadingApexAccount: true, error: null };
    },
    [portfolioActions.getApexAccountSuccess]: (state, { payload }) => {
      return { ...state, apex: payload, isLoadingApexAccount: false };
    },
    [portfolioActions.getApexAccountFailed]: (state, { payload }) => {
      return { ...state, error: payload, isLoadingApexAccount: false };
    },
    [portfolioActions.getApexAccountDetailRequest]: (state) => {
      return { ...state, isLoadingApexAccountDetail: true, error: null };
    },
    [portfolioActions.getApexAccountDetailSuccess]: (state, { payload }) => {
      return {
        ...state,
        apex: { ...state.apex, ...payload },
        isLoadingApexAccountDetail: false,
      };
    },
    [portfolioActions.getApexAccountDetailFailed]: (state, { payload }) => {
      return { ...state, error: payload, isLoadingApexAccountDetail: false };
    },
    [portfolioActions.getApexAccountOwnerRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.getApexAccountOwnerSuccess]: (state, { payload }) => {
      return {
        ...state,
        apex: { ...state.apex, ...payload },
        isLoading: false,
      };
    },
    [portfolioActions.getApexAccountOwnerFailed]: (state, { payload }) => {
      return { ...state, error: payload, isLoading: false };
    },
    [portfolioActions.createApexAccountRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.createApexAccountSuccess]: (state, { payload }) => {
      return { ...state, apex: payload, isLoading: false };
    },
    [portfolioActions.createApexAccountFailed]: (state, { payload }) => {
      return { ...state, error: payload, isLoading: false };
    },
    [portfolioActions.updateApexAccountRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.updateApexAccountSuccess]: (state, { payload }) => {
      return {
        ...state,
        apex: { ...state.apex, ...payload },
        isLoading: false,
      };
    },
    [portfolioActions.updateApexAccountFailed]: (state, { payload }) => {
      return { ...state, error: payload, isLoading: false };
    },
    [portfolioActions.getPlaidLinkTokenRequest]: (state) => {
      return { ...state, isLoadingPlaidLinkToken: true, error: null };
    },
    [portfolioActions.getPlaidLinkTokenSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoadingPlaidLinkToken: false,
        linkToken: payload.linkToken,
      };
    },
    [portfolioActions.getPlaidLinkTokenFailed]: (state, { payload }) => {
      return { ...state, isLoadingPlaidLinkToken: false, error: payload };
    },
    [portfolioActions.exchangePlaidPublicTokenRequest]: (state) => {
      return { ...state, plaidLoading: true, error: null };
    },
    [portfolioActions.exchangePlaidPublicTokenSuccess]: (
      state,
      { payload },
    ) => {
      return {
        ...state,
        plaidLoading: false,
        error: null,
        accessToken: payload.access_token,
        plaidInfoId: payload.id,
        accounts: [...payload.accounts],
      };
    },
    [portfolioActions.exchangePlaidPublicTokenFailed]: (state, { payload }) => {
      return { ...state, plaidLoading: false, error: payload };
    },
    [portfolioActions.makeTransferRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.makeTransferSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        scheduledTransfer: payload,
      };
    },
    [portfolioActions.makeTransferFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [portfolioActions.getTransferRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.getTransferSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        scheduledTransfer: payload,
      };
    },
    [portfolioActions.getTransferFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [portfolioActions.createTransferRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.createTransferSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        scheduledTransfer: payload,
      };
    },
    [portfolioActions.createTransferFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [portfolioActions.updateTransferRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.updateTransferSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        scheduledTransfer: payload,
      };
    },
    [portfolioActions.updateTransferFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [portfolioActions.cancelTransferRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.cancelTransferSuccess]: (state) => {
      return { ...state, isLoading: false, error: null };
    },
    [portfolioActions.cancelTransferFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [portfolioActions.updatePortfolioRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.updatePortfolioSuccess]: (state, { payload }) => {
      return { ...state, isLoading: false, error: null, modelId: payload };
    },
    [portfolioActions.updatePortfolioFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [portfolioActions.getPortfolioRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.getPortfolioSuccess]: (state, { payload }) => {
      return { ...state, isLoading: false, error: null, ...payload };
    },
    [portfolioActions.getPortfolioFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [portfolioActions.loadAllModelsRequest]: (state) => {
      return { ...state, isLoadingModels: true, error: null, models: [] };
    },
    [portfolioActions.loadAllModelsSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoadingModels: false,
        error: null,
        models: [...payload],
      };
    },
    [portfolioActions.loadAllModelsFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoadingModels: false,
        error: payload,
        models: [],
      };
    },
    [portfolioActions.getAgreementPolicyRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [portfolioActions.getAgreementPolicySuccess]: (state, { payload }) => {
      if (payload.type === 'content') {
        return {
          ...state,
          agreementPolicy: payload.content,
          doc: payload.doc,
          isLoading: false,
        };
      }
      return {
        ...state,
        documents: payload.content,
        doc: payload.doc,
        isLoading: false,
      };
    },
    [portfolioActions.getAgreementPolicyFailed]: (state, { payload }) => {
      return { ...state, error: payload, isLoading: false };
    },
    [portfolioActions.getPlaidAccountDetailRequest]: (state) => {
      return { ...state, isLoading: true, isLoaded: false, error: null };
    },
    [portfolioActions.getPlaidAccountDetailSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        plaidInfoId: payload.id,
        accounts: [...payload.accounts],
      };
    },
    [portfolioActions.getPlaidAccountDetailFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: payload,
        updateMode: payload === 'ITEM_LOGIN_REQUIRED' ? true : false,
      };
    },
    [portfolioActions.getApexBalanceAmountRequest]: (state) => {
      return {
        ...state,
        isLoadingApexBalanceAmount: true,
        isLoaded: false,
        error: null,
      };
    },
    [portfolioActions.getApexBalanceAmountSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoadingApexBalanceAmount: false,
        isLoaded: true,
        apexBalance: payload,
      };
    },
    [portfolioActions.getApexBalanceAmountFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoadingApexBalanceAmount: false,
        isLoaded: true,
        error: payload,
      };
    },
    [portfolioActions.cancelAchRelationshipRequest]: (state) => {
      return {
        ...state,
        isLoadingCancelAchRelationship: true,
        error: null,
      };
    },
    [portfolioActions.cancelAchRelationshipSuccess]: (state) => {
      return {
        ...state,
        isLoadingCancelAchRelationship: false,
        accounts: [],
      };
    },
    [portfolioActions.cancelAchRelationshipFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoadingCancelAchRelationship: false,
        error: payload,
      };
    },
    [portfolioActions.changeBankAccountRequest]: (state) => {
      return {
        ...state,
        isLoadingChangeBank: true,
        error: null,
      };
    },
    [portfolioActions.changeBankAccountSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoadingChangeBank: false,
        accounts: payload,
      };
    },
    [portfolioActions.changeBankAccountFailed]: (state, { payload }) => {
      return {
        ...state,
        isLoadingChangeBank: false,
        error: payload,
      };
    },
  },
  initState,
);

export default portfolioReducer;
