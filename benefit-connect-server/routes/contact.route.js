import {
  addContact,
  getAllContacts,
  getContactById,
  sendInquiryReply,
} from "../controllers/ContactController.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/addInquiry", addContact);
router.post("/sendInquiryReply/:inquiryId", sendInquiryReply);
router.get("/getAllInquiries", getAllContacts);
router.get("/getInquiryById/:inquiryId", getContactById);

export default router;
