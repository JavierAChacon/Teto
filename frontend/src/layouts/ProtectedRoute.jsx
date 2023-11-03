import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.jsx'
import Spinner from '../components/Spinner.jsx'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'

const ProtectedRoute = () => {
  const { auth, isLoading } = useAuth()

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
        {auth._id
          ? (
            <div>
              <Header />
              <div className='md:flex md:min-h-screen'>
                <Sidebar />
                <main className='flex-1 bg-purple-100'>
                  <Outlet />
                </main>
              </div>
            </div>
            )
          : (
            <Navigate to='/' />
            )}
      </>
    )
  }
}

export default ProtectedRoute
