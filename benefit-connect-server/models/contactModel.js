import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isReplied: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const contactModel =
  mongoose.models.contact || mongoose.model("contact", contactSchema);

export default contactModel;
