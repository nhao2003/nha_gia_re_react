import { Route, Routes } from 'react-router-dom';
import { ModernDashboardPage } from './modern/modules/profile/pages/ModernDashboardPage';
import { ModernHomePage } from './modern/modules/home/ModernHomePage';
import { ModernDetailPage } from './modern/modules/detail/ModernDetailPage';
import ModernSignInPage from './modern/modules/auth/ModernSignInPage';
import ModernSignUpPage from './modern/modules/auth/ModernSignUpPage';
import ModernForgotPassword from './modern/modules/auth/ModernForgotPassword';
import ModernUpdateProfile from './modern/modules/auth/UpdateProfile/ModenUpdateProfile';
import { ProfilePage } from './modern/modules/profile/components/profilePage';
import ModernPostManagement from './modern/modules/postManagement/ModernPostManagement';
import MordernBlogPage from './modern/modules/blogs/mordernBlogPage';
import ModernDetailBlogPage from './modern/modules/blogs/modernDetailBlog';
import PostCreate from './modern/modules/createpost/PostCreate';
import { ModernSearchPage } from './modern/modules/search/page/ModernSearchPage';
import { ModernOthersInformation } from './modern/modules/profileOther/ModernOthersInformation';
function App(): JSX.Element {
  return (

    <Routes>
      <Route path='/signin' element={<ModernSignInPage />} />
      <Route path='/signup' element={<ModernSignUpPage />} />
      <Route path='/forgot-password' element={<ModernForgotPassword />} />
      <Route path='/auth-update-profile' element={<ModernUpdateProfile />} />

      <Route
        path='/'
        element={
          <ModernDashboardPage>
            <ModernHomePage />
          </ModernDashboardPage>
        }
      />
      {/* public route */}
      <Route
        path='/profile'
        element={
          <ModernDashboardPage>
            <ProfilePage />
          </ModernDashboardPage>
        }
      />
      <Route
        path='/details/:id'
        element={
          <ModernDashboardPage>
            <ModernDetailPage />
          </ModernDashboardPage>
        }
      />

      <Route
        path='/profile'
        element={
          <ModernDashboardPage>
            <ProfilePage />
          </ModernDashboardPage>
        }
      />

      <Route
        path='/post-management'
        element={
          <ModernDashboardPage>
            <ModernPostManagement />
          </ModernDashboardPage>
        }
      />
      <Route
        path='/blogs'
        element={
          <ModernDashboardPage>
            <MordernBlogPage />
          </ModernDashboardPage>
        }
      />
      <Route
        path='/blogs/:id'
        element={
          <ModernDashboardPage>
            <ModernDetailBlogPage />
          </ModernDashboardPage>
        }
      />
      <Route
        path='/create-post'
        element={
          <ModernDashboardPage>
            <PostCreate />
          </ModernDashboardPage>
        }
      />
      <Route
        path='/user/:id'
        element={
          <ModernDashboardPage>
            <ModernOthersInformation />
          </ModernDashboardPage>
        }
      />

      <Route
      path='/search'
      element={
        <ModernDashboardPage>
          <ModernSearchPage />
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
