import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import NewPassword from './pages/auth/NewPassword'
import ConfirmAccount from './pages/auth/ConfirmAccount'
import { AuthProvider } from './context/AuthPovider'
import Projects from './pages/projects/Projects'
import ProtectedRoute from './layouts/ProtectedRoute'
import NewProject from './pages/projects/NewProject'
import { ProjectsProvider } from './context/ProjectsProvider'
import ProjectDetail from './pages/projects/ProjectDetail'
import EditProject from './pages/projects/EditProject'

function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='new-password/:token' element={<NewPassword />} />
              <Route path='confirm/:token' element={<ConfirmAccount />} />
            </Route>

            <Route path='/projects' element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path='new' element={<NewProject />} />
              <Route path=':id' element={<ProjectDetail />} />
              <Route path='/projects/edit/:id' element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
