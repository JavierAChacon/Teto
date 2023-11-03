import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient.js'
import useAuth from '../hooks/useAuth.jsx'

const ProjectsContext = createContext()

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [alert, setAlert] = useState({})
  const [project, setProject] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { auth } = useAuth()

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = sessionStorage.getItem('token')
        if (token) {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
          const { data } = await axiosClient('/projects', config)
          setProjects(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getProjects()
  }, [auth])

  const submitProjects = async project => {
    const token = sessionStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const createProject = async project => {
      try {
        const { data } = await axiosClient.post('/projects', project, config)
        setProjects([...projects, data.storedProject])
        setAlert({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    const updateProject = async project => {
      try {
        const { data } = await axiosClient.put(`/projects/${project.id}`, project, config)
        const updatedProjects = projects.map(projectState => projectState._id === data._id ? data : projectState)
        setProjects(updatedProjects)
        setAlert({
          msg: 'Project edited successfully',
          error: false
        })
        setProject(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (token && project.id) {
      await updateProject(project)
    } else if (token) {
      await createProject(project)
    } else {
      navigate('/')
    }
    setTimeout(() => navigate('/projects'), [2000])
  }

  const getProject = async id => {
    const token = sessionStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    if (token) {
      try {
        const { data } = await axiosClient(`/projects/${id}`, config)
        setProject(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      navigate('/')
    }
  }

  return (
    <ProjectsContext.Provider
      value={{
        setProjects,
        projects,
        setAlert,
        alert,
        submitProjects,
        getProject,
        project,
        isLoading
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export { ProjectsProvider }

export default ProjectsContext
