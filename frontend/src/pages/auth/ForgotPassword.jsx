import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../../components/Alert'
import axiosClient from '../../config/axiosClient.js'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'The email is required',
        error: true
      })
    }

    try {
      const { data } = await axiosClient.post('/users/forgot-password', {
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
  }

  const { msg } = alert

  return (
    <div className='min-h-screen bg-blue-100 p-[5%] md:p-0'>
      <div className='registerImage flex h-60 flex-col justify-center overflow-hidden rounded-t-lg px-[5%] pt-6 text-center text-white md:h-[30rem] md:rounded-none xl:h-[22rem]'>
        <h1 className='text-5xl font-bold  md:text-6xl'>Recover your access</h1>
        <p className='mt-3 md:text-xl'>Do not loose your projects</p>
      </div>
      <form
        className='md:text-normal mx-auto flex flex-col gap-y-2 rounded-b-lg bg-white p-3 md:relative md:bottom-20 md:w-[30rem] md:gap-y-3 md:rounded-lg md:text-lg'
        onSubmit={handleSubmit}
      >
        <div>
          {msg && <Alert alert={alert} />}
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
        <input
          className='mx-auto my-1 w-1/2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 py-1 text-lg text-white'
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
