import eligibilityDataModel from "../models/eligibilityDataModel.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

// Create (POST) - Add new eligibility data
const addEligibilityData = async (req, res) => {
  try {
    const eligibilityData = new eligibilityDataModel(req.body);
    const existingEligibleData = await eligibilityDataModel.findOne({
      userId: new mongoose.Types.ObjectId(req.body.userId),
    });

    if (existingEligibleData) {
      return res.status(400).json({
        status: "error",
        message: "The eligibility data for the user already exist!",
        data: null,
      });
    }
    const savedData = await eligibilityData.save();
    console.log("Saved data", savedData);
    if (savedData) {
      const result = await userModel.findByIdAndUpdate(
        eligibilityData.userId,
        { hasFilledEligibilityForm: true },
        { new: true, runValidators: true }
      );

      console.log(result);

      return res.status(201).json({
        status: "success",
        message: "Eligibility data added successfully",
        data: savedData,
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Eligibility data added successfully",
      data: savedData,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error adding eligibility data",
      data: err.message,
    });
  }
};

// Read (GET) - Get all eligibility data
const getAllEligibilityData = async (req, res) => {
  try {
    const data = await eligibilityDataModel.find();
    return res.status(200).json({
      status: "success",
      message: "Eligibility data retrieved successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching eligibility data",
      data: err.message,
    });
  }
};

// Read (GET) - Get eligibility data by ID
const getEligibilityById = async (req, res) => {
  try {
    const data = await eligibilityDataModel.findById(req.params.eligibilityId);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Eligibility data not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Eligibility data retrieved successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching eligibility data by ID",
      data: err.message,
    });
  }
};

const getEligibilityByUserId = async (req, res) => {
  try {
    const data = await eligibilityDataModel.findOne({
      userId: new mongoose.Types.ObjectId(req.body.userId),
    });

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "User Eligibility data not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "User Eligibility data retrieved successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching user eligibility data by ID",
      data: err.message,
    });
  }
};

// Update (PUT) - Update eligibility data by ID
const updateEligibility = async (req, res) => {
  try {
    const updatedData = await eligibilityDataModel.findByIdAndUpdate(
      req.params.eligibilityId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return res.status(404).json({
        status: "error",
        message: "Eligibility data not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Eligibility data updated successfully",
      data: updatedData,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error updating eligibility data",
      data: err.message,
    });
  }
};

// Delete (DELETE) - Delete eligibility data by ID
const deleteEligibility = async (req, res) => {
  try {
    const deletedData = await eligibilityDataModel.findByIdAndDelete(
      req.params.eligibilityId
    );
    if (!deletedData) {
      return res.status(404).json({
        status: "error",
        message: "Eligibility data not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Eligibility data deleted successfully",
      data: deletedData,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error deleting eligibility data",
      data: err.message,
    });
  }
};

export {
  addEligibilityData,
  getAllEligibilityData,
  getEligibilityById,
  getEligibilityByUserId,
  updateEligibility,
  deleteEligibility,
};
