import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axiosClient from '../config/AxiosClient.jsx'
import Alert from '../components/Alert.jsx'

const NewPassword = () => {
  const params = useParams()

  const { token } = params

  const [isValidToken, setIsValidToken] = useState(false)

  const [alert, setAlert] = useState({})

  const [newPassword, setNewPassword] = useState('')

  const [isPasswordModified, setIsPasswordModified] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`)
        setIsValidToken(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    verifyToken()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword.length < 6) {
      setAlert({
        msg: 'The password must contain at least 6 characters',
        error: true
      })
    }

    try {
      const { data } = await axiosClient.post(
        `/users/forgot-password/${token}`,
        { password: newPassword }
      )
      setAlert({
        msg: data.msg,
        error: false
      })
      setIsPasswordModified(true)
      setTimeout(() => {
        navigate('/')
      }, [1200])
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
        <h1 className='text-5xl font-bold md:text-6xl'>Recover your access</h1>
        <p className='mt-3 md:text-xl'>Set a new password</p>
      </div>
      {msg && <Alert alert={alert} />}
      {isValidToken && (
        <form
          className={`md:text-normal mx-auto flex flex-col gap-y-2 rounded-b-lg bg-white p-3 md:relative md:bottom-20 md:w-[35rem] md:gap-y-3 md:rounded-lg md:text-lg ${
            isPasswordModified && 'hidden'
          }`}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor='password'>Password</label>
            <input
              className='w-full rounded-lg border-2 p-1'
              id='password'
              type='password'
              placeholder='Enter your new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <input
            className='mx-auto  my-1 w-1/2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 py-1 text-lg text-white'
            type='submit'
            value='Set new password'
          />

          {isPasswordModified && (
            <nav className='mx-auto flex w-max flex-col rounded-lg bg-white p-2 text-center '>
              <Link to='/'>
                Are you already have an account?{' '}
                <span className='text-sky-500'>Sign in</span>
              </Link>
            </nav>
          )}
        </form>
      )}
    </div>
  )
}

export default NewPassword
