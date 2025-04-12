import FirstPage from 'components/FirstPage';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import { Provider } from 'react-redux';
import store from 'components/redux/store';


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
