import { Route, Routes } from 'react-router-dom';
import { ModernDashboardPage } from './modern/modules/ModernDashboardPage';
import { ModernHomePage } from './modern/modules/home/ModernHomePage';
import { ProfilePage } from './modern/modules/profile/profile_page';
import HomePage from './classic/modules/home/HomePage';
import { ModernDetailPage } from './modern/modules/detail/ModernDetailPage';

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
      <Route path='/profile' element={<ProfilePage />} />
      <Route
        path='/details'
        element={
          <ModernDashboardPage>
            <ModernDetailPage />
          </ModernDashboardPage>
        }
      />

      {/* protected route */}
      {/* <Route element={<AuthRequire />}>
        <Route path='welcome' element={<WelcomePage />} />
      </Route> */}
    </Routes>
  );
}

export default App;
