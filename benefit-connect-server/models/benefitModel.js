import mongoose from "mongoose";

const benefitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    eligibilityData: {
      type: String,
      required: true,
    },
    identificationRequired: {
      type: String,
      required: true,
    },
    identificationRequiredData: {
      type: String,
      required: true,
    },
    isApplicationEasy: {
      type: String,
      required: true,
    },
    howToApplyData: {
      type: String,
      required: true,
    },
    isTaxFilingRequired: {
      type: String,
      required: true,
    },
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
    isApplied: { type: Boolean, required: false, default: false },
    status: { type: String, required: false, default: "Eligible to Apply" },
    termsAccepted: { type: Boolean, required: true },
  },
  { minimize: false }
);

const benefitModel =
  mongoose.models.benefit || mongoose.model("benefit", benefitSchema);

export default benefitModel;
