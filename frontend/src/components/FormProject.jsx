import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects.jsx'
import Alert from '../components/Alert.jsx'

const FormProject = () => {
  const [id, setId] = useState(null)
  const params = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [client, setClient] = useState('')
  const { setAlert, alert, submitProjects, project } = useProjects()

  useEffect(() => {
    if (params.id) {
      setId(project._id)
      setName(project.name)
      setDescription(project.description)
      setDeliveryDate(project.deliveryDate?.split('T')[0])
      setClient(project.client)
    }
  }, [params, project._id, project.name, project.description, project.deliveryDate, project.client])

  const handleSubmit = async e => {
    e.preventDefault()
    if ([name, description, deliveryDate, client].includes('')) {
      setAlert({
        msg: 'All the fields are required',
        error: true
      })
    }
    await submitProjects({ id, name, description, deliveryDate, client })
    setTimeout(() => {
      setId(null)
      setAlert({})
      setName('')
      setDescription('')
      setDeliveryDate('')
      setClient('')
    }, 2000)
  }
  const { msg } = alert

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto w-1/2 rounded-lg bg-white p-8 shadow-xl'
    >
      {msg && <Alert alert={alert} className='transition-all' />}
      <div>
        <label htmlFor='name' className='block text-xl'>
          Name:
        </label>
        <input
          required
          id='name'
          type='text'
          placeholder='How will your project named?'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='text-md w-full rounded-md border-2 p-1'
        />
      </div>
      <div className='mt-2'>
        <label htmlFor='description' className='block text-xl'>
          Description:
        </label>
        <textarea
          required
          id='description'
          placeholder='What is your project about?'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='text-md w-full rounded-md border-2 p-1'
        />
      </div>
      <div className='mt-2'>
        <label htmlFor='delivery-date' className='block text-xl'>
          Delivery Date:
        </label>
        <input
          required
          id='delivery-date'
          type='date'
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className='text-md w-full rounded-md border-2 p-1'
        />
      </div>
      <div className='mt-2'>
        <label htmlFor='client-name' className='block text-xl'>
          Name of Client:
        </label>
        <input
          required
          id='client-name'
          type='text'
          placeholder='Who will recieve the project'
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className='text-md w-full rounded-md border-2 p-1'
        />
      </div>
      <input
        type='submit'
        value={id ? 'Update Project' : 'New Project'}
        className='mx-auto mt-5 block w-32 rounded-lg bg-sky-600 p-2 text-white transition-colors hover:bg-sky-700'
      />
    </form>
  )
}

export default FormProject
