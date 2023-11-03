import { useContext } from 'react'
import AuthContext from '../context/AuthPovider'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
