import {
  addContact,
  getAllContacts,
  getContactById,
  sendInquiryReply,
} from "../controllers/ContactController.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/addInquiry", authMiddleware, addContact);
router.post("/sendInquiryReply", authMiddleware, sendInquiryReply);
router.get("/getAllInquiries", authMiddleware, getAllContacts);
router.get("/getInquiryById/:inquiryId", authMiddleware, getContactById);

export default router;
