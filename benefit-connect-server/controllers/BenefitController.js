import benefitModel from "../models/benefitModel.js";

// Create a new benefit
export const addBenefit = async (req, res) => {
  try {
    const benefit = new benefitModel(req.body);
    const savedBenefit = await benefit.save();
    return res.status(201).json({
      status: "success",
      message: "Benefit created successfully",
      data: savedBenefit,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error creating benefit",
      data: error.message,
    });
  }
};

// Get all benefits
export const getAllBenefits = async (req, res) => {
  try {
    const benefits = await benefitModel.find();
    return res.status(200).json({
      status: "success",
      message: "Benefits retrieved successfully",
      data: benefits,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error retrieving benefits",
      data: error.message,
    });
  }
};

// Get benefits by search value

export const searchBenefits = async (req, res) => {
  try {
    const { search } = req.body;
    console.log(search);
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const benefits = await benefitModel.find(query);

    return res.status(200).json({
      status: "success",
      message: "Benefits retrieved successfully",
      data: benefits,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error retrieving benefits",
      data: error.message,
    });
  }
};

// Get a single benefit by ID
export const getBenefitById = async (req, res) => {
  try {
    const benefit = await benefitModel.findById(req.params.benefitId);
    if (!benefit) {
      return res.status(404).json({
        status: "error",
        message: "Benefit not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Benefit retrieved successfully",
      data: benefit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error retrieving benefit",
      data: error.message,
    });
  }
};

// Update a benefit by ID
export const updateBenefit = async (req, res) => {
  try {
    const updatedBenefit = await benefitModel.findByIdAndUpdate(
      req.params.benefitId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBenefit) {
      return res.status(404).json({
        status: "error",
        message: "Benefit not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Benefit updated successfully",
      data: updatedBenefit,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error updating benefit",
      data: error.message,
    });
  }
};

// Delete a benefit by ID
export const deleteBenefit = async (req, res) => {
  try {
    const deletedBenefit = await benefitModel.findByIdAndDelete(
      req.params.benefitId
    );
    if (!deletedBenefit) {
      return res.status(404).json({
        status: "error",
        message: "Benefit not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Benefit deleted successfully",
      data: deletedBenefit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error deleting benefit",
      data: error.message,
    });
  }
};
