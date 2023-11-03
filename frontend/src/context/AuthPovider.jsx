import { createContext, useEffect, useState } from 'react'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authenticateUser = async () => {
      const token = sessionStorage.getItem('token')

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
      } catch (error) {
        setAuth({})
      } finally {
        setIsLoading(false)
      }
    }
    authenticateUser()
  }, [])
  return (
    <AuthContext.Provider value={{ setAuth, auth, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext
