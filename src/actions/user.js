import { createActions } from 'redux-actions';

const userActions = createActions({
  CLEAR_USER_DATA: undefined,
  SET_USER_INFO: undefined,
  UPDATE_USER_INFO: undefined,
  SIGN_OUT: undefined,
  SET_LOGGED_USER: undefined,
  ADD_TRUST_CONTRACT_REQUEST: undefined,
  ADD_TRUST_CONTRACT_SUCCESS: undefined,
  ADD_TRUST_CONTRACT_FAILED: undefined,
  GET_ALL_DOCUMENTS_REQUEST: undefined,
  GET_ALL_DOCUMENTS_SUCCESS: undefined,
  GET_ALL_DOCUMENTS_FAILED: undefined,
  GET_DOCUMENT_STATEMENT_REQUEST: undefined,
  GET_DOCUMENT_STATEMENT_SUCCESS: undefined,
  GET_DOCUMENT_STATEMENT_FAILED: undefined,
  UPDATE_ATTRIBUTES_REQUEST: undefined,
  UPDATE_ATTRIBUTES_SUCCESS: undefined,
  UPDATE_ATTRIBUTES_FAILED: undefined,
  LOGOUT: undefined,
});

export { userActions };
