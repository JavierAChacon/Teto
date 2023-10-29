import { createContext, useEffect, useState } from 'react'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setIsLoading(false)
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axiosClient('/users/profile', config)
        setAuth(data)
        navigate('/projects')
      } catch (error) {
        setAuth({})
      } finally {
        setIsLoading(false)
      }
    }
    authenticateUser()
  }, [navigate])
  return (
    <AuthContext.Provider value={{ setAuth, auth, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext
