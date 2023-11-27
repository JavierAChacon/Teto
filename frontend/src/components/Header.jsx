import { Link, useNavigate } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import { useEffect } from 'react'

const Header = () => {
  const navigate = useNavigate()
  const { setSearch, search, setProjectsFiltered, projects } = useProjects()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/projects')
  }

  useEffect(() => {
    setProjectsFiltered(
      projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  return (
    <header className='border-b bg-white px-4 py-5'>
      <div className='md:flex md:items-center md:justify-between'>
        <h2 className='logo'>
          <Link to='/projects'>Teto</Link>
        </h2>
        <form onSubmit={handleSubmit} className='flex items-center'>
          <input
            type='text'
            placeholder='Search Project'
            className='block h-10 rounded-lg border p-2 text-sm lg:w-96'
            value={search}
            onInput={(e) => setSearch(e.target.value)}
          />
          <input
            type='submit'
            value='Search'
            className='block w-24 rounded-lg bg-sky-600 p-2 text-white transition-colors hover:bg-sky-700'
          />
        </form>
        <div>
          <Link
            to='/projects'
            onClick={() => setSearch('')}
            className='font-bold uppercase'
          >
            Projects
          </Link>
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
