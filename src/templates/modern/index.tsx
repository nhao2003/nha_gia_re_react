import { Route, Routes } from 'react-router-dom';
import { ModernDashboardPage } from './modules/profile/pages/ModernDashboardPage';
import { ModernHomePage } from './modules/home/ModernHomePage';
import HomePage from '../classic/modules/home/HomePage';
import { ModernDetailPage } from './modules/detail/ModernDetailPage';
import ModernSignInPage from './modules/auth/ModernSignInPage';
import ModernSignUpPage from './modules/auth/ModernSignUpPage';
import ModernForgotPassword from './modules/auth/ModernForgotPassword';
import ModernUpdateProfile from './modules/auth/UpdateProfile/ModenUpdateProfile';
import { ProfilePage } from './modules/profile/components/profilePage';
import ModernPostManagement from './modules/postManagement/ModernPostManagement';
import MordernBlogPage from './modules/blogs/mordernBlogPage';
import ModernDetailBlogPage from './modules/blogs/modernDetailBlog';
import MordernChatPage from './modules/chat/ModernChatPage';
import ModernPackageListPage from './modules/purchase/page/ModernPackageListPage';
import MordenCurrentPackagePage from './modules/purchase/page/ModernCurrentPagePage';
function App(): JSX.Element {
  return (
    <ModernDashboardPage>
      <Routes>
        <Route path='/' element={<ModernHomePage />} />
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
        <Route path='/blogs' element={<MordernBlogPage />} />
        <Route path='/blogs/:id' element={<ModernDetailBlogPage />} />

        <Route path='/chat' element={<MordernChatPage />} />
        <Route path='/purchase' element={<MordenCurrentPackagePage />} />
        {/* protected route */}
        {/* <Route element={<AuthRequire />}>
        <Route path='welcome' element={<WelcomePage />} />
      </Route> */}
      </Routes>
    </ModernDashboardPage>
  );
}

export default App;
