import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth.jsx'

const Sidebar = () => {
  const { auth } = useAuth()
  const { name } = auth
  return (
    <aside className='px-5 py-10 md:w-80 lg:w-90 bg-white border-r'>
      <p className='text-xl font-medium'>Hola: {name}</p>
      <Link to='/projects/new' className='bg-sky-500 p-2 text-white rounded-lg text-xl w-full block mt-5 text-center'>New Project</Link>
    </aside>
  )
}

export default Sidebar
