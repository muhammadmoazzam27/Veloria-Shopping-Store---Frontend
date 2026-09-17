import { useAuthContext } from '@/hooks/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ Component }) => {

  const { isAuth } = useAuthContext();

  return (
    <>
      {
        isAuth ?
          <Component />
          :
          <Navigate to="/auth/login" />
      }
    </>
  )
}

export default ProtectedRoutes