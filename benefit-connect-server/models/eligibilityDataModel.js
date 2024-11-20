import mongoose from "mongoose";

const eligibilityDataSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    isTaxFiled: { type: String, required: true },
    isVisionCareRequired: { type: String, required: true },
    isPrescriptionDrugCostly: { type: String, required: true },
    employerHealthCoverage: { type: String, required: true },
    isDiabeticOrSurgery: { type: String, required: true },
    age: { type: String, required: true },
    immigrationStatus: { type: String, required: true },
    employmentStatus: { type: [String], required: true },
    income: { type: String, required: true },
    familySize: { type: String, required: true },
    careForChildrenUnder18: { type: String, required: true },
    isAnyoneDisable: { type: String, required: true },
    livingCondition: { type: String, required: true },
    isPregnant: { type: String, required: true },
    lengthOfStay: { type: String, required: true },
    termsAccepted: { type: Boolean, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { minimize: false }
);

const eligibilityDataModel =
  mongoose.models.eligibilityData ||
  mongoose.model("eligibilityData", eligibilityDataSchema);

export default eligibilityDataModel;
