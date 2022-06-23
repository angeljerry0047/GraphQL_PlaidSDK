import { handleActions } from 'redux-actions';

import { statusActions } from '../actions/status';

const initState = {
  appStatus: '',
};

const statusReducer = handleActions(
  {
    [statusActions.setAppCurrentStatus]: (state, { payload }) => {
      return { ...state, appStatus: payload };
    },
  },
  initState,
);

export default statusReducer;
