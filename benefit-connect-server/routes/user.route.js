import express from "express";
import {
  getAllUsers,
  checkForUserEligibility,
  applyUserEligibility,
  getAllUserEligibleBenefits,
  getAllUserAppliedBenefits,
  getAllUserEligibleBenefitsByUserId,
  changeUserBenefitStatus,
} from "../controllers/UserController.js";

const router = express.Router();
import authMiddleware from "../middleware/auth.js";

router.get("/getAllUsers", authMiddleware, getAllUsers);
router.get("/checkForUserEligibility", authMiddleware, checkForUserEligibility);
router.post("/applyUserEligibility", authMiddleware, applyUserEligibility);
router.get(
  "/getAllUserEligibleBenefits",
  authMiddleware,
  getAllUserEligibleBenefits
);
router.get(
  "/getAllUserAppliedBenefits",
  authMiddleware,
  getAllUserAppliedBenefits
);
router.get(
  "/getAllUserEligibleBenefitsByUserId/:userId",
  authMiddleware,
  getAllUserEligibleBenefitsByUserId
);
router.post(
  "/changeUserBenefitStatus",
  authMiddleware,
  changeUserBenefitStatus
);

export default router;
