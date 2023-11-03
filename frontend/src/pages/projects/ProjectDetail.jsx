import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import useProjects from '../../hooks/useProjects'
import Spinner from '../../components/Spinner'

const ProjectDetail = () => {
  const { id } = useParams()

  const { getProject, project, isLoading } = useProjects()

  const { client, deliveryDate, description, name } = project

  useEffect(() => {
    getProject(id)
  }, [])

  if (!isLoading) {
    return (
      <div className='flex justify-between p-6'>
        <h1 className='text-5xl font-semibold'>{name}</h1>
        <Link className='text-gray-700 hover:text-black' to={`/projects/edit/${id}`}>
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
          <span className='text-gray-700 hover:text-black'>Edit</span>
        </Link>
      </div>
    )
  } else {
    <>
      <Spinner />
    </>
  }
}

export default ProjectDetail
