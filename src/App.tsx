import { Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';

import AuthRequire from './features/authRequire';
import WelcomePage from './features/Welcome';
import DashboardPage from './modules/DashboardPage';
import { PersonalPage } from './modules/personal/PersonalPage';
import SignIn from './modules/auth/SignIn';
import SignUp from './modules/auth/SignUp';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      {/* public route */}
      <Route index element={<DashboardPage />} />
      <Route path='login' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />

      <Route path='personal_information' element={<PersonalPage />} />

      {/* protected route */}
      <Route element={<AuthRequire />}>
        <Route path='welcome' element={<WelcomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
