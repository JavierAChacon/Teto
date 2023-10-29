import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Spinner from '../components/Spinner'

const ProtectedRoute = () => {
  const { auth, isLoading } = useAuth()
  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
        {auth._id ? (
          <main>
            <Outlet />
          </main>
        ) : (
          <Navigate to='/' />
        )}
      </>
    )
  }
}

export default ProtectedRoute
