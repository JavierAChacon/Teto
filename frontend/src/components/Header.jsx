import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className='border-b bg-white px-4 py-5'>
      <div className='md:flex md:items-center md:justify-between'>
        <h2 className='logo'>Teto</h2>
        <input
          type='search'
          placeholder='Search Project'
          className='block rounded-lg border p-2 lg:w-96'
        />
        <div>
          <Link to='/projects' className='font-bold uppercase'>
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
