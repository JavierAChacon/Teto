import { Link } from 'react-router-dom'
import useProjects from '../../hooks/useProjects.jsx'
import Spinner from '../../components/Spinner.jsx'

const Projects = () => {
  const { isLoading, projectsFiltered } = useProjects()
  if (!isLoading) {
    return (
      <div className='p-3'>
        <h1 className='text-4xl font-black'>Projects</h1>
        <div className='mt-5 rounded-lg bg-white p-2 shadow flex flex-col gap-y-3'>
          {projectsFiltered?.length
            ? (
                projectsFiltered.map(project => {
                  const { name, deliveryDate, description, _id } = project
                  return (
                    <div key={_id} className='shadow flex p-3 bg-gray-100 justify-between items-center'>
                      <div>
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>{deliveryDate}</p>
                      </div>
                      <Link to={`/projects/${_id}`} className='text-sky-700 uppercase pointer hover:text-sky-800'>See details</Link>
                    </div>
                  )
                })
              )
            : (
              <p className='text-md p-3 text-center font-medium uppercase'>
                The are not projects
              </p>
              )}
        </div>
      </div>
    )
  } else return <Spinner />
}

export default Projects
