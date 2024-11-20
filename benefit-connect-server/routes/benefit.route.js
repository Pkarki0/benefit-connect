import express from "express";
import {
  addBenefit,
  getAllBenefits,
  getBenefitById,
  updateBenefit,
  deleteBenefit,
  searchBenefits,
} from "../controllers/BenefitController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/addBenefit", authMiddleware, addBenefit);
router.post("/updateBenefit/:benefitId", authMiddleware, updateBenefit);
router.get("/getAllBenefits", getAllBenefits);
router.get("/getBenefitById/:benefitId", getBenefitById);
router.post("/searchBenefits", searchBenefits);
router.delete("/deleteBenefit/:benefitId", authMiddleware, deleteBenefit);

export default router;
