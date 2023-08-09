import express from "express";
import {
  register,
  authenticate,
  confirm,
  forgotPassword,
  validateToken,
  setNewPassword,
  profile
} from "../controllers/userController.js";

import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", register); //create a new user
router.post("/login", authenticate); //authenticate a user
router.get("/confirm/:token", confirm); //confirm a user
router.post("/forgot-password", forgotPassword); //validate user and send email with the new token

router.route("/forgot-password/:token").get(validateToken).post(setNewPassword);

router.get("/profile", checkAuth, profile);

export default router;