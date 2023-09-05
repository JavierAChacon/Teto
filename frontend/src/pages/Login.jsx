import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-row-reverse'>
      <div className='flex h-screen sm:h-auto w-full md:w-1/2 md:portrait:w-[95%] flex-col items-center justify-center bg-purple-50'>
        <h1 className='md:hidden logo absolute top-[5%]'>Teto</h1>
        <h2 className='relative bottom-10 w-1/2 text-4xl font-extrabold text-gray-600 max-md:text-center md:hidden lg:inline'>
          Login
        </h2>
        <form className='flex md:w-1/2 w-full flex-col gap-y-3 max-md:p-[5%]'>
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
          <Link to='forgot-password' className='mr-auto my-2'>
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
        <h2 className='text-9xl font-bold text-white md:hidden xl:text-9xl lg:text-8xl '>Welcome back!</h2>
      </div>
    </div>
  )
}

export default Login
