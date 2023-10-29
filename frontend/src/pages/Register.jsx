import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/AxiosClient'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [alert, setAlert] = useState({})
  const { msg } = alert

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([name, email, password, repeatPassword].includes('')) {
      setAlert({
        msg: 'All the fields are required',
        error: true
      })
    }
    if (password !== repeatPassword) {
      setAlert({
        msg: 'Passwords do not match',
        error: true
      })
    }
    if (password.length < 7) {
      setAlert({
        msg: 'Password must have at least 8 characters',
        error: true
      })
    }

    // Create the user on the API
    try {
      const { data } = await axiosClient.post('/users', {
        name,
        password,
        email
      })

      setAlert({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

    if (!alert.error) {
      setName('')
      setEmail('')
      setPassword('')
      setPassword('')
      setRepeatPassword('')
    }
  }

  return (
    <div className='min-h-screen bg-blue-100 p-[5%] md:p-0'>
      <div className='registerImage flex h-60 flex-col justify-center overflow-hidden rounded-t-lg px-[5%] pt-6 text-center text-white md:h-[30rem] md:rounded-none xl:h-[22rem]'>
        <h2 className='text-5xl font-bold md:text-6xl'>Welcome!</h2>
        <p className='mt-3 md:text-xl'>
          Register and achieve your goals with project management
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className='md:text-normal mx-auto flex flex-col gap-y-2 rounded-b-lg bg-white p-3 md:relative md:bottom-20 md:w-[35rem] md:gap-y-3 md:rounded-lg md:text-lg'
      >
        {msg && <Alert alert={alert} />}
        <div>
          <label htmlFor='name'>Name</label>
          <input
            className='w-full rounded-lg border-2 p-1'
            id='name'
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            className='w-full rounded-lg border-2 p-1'
            id='email'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            className='w-full rounded-lg border-2 p-1'
            id='password'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='repeatPassword'>Repeat Password</label>
          <input
            className='w-full rounded-lg border-2 p-1'
            id='repeatPassword'
            type='password'
            placeholder='Repeat your password'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <input
          className='mx-auto  my-1 w-1/2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 py-1 text-lg text-white'
          type='submit'
          value='Create account'
        />
        <nav className='flex flex-col'>
          <Link to='/'>
            Are you already have an account?{' '}
            <span className='text-sky-500'>Sign in</span>
          </Link>
          <Link to='forgot-password'>
            <span className='text-sky-500'>Forgot password?</span>
          </Link>
        </nav>
      </form>
    </div>
  )
}

export default Register
