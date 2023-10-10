import { Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import SignInPage from './pages/auth/SignInPage';
import AuthRequire from './features/authRequire';
import WelcomePage from './features/Welcome';
import DashboardPage from './pages/DashboardPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage/>} />
      {/* public route */}
      <Route index element={<DashboardPage/>} />
      <Route path='login' element={<SignInPage/>} />

    {/* protected route */}
    <Route element={<AuthRequire/>} >
    <Route path='welcome' element={<WelcomePage/>} />
    </Route>
    </Routes>
  );
}

export default App;
