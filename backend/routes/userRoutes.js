import express from "express";
import { register, authenticate } from "../controllers/userController.js";

const router = express.Router();

router.post('/', register); //create a new user

router.post('/login', authenticate); //

export default router;