import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import { AuthProvider } from './context/AuthPovider'
import Projects from './pages/Projects'
import ProtectedRoute from './layouts/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/new-password/:token' element={<NewPassword />} />
            <Route path='/confirm/:token' element={<ConfirmAccount />} />
          </Route>
          <Route path='/projects' element={<ProtectedRoute />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
