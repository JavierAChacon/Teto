import { useEffect } from 'react'
import useProjects from '../../hooks/useProjects'
import { useParams } from 'react-router-dom'
import FormProject from '../../components/FormProject'

const EditProject = () => {
  const { id } = useParams()
  const { getProject, project } = useProjects()

  useEffect(() => {
    getProject(id)
  }, [])

  const { name } = project

  return (
    <div className='p-3'>
      <h1 className='text-4xl font-black mb-5'>Edit project: {name}</h1>
      <FormProject />
    </div>
  )
}

export default EditProject
