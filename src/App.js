import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Amplify from 'aws-amplify';

import AppNavigator from './navigations/AppNavigator';
import configureStore from './store';
import awsmobile from './aws-exports';
const { persistor, store } = configureStore();

Amplify.configure(awsmobile);

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaProvider>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
