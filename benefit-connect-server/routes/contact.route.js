import { addContact } from "../controllers/ContactController.js";
import express from "express";

const router = express.Router();

router.post("/addContact", addContact);

export default router;
