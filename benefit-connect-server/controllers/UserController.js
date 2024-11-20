import userModel from "../models/userModel.js";
import eligibilityDataModel from "../models/eligibilityDataModel.js";
import { processUserEligibility } from "../services/userEligibilityService.js";
import mongoose from "mongoose";

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ userType: { $ne: "admin" } })
      .select(
        "fullname email userType isEligible hasFilledEligibilityForm eligibleBenefits"
      );
    return res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

const updateUser = async (user) => {
  try {
    const updatedData = await eligibilityDataModel.findByIdAndUpdate(
      user._id,
      user,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return 0;
    }
    return 1;
  } catch (err) {
    console.log(err);
  }
};

const checkForUserEligibility = async (req, res) => {
  try {
    const matchedBenefits = await processUserEligibility(req.body.userId);
    if (matchedBenefits.length > 0) {
      res.status(200).json({
        status: "success",
        message: "User eligible benefits processed successfully",
        data: matchedBenefits,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error processing user eligible benefits",
      data: error,
    });
  }
};

const getAllUserEligibleBenefits = async (req, res) => {
  const { userId } = req.body;

  try {
    const userEligibleBenefits = await userModel.findOne(
      { _id: userId },
      { eligibleBenefits: 1, _id: 0 }
    );

    if (userEligibleBenefits) {
      return res.status(200).json({
        status: "success",
        message: "User eligible benefits fetched successfully",
        data: userEligibleBenefits,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching user eligible benefits",
      data: error,
    });
  }
};

// For admin panel
const getAllUserEligibleBenefitsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const userEligibleBenefits = await userModel.findOne({ _id: userId });

    if (userEligibleBenefits) {
      return res.status(200).json({
        status: "success",
        message: "User eligible benefits fetched successfully",
        data: userEligibleBenefits,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching user eligible benefits",
      data: error,
    });
  }
};
const getAllUserAppliedBenefits = async (req, res) => {
  const { userId } = req.body;

  try {
    if (userId) {
      const userEligibleBenefits = await userModel.findOne(
        { _id: userId },
        { eligibleBenefits: 1, _id: 0 }
      );
      if (userEligibleBenefits?.eligibleBenefits.length > 0) {
        const eligibleBenefits = userEligibleBenefits?.eligibleBenefits;
        const userAppliedBenefits = eligibleBenefits?.filter(
          (b) => b.isApplied === true
        );

        if (userAppliedBenefits) {
          return res.status(200).json({
            status: "success",
            message: "User applied benefits fetched successfully",
            data: userAppliedBenefits,
          });
        } else {
          return res.status(200).json({
            status: "success",
            message: "User applied benefits not found",
            data: [],
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching user eligible benefits",
      data: error.message,
    });
  }
};

const applyUserEligibility = async (req, res) => {
  const { userId, appliedBenefitId } = req.body;

  try {
    if (userId && appliedBenefitId) {
      const updatedData = await userModel.updateOne(
        {
          _id: userId,
          "eligibleBenefits._id": new mongoose.Types.ObjectId(appliedBenefitId),
        },
        {
          $set: {
            "eligibleBenefits.$.isApplied": true,
          },
        }
      );

      if (!updatedData) {
        return res.status(404).json({
          status: "error",
          message: "User eligible data not found",
          data: null,
        });
      }
      res.status(200).json({
        status: "success",
        message: "User eligible benefit applied successfully",
        data: updatedData,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error updating user eligible data",
      data: err.message,
    });
  }
};

const changeUserBenefitStatus = async (req, res) => {
  const { benefitUserId, benefitId, status } = req.body;
  try {
    if (benefitUserId && benefitId && status) {
      const updatedData = await userModel.updateOne(
        {
          _id: benefitUserId,
          "eligibleBenefits._id": new mongoose.Types.ObjectId(benefitId),
        },
        {
          $set: {
            "eligibleBenefits.$.status": status,
          },
        }
      );

      if (!updatedData) {
        return res.status(404).json({
          status: "error",
          message: "User benefit data not found",
          data: null,
        });
      }
      res.status(200).json({
        status: "success",
        message: "User benefit status updated successfully",
        data: updatedData,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error updating user benefit data",
      data: err.message,
    });
  }
};

export {
  getAllUsers,
  updateUser,
  checkForUserEligibility,
  applyUserEligibility,
  getAllUserEligibleBenefits,
  getAllUserAppliedBenefits,
  getAllUserEligibleBenefitsByUserId,
  changeUserBenefitStatus,
};
