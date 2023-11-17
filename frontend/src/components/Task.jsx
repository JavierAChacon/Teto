import { formatDate } from "../helpers/formatDate"

const Task = ({ task }) => {
  const { description, priority, name, deliveryDate, state } = task
  return (
    <div className='relative flex items-center rounded-lg border-b bg-white p-2 justify-between'>
      <div>
        <h4 className='font-bold'>{name}</h4>
        <p>{description}</p>
        <p>{priority}</p>
        <p>{formatDate(deliveryDate)}</p>
      </div>
      <div className='flex gap-x-2'>
        {state ? <button className="p-1 bg-green-500 rounded-lg text-white">Done</button> : <button className="p-1 bg-blue-500 rounded-lg text-white font-semibold">Undone</button>}
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Task
