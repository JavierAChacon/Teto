import { formatDate } from '../helpers/formatDate'
import useProjects from '../hooks/useProjects'

const Task = ({ task }) => {
  const { description, priority, name, deliveryDate, state } = task
  const { handleEditTaskModal, handleDeleteTaskModal } = useProjects()
  return (
    <div className='relative flex items-center justify-between rounded-lg border-b bg-white p-2'>
      <div>
        <h4 className='font-bold'>{name}</h4>
        <p>{description}</p>
        <p>{priority}</p>
        <p>{formatDate(deliveryDate)}</p>
      </div>
      <div className='flex gap-x-2'>
        {state ? (
          <button
            type='button'
            className='rounded-lg bg-green-500 p-1 text-white'
          >
            Done
          </button>
        ) : (
          <button
            type='button'
            className='rounded-lg bg-blue-500 p-1 font-semibold text-white'
          >
            Undone
          </button>
        )}
        <button
          type='button'
          onClick={() => handleEditTaskModal(task)}
          className='rounded-lg border bg-gray-400 p-2 text-white'
        >
          Edit
        </button>
        <button onClick={() => handleDeleteTaskModal(task)}>Delete</button>
      </div>
    </div>
  )
}

export default Task
