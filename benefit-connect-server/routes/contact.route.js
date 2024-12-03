import {
  addInquiry,
  getAllInquiries,
  getInquiryById,
  sendInquiryReply,
  getInquiriesByEmail,
} from "../controllers/ContactController.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/addInquiry", addInquiry);
router.post("/sendInquiryReply/:inquiryId", authMiddleware, sendInquiryReply);
router.get("/getAllInquiries", authMiddleware, getAllInquiries);
router.get("/getInquiryById/:inquiryId", authMiddleware, getInquiryById);
router.get("/getInquiriesByEmail/:email", authMiddleware, getInquiriesByEmail);

export default router;
