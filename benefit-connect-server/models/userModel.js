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
    profilePicture: {
      type: String,
      default:
        "https://cdn0.iconfinder.com/data/icons/fintech-solutions-solid-24/24/account_user_profile_person_avatar-512.png",
    },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
