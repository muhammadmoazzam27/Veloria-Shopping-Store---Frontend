import { Navigate, Route, Routes } from 'react-router-dom'

import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from '@/hooks/AuthContext'
import ProtectedRoutes from '@/Private/ProtectedRoutes'

const Index = () => {

  const { isAuth } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
        <Route path='/dashboard/*' element={<ProtectedRoutes Component={Dashboard} />} />
      </Routes>
    </>
  )
}

export default Index