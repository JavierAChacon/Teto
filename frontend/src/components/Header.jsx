import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useProjects from "../hooks/useProjects"
import axiosClient from '../config/axiosClient'


const Header = () => {
  const navigate = useNavigate()
  const [ search, setSearch ] = useState('')
  const {setProjects, projects } = useProjects()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/projects')
    const projectsFiltered = search === '' ? [] : projects.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))
    setProjects(projectsFiltered)
    console.log(search)
  }


  const handleClick = async (e) => {
    e.preventDefault()
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
    }
  }

  return (
    <header className='border-b bg-white px-4 py-5'>
      <div className='md:flex md:items-center md:justify-between'>
        <h2 className='logo'><Link to='/projects'>Teto</Link></h2>
        <form onSubmit={handleSubmit} className='items-center flex'>
          <input
            type='text'
            placeholder='Search Project'
            className='block rounded-lg border p-2 lg:w-96 text-sm h-10'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type='submit'
            value='Search'
            className='block w-24 rounded-lg bg-sky-600 p-2 text-white transition-colors hover:bg-sky-700'
          />
        </form>
        <div>
          <button onClick={handleClick}>

          <Link to='/projects' className='font-bold uppercase'>
            Projects
          </Link>
          </button>
          <button
            type='button'
            className='ml-6 rounded-lg bg-red-500 p-2 text-sm font-bold uppercase text-white'
            onClick={() => {
              sessionStorage.removeItem('token')
              navigate('/')
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
