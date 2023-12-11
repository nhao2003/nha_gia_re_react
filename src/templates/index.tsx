import { Route, Routes } from 'react-router-dom';
import { ModernDashboardPage } from './modern/modules/ModernDashboardPage';
import { ModernHomePage } from './modern/modules/home/modern_home_page';
import { ProfilePage } from './modern/modules/profile/profile_page';
import HomePage from './classic/modules/home/HomePage';
import ModernSignInPage from './modern/modules/auth/ModernSignInPage';
import ModernSignUpPage from './modern/modules/auth/ModernSignUpPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ModernDashboardPage>
            <ModernHomePage />
          </ModernDashboardPage>
        }
      />
      {/* public route */}

      <Route path='/' element={<ModernHomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/signin' element={<ModernSignInPage />} />
      <Route path='/signup' element={<ModernSignUpPage />} />

      {/* protected route */}
      {/* <Route element={<AuthRequire />}>
        <Route path='welcome' element={<WelcomePage />} />
      </Route> */}
    </Routes>
  );
}

export default App;
