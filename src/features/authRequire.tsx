import { useSelector } from 'react-redux'
import { selectCurrentAccessToken } from './authSlice'
import { Outlet, useLocation, Navigate } from 'react-router-dom'

const AuthRequire = () => {
  const location = useLocation()
  const accessToken = useSelector(selectCurrentAccessToken)
  return accessToken !== null ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to='/login' />
  )
}

export default AuthRequire
