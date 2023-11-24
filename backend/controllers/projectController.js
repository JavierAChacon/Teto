import Project from '../models/Project.js'
import User from '../models/User.js'

const getProjects = async (req, res) => {
  const projects = await Project.find()
    .where('creator')
    .equals(req.user)
    .select('-tasks')

  res.json(projects)
}

const newProject = async (req, res) => {
  const project = new Project(req.body)
  project.creator = req.user._id

  try {
    const storedProject = await project.save()
    res.json({ storedProject, msg: 'Project created successfully!' })
  } catch (error) {
    console.log(error)
  }
}

const getProject = async (req, res) => {
  try {
    const { id } = req.params

    const project = await Project.findById(id).populate('tasks');

    if (project === null) {
      const error = new Error('Project not found');
      return res.status(404).json({ msg: error.message });
    } else if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('No valid action');
      return res.status(401).json({ msg: error.message });
    } else {
      res.json(project);
    }
  } catch (error) {
    console.error('Error in getProject:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}

const editProject = async (req, res) => {
  const { id } = req.params
  const project = await Project.findById(id)

  if (!project) {
    const error = new Error('Project not found')
    return res.status(404).json({ msg: error.message })
  } else if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No valid action')
    return res.status(401).json({ msg: error.message })
  }

  project.name = req.body.name || project.name
  project.description = req.body.description || project.description
  project.deliveryDate = req.body.deliveryDate || project.deliveryDate
  project.client = req.body.client || project.client

  try {
    const storagedProject = await project.save()
    res.json(storagedProject)
  } catch (error) {
    console.log(error)
  }
}

const deleteProject = async (req, res) => {
  const { id } = req.params
  const project = await Project.findById(id)

  if (!project) {
    const error = new Error('Project not found')
    return res.status(404).json({ msg: error.message })
  } else if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No valid action')
    return res.status(401).json({ msg: error.message })
  }

  try {
    await project.deleteOne()
    res.json({ msg: 'Project deleted' })
  } catch (error) {
    console.log(error)
  }
}

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject
}
