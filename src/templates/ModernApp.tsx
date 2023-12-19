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
import { Adsense } from '@ctrl/react-adsense';
import { ModernSearchPage } from './modern/modules/search/page/ModernSearchPage';
import { ModernOthersInformation } from './modern/modules/profileOther/ModernOthersInformation';
function App(): JSX.Element {
  return (
    <ModernDashboardPage>
      <Adsense client='ca-pub-6296322788342979' slot='3475600179' />
      <Routes>
        <Route path='/' element={<ModernHomePage />} />
        {/* public route */}
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/user/:id' element={<ModernOthersInformation />} />
        <Route path='/details/:id' element={<ModernDetailPage />} />
        <Route path='/search' element={<ModernSearchPage />} />
        <Route path='/signin' element={<ModernSignInPage />} />
        <Route path='/signup' element={<ModernSignUpPage />} />
        <Route path='/forgot-password' element={<ModernForgotPassword />} />
        <Route path='/auth-update-profile' element={<ModernUpdateProfile />} />
        <Route path='/post-management' element={<ModernPostManagement />} />
        <Route path='/blogs' element={<MordernBlogPage />} />
        <Route path='/blogs/:id' element={<ModernDetailBlogPage />} />
        <Route path='/create-post' element={<PostCreate />} />

        {/* protected route */}
        {/* <Route element={<AuthRequire />}>
        <Route path='welcome' element={<WelcomePage />} />
      </Route> */}
      </Routes>
    </ModernDashboardPage>
  );
}

export default App;
