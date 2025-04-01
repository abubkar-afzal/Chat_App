import FirstPage from 'components/FirstPage';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import LoginAndSignUp from 'components/LoginAndSignup';
import HomePage from 'components/HomePage';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='#4c72d958' />
      <HomePage/>
      {/* <LoginAndSignUp /> */}
      {/* <FirstPage /> */}
    </>
  );
}
