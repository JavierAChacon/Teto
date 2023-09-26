import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-row-reverse'>
      <div className='flex h-screen w-full flex-col items-center justify-center bg-purple-50 sm:h-auto md:w-1/2 md:portrait:w-[95%]'>
        <h1 className='logo absolute top-[5%] md:hidden'>Teto</h1>
        <h2 className='relative bottom-10 w-1/2 text-4xl font-extrabold text-gray-600 max-md:text-center lg:inline max-lg:landscape:bottom-5'>
          Login
        </h2>
        <form className='flex w-full flex-col gap-y-3 max-md:p-[5%] md:w-1/2'>
          <div>
            <label className='block' htmlFor='email'>
              Email
            </label>
            <input
              className='w-full rounded-lg border-2 p-2'
              id='email'
              type='email'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label className='block' htmlFor='password'>
              Password
            </label>
            <input
              className='w-full rounded-lg border-2 p-2'
              id='password'
              type='password'
              placeholder='Enter your password'
            />
          </div>
          <Link to='forgot-password' className='my-2 mr-auto'>
            <span className='text-sky-500'>Forgot password?</span>
          </Link>
          <input
            type='submit'
            value='Sign in'
            className='mx-auto w-1/2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 py-1 text-lg text-white'
          />
        </form>
        <nav className='mt-4'>
          <Link to='register'>
            Don't have an account?{' '}
            <span className='font-bold text-indigo-500'>Register</span>
          </Link>
        </nav>
      </div>
      <div className='loginImage flex h-screen w-1/2 flex-col items-start justify-center overflow-hidden p-[5%] max-md:hidden'>
        <h1 className='logo absolute top-[5%]'>Teto</h1>
        <h2 className='text-9xl font-bold text-white max-lg:text-7xl portrait:hidden lg:text-8xl xl:text-9xl '>
          Welcome back!
        </h2>
      </div>
    </div>
  )
}

export default Login
