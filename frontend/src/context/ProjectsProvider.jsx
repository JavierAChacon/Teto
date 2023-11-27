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
  const [modalFormTask, setModalFormTask] = useState(false)
  const [task, setTask] = useState({})
  const [modalDeleteTask, setModalDeleteTask] = useState(false)
  const [search, setSearch] = useState('')
  const [projectsFiltered, setProjectsFiltered] = useState([])

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
          setProjectsFiltered([projects])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getProjects()
  }, [auth])

  useEffect(() => setProjectsFiltered(projects), [projects])

  const submitProjects = async (project) => {
    const token = sessionStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const createProject = async (project) => {
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

    const updateProject = async (project) => {
      try {
        const { data } = await axiosClient.put(
          `/projects/${project.id}`,
          project,
          config
        )
        const updatedProjects = projects.map((projectState) =>
          projectState._id === data._id ? data : projectState
        )
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

  const getProject = async (id) => {
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
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      navigate('/')
    }
  }

  const deleteProject = async (id) => {
    const token = sessionStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    if (token) {
      try {
        const { data } = await axiosClient.delete(`/projects/${id}`, config)
        const updatedProjects = projects.filter(
          (projectState) => projectState._id !== id
        )
        setProjects(updatedProjects)
        setAlert({
          msg: data.msg,
          error: false
        })
        setTimeout(() => {
          navigate('/projects')
        }, 1000)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleModalTask = () => {
    setModalFormTask(!modalFormTask)
  }

  const submitTask = async (task) => {
    const token = sessionStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    if (task.id) {
      const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config)

      const updatedProject = { ...project }
      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      )
      setProject(updatedProject)
      setAlert({})
    } else {
      try {
        const { data } = await axiosClient.post('/tasks', task, config)
        const updatedProject = { ...project }
        updatedProject.tasks = [...project.tasks, data]
        setProject(updatedProject)
      } catch (error) {
        console.log(error)
      }
    }
    setModalFormTask(false)
  }

  const handleEditTaskModal = (task) => {
    setTask(task)
    setModalFormTask(true)
  }

  const handleDeleteTaskModal = (task) => {
    setTask(task)
    setModalDeleteTask(!modalDeleteTask)
  }

  const deleteTask = async () => {
    const token = sessionStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const { data } = await axiosClient.delete(`/tasks/${task._id}`, config)
      setAlert({ msg: data.msg, error: true })
      setTimeout(() => setAlert({}), [1100])
      const updatedProject = { ...project }
      updatedProject.tasks = updatedProject.tasks.filter(
        (taskState) => taskState._id === data._id
      )
      setProject(updatedProject)
      setModalDeleteTask(false)
      setTask({})
    } catch (error) {
      console.log(error)
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
        isLoading,
        deleteProject,
        modalFormTask,
        handleModalTask,
        submitTask,
        handleEditTaskModal,
        task,
        handleDeleteTaskModal,
        modalDeleteTask,
        deleteTask,
        setSearch,
        search,
        projectsFiltered,
        setProjectsFiltered
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export { ProjectsProvider }

export default ProjectsContext
