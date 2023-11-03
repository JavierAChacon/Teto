import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../../config/axiosClient.js'
import Alert from '../../components/Alert'

const ConfirmAccount = () => {
  const { token } = useParams()
  const [alert, setAlert] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axiosClient(`/users/confirm/${token}`)
        setAlert({
          msg: data.msg,
          error: false
        })
        setTimeout(() => {
          navigate('/')
        }, [1000])
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount()
  }, [])
  const { msg } = alert
  return (
    <div className='min-h-screen bg-blue-100 p-[5%] md:p-0'>
      <div className='registerImage flex h-60 flex-col justify-center overflow-hidden rounded-t-lg px-[5%] pt-6 text-center text-white md:h-[30rem] md:rounded-none xl:h-[22rem]'>
        <h1 className='text-5xl font-bold md:text-6xl'>Confirm your account</h1>
        <p className='mt-3 md:text-xl'>Start to manage your projects</p>
      </div>
      <div>{msg && <Alert alert={alert} />}</div>
    </div>
  )
}

export default ConfirmAccount
