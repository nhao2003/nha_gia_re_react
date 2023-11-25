import { Route, Routes } from 'react-router-dom'
import './assets/styles/App.css'
import SignInPage from './modules/auth/SignInPage'
import AuthRequire from './features/authRequire'
import WelcomePage from './features/Welcome'
import DashboardPage from './modules/DashboardPage'
import { PersonalPage } from './modules/personal/PersonalPage'
import { Fragment } from 'react'
import { OthersInformation } from './modules/personal/OthersInformation'
import { SearchPage } from './modules/search/pages/SearchPage'
import HomePage from './modules/home/HomePage'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage><HomePage /></DashboardPage>} />
      {/* public route */}
      <Route index element={<DashboardPage><HomePage /></DashboardPage>} />
      <Route path='/personal' element={<DashboardPage><PersonalPage /></DashboardPage>} />

      <Route path='/otheruser' element={<DashboardPage><OthersInformation /></DashboardPage>} />
      <Route path='/search' element={<DashboardPage><SearchPage /></DashboardPage>} />

      {/* protected route */}
      {/* <Route element={<AuthRequire />}>
        <Route path='welcome' element={<WelcomePage />} />
      </Route> */}
    </Routes>
  )
}

export default App
