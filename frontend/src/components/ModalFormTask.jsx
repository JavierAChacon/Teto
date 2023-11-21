import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProjects from '../hooks/useProjects'
import Alert from '../components/Alert'
import { useParams } from 'react-router-dom'

const PRIORITY = ['Low', 'Medium', 'High']

const ModalFormTask = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const { modalFormTask, handleModalTask, alert, setAlert, submitTask, task } = useProjects()
  const params = useParams()

  useEffect(() => {
    if(task?.deliveryDate){
      setId(task._id)
      setName(task.name)
      setDescription(task.description)
      setDeliveryDate(task.deliveryDate.split('T')[0])
      setPriority(task.priority)
    }else{
      setId('')
      setName('')
      setDescription('')
      setDeliveryDate('')
      setPriority('')
    }
  }, [task])
  
  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, description, deliveryDate, priority].includes('')) {
      setAlert({
        msg: 'All the fields are required',
        error: true
      })
    }
   await submitTask({ id, name, description, deliveryDate, priority, project: params.id })
    

   setId('')
   setName('')
   setDescription('')
   setPriority('')
   setDeliveryDate('')
  }

  const { msg } = alert

  return (
    <Transition.Root show={modalFormTask} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={handleModalTask}
      >
        <div className='flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
              <div className='absolute right-0 top-0 hidden pr-4 pt-4 sm:block'>
                <button
                  type='button'
                  className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  onClick={handleModalTask}
                >
                  <span className='sr-only'>Cerrar</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>

              <div className='sm:flex sm:items-start'>
                <div className='mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-bold leading-6 text-sky-600'
                  >
                    {id ? 'Edit task' : 'Create task'}
                  </Dialog.Title>
                  {msg && <Alert alert={alert} />}
                  <form onSubmit={handleSubmit} className='my-10'>
                    <div className='mb-5'>
                      <label htmlFor='name' className='font-bold text-gray-700'>
                        Task Name:
                      </label>
                      <input
                        id='name'
                        type='text'
                        placeholder='Name of the task'
                        className='block w-full rounded-md border p-1 placeholder-gray-400'
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-5'>
                      <label
                        htmlFor='description'
                        className='font-bold text-gray-700'
                      >
                        Description:
                      </label>
                      <input
                        id='description'
                        type='text'
                        placeholder='Description of the task'
                        className='block w-full rounded-md border p-1 placeholder-gray-400'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </div>
                    <div className='mb-5'>
                      <label htmlFor='delivery-date' className='font-bold text-gray-700'>
                        Delivery Date:
                      </label>
                      <input
                        id='delivery-date'
                        type='date'
                        className='block w-full rounded-md border p-1 placeholder-gray-400'
                        value={deliveryDate}
                        onChange={e => setDeliveryDate(e.target.value)}
                      />
                    </div>
                    <div className='mb-5'>
                      <label
                        htmlFor='priority'
                        className='font-bold text-gray-700'
                      >
                        Priority:
                      </label>
                      <select
                        id='priority'
                        type='text'
                        className='block w-full rounded-md border p-1 placeholder-gray-400'
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                      >
                        <option>-- Select --</option>
                        {PRIORITY.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type='submit'
                      value={id ? 'Edit task' : 'Create task'}
                      className='mx-auto block cursor-pointer rounded-md bg-sky-600 p-1 text-white transition-colors hover:bg-sky-700'
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalFormTask
