import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      default: "user",
    },
    isEligible: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasFilledEligibilityForm: {
      type: Boolean,
      required: false,
      default: false,
    },
    eligibleBenefits: {
      type: [],
      required: false,
    },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
