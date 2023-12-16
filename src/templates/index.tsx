import { Route, Routes } from 'react-router-dom';
import { ModernDashboardPage } from './modern/modules/ModernDashboardPage';
import { ModernHomePage } from './modern/modules/home/ModernHomePage';
import HomePage from './classic/modules/home/HomePage';
import { ModernDetailPage } from './modern/modules/detail/ModernDetailPage';
import ModernSignInPage from './modern/modules/auth/ModernSignInPage';
import ModernSignUpPage from './modern/modules/auth/ModernSignUpPage';
import ModernForgotPassword from './modern/modules/auth/ModernForgotPassword';
import ModernUpdateProfile from './modern/modules/auth/UpdateProfile/ModenUpdateProfile';
import { ProfilePage } from './modern/modules/profile/profilePage';
import  ModernPostManagement  from './modern/modules/postManagement/ModernPostManagement';
function App(): JSX.Element {
  return (
    <ModernDashboardPage>
      <Routes>
        <Route
          path='/'
          element={

            <ModernHomePage
            />

          }
        />
        {/* public route */}
        <Route path='/profile' element={<ProfilePage />} />
        <Route
          path='/details'
          element={
            <ModernDashboardPage>
              <ModernDetailPage />
            </ModernDashboardPage>
          }
        />

        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/signin' element={<ModernSignInPage />} />
        <Route path='/signup' element={<ModernSignUpPage />} />
        <Route path='/forgot-password' element={<ModernForgotPassword />} />
        <Route path='/auth-update-profile' element={<ModernUpdateProfile />} />
        <Route path='/post-management' element={<ModernPostManagement />} />

        {/* protected route */}
        {/* <Route element={<AuthRequire />}>
        <Route path='welcome' element={<WelcomePage />} />
      </Route> */}
      </Routes>
    </ModernDashboardPage>
  );
}

export default App;
