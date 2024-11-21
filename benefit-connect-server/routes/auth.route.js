import express from "express";
import {
  signUp,
  signIn,
  adminSignIn,
  adminSignUp,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/adminSignUp", adminSignUp);
router.post("/adminSignIn", adminSignIn);

export default router;
