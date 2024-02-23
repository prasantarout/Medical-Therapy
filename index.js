import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { Store, persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreAllLogs();
const TherapyEvulator = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>       
          <App />       
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => TherapyEvulator);
