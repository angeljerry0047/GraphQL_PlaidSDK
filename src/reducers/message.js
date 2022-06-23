import { handleActions } from 'redux-actions';

import { messageActions } from '../actions/message';

const initState = {
  text1: null,
  text2: null,
  type: null,
};

const messageReducer = handleActions(
  {
    [messageActions.setMessage]: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
  initState,
);

export default messageReducer;
