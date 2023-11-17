import Project from '../models/Project.js'
import Task from '../models/Task.js'

const addTask = async (req, res) => {
  const { project } = req.body
  const exitsProject = await Project.findById(project)
  if (!exitsProject) {
    const error = new Error('The project does not exits')
    res.status(404).json({ msg: error.message })
  } else if (exitsProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error('You do not have the permissions to add tasks')
    res.status(403).json({ msg: error.message })
  }

  try {
    const storedTask = await Task.create(req.body)
    res.json(storedTask)
    exitsProject.tasks.push(storedTask._id)
    await exitsProject.save()
  } catch (error) {
    console.log(error)
  }
}

const getTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id).populate('project')

  if (!task) {
    const error = new Error('Task not found')
    return res.status(404).json({ msg: error.message })
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Action no valid')
    return res.status(403).json({ msg: error.message })
  }

  res.json(task)
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id).populate('project')

  if (!task) {
    const error = new Error('Task not found')
    return res.status(404).json({ msg: error.message })
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Action no valid')
    return res.status(403).json({ msg: error.message })
  }

  task.name = req.body.name || task.name
  task.description = req.body.description || task.description
  task.priority = req.body.priority || task.priority
  task.project = req.body.project || task.project
  task.deliveryDate = req.body.deliveryDate || task.deliveryDate

  try {
    const storedTask = await task.save()
    res.json(storedTask)
  } catch (error) {
    console.log(error)
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id).populate('project')

  if (!task) {
    const error = new Error('Task not found')
    return res.status(404).json({ msg: error.message })
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Action no valid')
    return res.status(403).json({ msg: error.message })
  }

  try {
    await task.deleteOne()
    res.json({ msg: 'Task deleted' })
    res.json(storedTask)
  } catch (error) {
    console.log(error)
  }
}

const changeState = async (req, res) => {}

export { addTask, getTask, updateTask, deleteTask, changeState }
