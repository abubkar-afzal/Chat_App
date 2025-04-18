import FirstPage from 'components/FirstPage';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import { Provider, useSelector } from 'react-redux';
import store from 'components/redux/store';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
export default function App() {
  
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor="#4c72d958" />
        <FirstPage />
      </Provider>
    </>
  );
}
