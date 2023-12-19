
import { Route, Routes } from 'react-router-dom'

import DashboardPage from './modules/DashboardPage'
import DetailPage from './modules/Detail/DetailPage'
import HomePage from './modules/home/HomePage'
import NewsPage from './modules/news/NewPage'
import { OthersInformation } from './modules/personal/OthersInformation'
import { PersonalPage } from './modules/personal/PersonalPage'
import { SearchPage } from './modules/search/pages/SearchPage'
import SignIn from './modules/auth/SignIn'
import SignUp from './modules/auth/SignUp'
import DetailBlog from './modules/news/DetailBlog'
import PostManagement from './modules/postManagement/postManagement'
import PostCreate from './modules/postManagement/PostCreate'




function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage><HomePage /></DashboardPage>} />
      {/* public route */}

      <Route index element={<DashboardPage><HomePage /></DashboardPage>} />
      <Route path='/personal' element={<DashboardPage><PersonalPage /></DashboardPage>} />

      <Route path='/otheruser' element={<DashboardPage><OthersInformation /></DashboardPage>} />
      <Route path='/search' element={<DashboardPage><SearchPage /></DashboardPage>} />
      <Route path='/details/:id' element={<DashboardPage><DetailPage /></DashboardPage>} />
      <Route path='/news' element={<DashboardPage><NewsPage /></DashboardPage>} />
      <Route path='/news/:id' element={<DashboardPage><DetailBlog /></DashboardPage>} />
      <Route path='/post_management' element={<DashboardPage><PostManagement /></DashboardPage>} />
      <Route path='/post_create' element={<DashboardPage><PostCreate /></DashboardPage>} />
      


      <Route path='login' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />



      {/* protected route */}
      {/* <Route element={<AuthRequire />}>
        <Route path='welcome' element={<WelcomePage />} />
      </Route> */}
    </Routes>
  );
}

export default App;
