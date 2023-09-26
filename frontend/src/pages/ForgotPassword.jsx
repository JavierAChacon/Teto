import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className='min-h-screen bg-blue-100 p-[5%] md:p-0'>
      <div className='registerImage flex h-60 flex-col justify-center overflow-hidden rounded-t-lg px-[5%] pt-6 text-center text-white md:rounded-none md:h-[30rem] xl:h-[22rem]'>
        <h1 className='text-5xl font-bold md:text-6xl'>Recover your access</h1>
        <p className='md:text-xl mt-3'>Don't loose your projects</p>
      </div>
      <form className='mx-auto flex flex-col gap-y-2 rounded-b-lg bg-white p-3 md:w-[30rem] md:rounded-lg md:relative md:bottom-20 md:gap-y-3 md:text-normal md:text-lg '>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            className='w-full rounded-lg border-2 p-1'
            id='email'
            type='email'
            placeholder='Enter your email'
          />
        </div>
        <input
          className='mx-auto  my-1 w-[40%] rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 py-1 text-lg text-white'
          type='submit'
          value='Send instructions'
        />
        <nav className='flex flex-col'>
          <Link to='/'>
            Are you already have an account?{' '}
            <span className='text-sky-500'>Sign in</span>
          </Link>
        </nav>
      </form>
    </div>
  )
}

export default ForgotPassword
