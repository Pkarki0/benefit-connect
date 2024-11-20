import express from "express";
import { signUp, signIn, adminSignIn } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/adminSignIn", adminSignIn);

export default router;
