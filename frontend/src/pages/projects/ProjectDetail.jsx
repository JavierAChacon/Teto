import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import useProjects from '../../hooks/useProjects'
import Spinner from '../../components/Spinner'
import ModalFormTask from '../../components/ModalFormTask'
import Task from '../../components/Task'
import ModalDeleteTask from '../../components/ModalDeleteTask'
import Alert from '../../components/Alert'

const ProjectDetail = () => {
  const { id } = useParams()
  const { getProject, project, isLoading, handleModalTask, alert } =
    useProjects()
  const { name } = project

  useEffect(() => {
    getProject(id)
  }, [])
  const { msg } = alert

  if (!isLoading) {
    return (
      <div className='p-6'>
        <div className='flex justify-between'>
          <h1 className='text-5xl font-semibold'>{name}</h1>
          <Link
            className='text-gray-700 hover:text-black'
            to={`/projects/edit/${id}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>
            Edit
          </Link>
        </div>
        <button
          type='button'
          onClick={handleModalTask}
          className='mt-5 flex w-full items-center justify-center gap-x-1 rounded-lg bg-purple-500 p-2 text-sm text-white md:w-auto'
        >
          Add task
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
        <ModalFormTask />
        <ModalDeleteTask />
        <h2 className='mt-3 text-xl font-semibold'>Project Tasks: </h2>
        {msg && (
          <div className='mx-auto w-48'>
            <Alert alert={alert} />
          </div>
        )}
        <div className='flex flex-col gap-y-3 pt-2'>
          {project.tasks?.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
        <div className='flex justify-between items-center mt-3'>
          <h2 className='text-xl font-semibold'>Collaborators:</h2>
          <Link
            to={`/projects/new-collaborator/${project._id}`}
            className='rounded-lg bg-orange-400 p-1 text-white text-md'
          >
            Add collaborator
          </Link>
        </div>
      </div>
    )
  } else {
    ;<>
      <Spinner />
    </>
  }
}

export default ProjectDetail
