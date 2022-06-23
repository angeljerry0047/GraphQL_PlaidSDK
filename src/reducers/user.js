import { handleActions } from 'redux-actions';

import { userActions } from '../actions/user';

const initState = {
  user: {
    investmentProfile: {},
    employment: {},
  },
  isLoading: false,
  isLoaded: false,
  loggedUser: null,
  isAuthenticaton: false,
  trustedContractInfo: null,
  monthlyStatement: [],
  documents: [],
  document: null,
};

const userReducer = handleActions(
  {
    [userActions.clearUserData]: (state) => {
      return { ...initState };
    },
    [userActions.setUserInfo]: (state, { payload }) => {
      const user = { ...state.user, ...payload };
      return { ...state, isLoading: false, isLoaded: false, user };
    },
    [userActions.setLoggedUser]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        loggedUser: payload,
        isAuthenticaton: true,
      };
    },
    [userActions.addTrustContractRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [userActions.addTrustContractSuccess]: (state, { payload }) => {
      return { ...state, isLoading: false, trustedContractInfo: payload };
    },
    [userActions.addTrustContractFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [userActions.getAllDocumentsRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [userActions.getAllDocumentsSuccess]: (state, { payload }) => {
      return { ...state, isLoading: false, documents: payload };
    },
    [userActions.getAllDocumentsFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
    [userActions.getDocumentStatementRequest]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [userActions.getDocumentStatementSuccess]: (state, { payload }) => {
      return { ...state, isLoading: false, document: payload };
    },
    [userActions.getDocumentStatementFailed]: (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    },
  },
  initState,
);

export default userReducer;
