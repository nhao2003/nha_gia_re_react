import { Route, Routes } from 'react-router-dom';
// import './templates/classic/assets/styles/App.css';
import DashboardPage from './modules/DashboardPage';
import DetailPage from './modules/Detail/DetailPage';
import HomePage from './modules/home/HomePage';
import NewsPage from './modules/news/NewPage';
import { OthersInformation } from './modules/personal/OthersInformation';
import { PersonalPage } from './modules/personal/PersonalPage';
import { SearchPage } from './modules/search/pages/SearchPage';
import SignIn from './modules/auth/SignIn';
import SignUp from './modules/auth/SignUp';
import DetailBlog from './modules/news/DetailBlog';
import PostManagement from './modules/postManagement/postManagement';
import PostCreate from './modules/postManagement/PostCreate';
import Package from './modules/package/Package';
import DetailedPackage from './modules/package/DetailedPackage';
import PaymentResult from './modules/package/PaymentResult';
import './assets/styles/index.css';
import Header from './components/Header';
import ClassicChatPage from './modules/chat/ClassicChatPage';
import ClassicAboutUsPage from './modules/aboutUs/page/ClassicAboutUsPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <DashboardPage>
            <HomePage />
          </DashboardPage>
        }
      />
      {/* public route */}

      <Route
        index
        element={
          <DashboardPage>
            <HomePage />
          </DashboardPage>
        }
      />
      <Route
        path='/personal'
        element={
          <DashboardPage>
            <PersonalPage />
          </DashboardPage>
        }
      />

      <Route
        path='/otheruser'
        element={
          <DashboardPage>
            <OthersInformation />
          </DashboardPage>
        }
      />
      <Route
        path='/search'
        element={
          <DashboardPage>
            <SearchPage />
          </DashboardPage>
        }
      />

      <Route
        path='/search/:id'
        element={
          <DashboardPage>
            <SearchPage />
          </DashboardPage>
        }
      />

      <Route
        path='/details/:id'
        element={
          <DashboardPage>
            <DetailPage />
          </DashboardPage>
        }
      />
      <Route
        path='/news'
        element={
          <DashboardPage>
            <NewsPage />
          </DashboardPage>
        }
      />
      <Route
        path='/news/:id'
        element={
          <DashboardPage>
            <DetailBlog />
          </DashboardPage>
        }
      />
      <Route
        path='/post_management'
        element={
          <DashboardPage>
            <PostManagement />
          </DashboardPage>
        }
      />
      <Route
        path='/post_create'
        element={
          <DashboardPage>
            <PostCreate />
          </DashboardPage>
        }
      />

      <Route path='login' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />

      <Route
        path='/package'
        element={
          <DashboardPage>
            <Package />
          </DashboardPage>
        }
      />

      <Route
        path='/package/:id'
        element={
          <DashboardPage>
            <DetailedPackage />
          </DashboardPage>
        }
      />

      <Route
        path='/transaction/:id'
        element={
          <DashboardPage>
            <PaymentResult />
          </DashboardPage>
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
            <ClassicChatPage />
          </div>
        }
      />

      <Route
        path='/about-us'
        element={
          <DashboardPage>
            <ClassicAboutUsPage />
          </DashboardPage>
        }
      />
    </Routes>
  );
}

export default App;
