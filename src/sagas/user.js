import { takeLatest, put, cancelled, call } from 'redux-saga/effects';
import { API, Auth } from 'aws-amplify';

import { portfolioActions } from '../actions/portfolio';
import { userActions } from '../actions/user';
import { statusActions } from '../actions/status';
import { homeActions } from '../actions/home';
import * as NavigationService from '../services/navigation/NavigationService';

function* addTrustContract({ payload }) {
  const apexApiName = 'apex';
  const path = '/apex/trust_contact';

  const { token } = payload;
  const error = 'Something went Wrong. Please try again';
  try {
    const init = {
      headers: {
        Authorization: token,
      },
      body: payload.data,
    };
    const resp = yield API.put(apexApiName, path, init);
    yield put(userActions.addTrustContractSuccess(resp));
    yield put(portfolioActions.getApexAccountOwnerRequest());
    const data = {
      payload: {
        account: resp.data.account,
        updateForm: {
          contact: {},
          identity: {
            name: {
              legalName: payload.data.givenName + ' ' + payload.data.familyName,
              givenName: payload.data.givenName,
              familyName: payload.data.familyName,
              additionalNames: ['T'],
            },
          },
        },
      },
      token: payload.token,
      router: 'TrustedContactSuccess',
    };
    if (payload.data.contactForm?.mailingAddress) {
      data.payload.updateForm.contact.homeAddress =
        payload.data.contactForm.mailingAddress;
    }
    if (payload.data.contactForm?.phoneNumber?.phoneNumber) {
      const phonNumbers = [];
      phonNumbers.push({
        phoneNumber: payload.data.contactForm.phoneNumber.phoneNumber,
        phoneNumberType: payload.data.contactForm.phoneNumber.phoneNumberType,
      });
      data.payload.updateForm.contact.phoneNumbers = phonNumbers;
    }
    yield put(portfolioActions.updateApexAccountRequest(data));
  } catch (err) {
    console.log('addTrustContract err', err);
    yield put(userActions.addTrustContractFailed(error));
  } finally {
    if (yield cancelled()) {
      console.log('addTrustContract task cancelled.');
    }
  }
}

export function* updateAttributes({ payload }) {
  const apiName = 'userActions';
  const path = '/update-attributes';
  const init = {
    body: {
      ...payload,
    },
  };
  try {
    yield API.post(apiName, path, init);
    yield put(portfolioActions.updateAttributesSuccess());
  } catch (err) {
    console.log('update Attribute err', err);
    yield put(portfolioActions.updateAttributesFailed(err));
  }
}

export function* getAllDocuments({ payload }) {
  const { token } = payload;
  const apexApiName = 'apexDocuments';
  const path = '/documents';
  const error = 'Something went Wrong. Please try again.';
  const init = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const data = yield API.get(apexApiName, path, init);
    yield put(userActions.getAllDocumentsSuccess(data));
  } catch (e) {
    console.log('getAllDocuments err', e);
    yield put(userActions.getAllDocumentsFailed(error));
  } finally {
    if (yield cancelled()) {
      console.log('getAllDocuments task cancelled.');
    }
  }
}

export function* getDocumentStatement({ payload }) {
  const { token, documentId } = payload;
  const apexApiName = 'apexDocuments';
  const path = `/documents/${documentId}`;
  const error = 'Something went Wrong. Please try again.';
  const init = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const data = yield API.get(apexApiName, path, init);
    yield put(userActions.getDocumentStatementSuccess(data));
  } catch (e) {
    console.log('getDocmentStatement err', e);
    yield put(userActions.getDocumentStatementFailed(error));
  } finally {
    if (yield cancelled()) {
      console.log('getDocmentStatement task cancelled.');
    }
  }
}

export function* logout() {
  try {
    yield put(
      statusActions.setAppCurrentStatus({
        parent: '',
        sub: '',
      }),
    );
    yield put(userActions.clearUserData());
    yield put(portfolioActions.clearPortfolioData());
    yield put(homeActions.clearHomeData());
    yield call([Auth, Auth.signOut]);
    NavigationService.navigate('Login');
  } catch (err) {
    console.log(err);
  }
}

export default function* userSagas() {
  yield takeLatest(userActions.addTrustContractRequest, addTrustContract);
  yield takeLatest(
    userActions.getDocumentStatementRequest,
    getDocumentStatement,
  );
  yield takeLatest(userActions.getAllDocumentsRequest, getAllDocuments);
  yield takeLatest(userActions.updateAttributesRequest, updateAttributes);
  yield takeLatest(userActions.logout, logout);
}
