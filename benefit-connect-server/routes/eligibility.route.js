import express from "express";
import {
  addEligibilityData,
  getAllEligibilityData,
  getEligibilityById,
  getEligibilityByUserId,
  updateEligibility,
  deleteEligibility,
} from "../controllers/EligibilityController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/addEligibilityData/", authMiddleware, addEligibilityData);
router.post(
  "/updateEligibility/:eligibilityId",
  authMiddleware,
  updateEligibility
);
router.get("/getAllEligibilityData", authMiddleware, getAllEligibilityData);
router.get(
  "/getEligibilityById/:eligibilityId",
  authMiddleware,
  getEligibilityById
);

router.get("/getEligibilityByUserId", authMiddleware, getEligibilityByUserId);
router.delete(
  "/deleteEligibility/:eligibilityId",
  authMiddleware,
  deleteEligibility
);

export default router;
