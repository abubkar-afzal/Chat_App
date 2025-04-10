import FirstPage from 'components/FirstPage';
import { StatusBar } from 'expo-status-bar';
import './global.css';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#4c72d958" />
      <FirstPage />
    </>
  );
}
