import express from 'express'
import {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject
} from '../controllers/projectController.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

router.route('/').get(checkAuth, getProjects).post(checkAuth, newProject)

router.route('/:id')
  .get(checkAuth, getProject)
  .delete(checkAuth, deleteProject)
  .put(checkAuth, editProject)

export default router
