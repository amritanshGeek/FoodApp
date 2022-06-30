import React from 'react';
import RootNavigator from './src/navigators';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { View,Text, NativeBaseProvider } from 'native-base';
/**
 * App
 */
const App = () => {
  return (
    <PersistGate {...{ persistor }} loading={null}>
      <Provider {...{ store }}>
        <NativeBaseProvider>
          <RootNavigator  />
        </NativeBaseProvider>
      </Provider>
    </PersistGate>
  );
};

export default App;
