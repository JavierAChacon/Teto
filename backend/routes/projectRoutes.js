import express from "express";
import {
    getProjects,
    newProject,
    getProject,
    editProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
    getTasks
} from "../controllers/projectController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router
    .route("/")
    .get(checkAuth, getProjects)
    .post(checkAuth, newProject);

router
    .route("/:id")
    .get(checkAuth, getProject)
    .put(checkAuth, editProject)
    .delete(checkAuth, deleteProject);

router.get("/tareas/:id", checkAuth, getTasks);
router.post("/add-collaborator/:id", checkAuth, addCollaborator);
router.post("/delete-collaborator/:id", checkAuth, deleteCollaborator);
export default router;