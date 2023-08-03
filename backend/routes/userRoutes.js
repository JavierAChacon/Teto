import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();

router.post('/', register); //create a new user

export default router;