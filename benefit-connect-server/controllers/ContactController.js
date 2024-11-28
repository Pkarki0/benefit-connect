import contactModel from "../models/contactModel.js";

const addContact = async (req, res) => {
  try {
    const contact = new contactModel(req.body);
    const savedContact = await contact.save();
    return res.status(201).json({
      status: "success",
      message: "Contact added successfully",
      data: savedContact,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error adding Contact",
      data: error.message,
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({});
    return res.status(201).json({
      status: "success",
      message: "Inquiry added successfully",
      data: contacts,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching inquiries", error: err });
  }
};

const getContactById = async (req, res) => {
  try {
    const data = await contactModel.findById(req.params.inquiryId);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Inquiry data not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Inquiry data retrieved successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching Inquiry data by ID",
      data: err.message,
    });
  }
};

const sendInquiryReply = async (req, res) => {
  try {
    const { replyMessage } = req.body;

    if (!replyMessage) {
      return res.status(400).json({
        status: "error",
        message: "Reply message is required",
        data: null,
      });
    }

    const updatedInquiry = await contactModel.findByIdAndUpdate(
      req.params.inquiryId,
      { $set: { replyMessage: replyMessage, isReplied: true } },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({
        status: "error",
        message: "Inquiry data not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Reply sent successfully",
      data: updatedInquiry,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error sending reply for the inquiry",
      data: err.message,
    });
  }
};

export { addContact, getAllContacts, getContactById, sendInquiryReply };
