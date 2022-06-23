import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';

import reducers from '../reducers';
import sagas from '../sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = persistCombineReducers(persistConfig, {
  ...reducers,
});

const sagaMiddleware = createSagaMiddleware();

// Redux Dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = () => {
  const enhancers = [applyMiddleware(sagaMiddleware)];

  // Create store
  const store = createStore(rootReducer, composeEnhancers(...enhancers));

  // Persist store
  const persistor = persistStore(store);

  // Run sagas
  sagaMiddleware.run(sagas);

  return { persistor, store };
};

export default store;
