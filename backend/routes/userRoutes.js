import express from "express";
import { register, authenticate, confirm } from "../controllers/userController.js";

const router = express.Router();

router.post("/", register); //create a new user

router.post("/login", authenticate); //authenticate a user

router.get("/confirm/:token", confirm)

export default router;