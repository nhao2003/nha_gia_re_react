import { Route, Routes } from 'react-router-dom';
import { ModernDashboardPage } from './modules/profile/pages/ModernDashboardPage';
import { ModernHomePage } from './modules/home/ModernHomePage';
import { ModernDetailPage } from './modules/detail/ModernDetailPage';
import ModernSignInPage from './modules/auth/ModernSignInPage';
import ModernSignUpPage from './modules/auth/ModernSignUpPage';
import ModernForgotPassword from './modules/auth/ModernForgotPassword';
import ModernUpdateProfile from './modules/auth/UpdateProfile/ModenUpdateProfile';
import { ProfilePage } from './modules/profile/components/profilePage';
import MordernBlogPage from './modules/blogs/mordernBlogPage';
import ModernDetailBlogPage from './modules/blogs/modernDetailBlog';
import ModernPackageListPage from './modules/purchase/page/ModernPackageListPage';
import MordenCurrentPackagePage from './modules/purchase/page/ModernCurrentPackagePage';
import PostCreate from './modules/createpost/PostCreate';
import { ModernOthersInformation } from './modules/profileOther/ModernOthersInformation';
import { ModernSearchPage } from './modules/search/page/ModernSearchPage';
import ModernChatPage from './modules/chat/ModernChatPage';
import ModernPostManagement from './modules/postManagement/ModernPostManagement';
import MordenChoosePackagePage from './modules/purchase/page/ModernChoosePackagePage';
import ModernResultTransactionPage from './modules/purchase/page/ModernResultTransactionPage';
import ModernHistoryTransactionPage from './modules/purchase/page/ModernHistoryTransactionPage';
import { Header } from './components/Header/Header';

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

      <Route
        path='/purchase'
        element={
          <ModernDashboardPage>
            <ModernPackageListPage />
          </ModernDashboardPage>
        }
      />

      <Route
        path='/purchase/current-package'
        element={
          <ModernDashboardPage>
            <MordenCurrentPackagePage />
          </ModernDashboardPage>
        }
      />

      <Route
        path='/purchase/choose-package'
        element={
          <ModernDashboardPage>
            <MordenChoosePackagePage />
          </ModernDashboardPage>
        }
      />

      <Route
        path='/purchase/result'
        element={
          <ModernDashboardPage>
            <ModernResultTransactionPage isSuccess={true} />
          </ModernDashboardPage>
        }
      />

      <Route
        path='/purchase/history'
        element={
          <ModernDashboardPage>
            <ModernHistoryTransactionPage />
          </ModernDashboardPage>
        }
      />

      <Route
        path='/chat/:id?'
        element={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              maxHeight: '100vh',
              // overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                zIndex: 1000,
              }}
            >
              <Header />
            </div>
            <ModernChatPage />
          </div>
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
