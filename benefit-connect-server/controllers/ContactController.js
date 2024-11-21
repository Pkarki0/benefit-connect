import contactModel from "../models/contactModel.js";

const addContact = async (req, res) => {
  try {
    const contact = new contactModel(req.body);
    const savedContact = await contact.save();
    res.status(201).json({
      status: "success",
      message: "Contact added successfully",
      data: savedContact,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error adding Contact",
      data: error.message,
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({});
    res.status(201).json({
      status: "success",
      message: "Inquiry added successfully",
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching inquiries", error: err });
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
    res.status(200).json({
      status: "success",
      message: "Inquiry data retrieved successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching Inquiry data by ID",
      data: err.message,
    });
  }
};

const sendInquiryReply = async (req, res) => {
  try {
    const data = await contactModel.findById(req.params.inquiryId);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Inquiry data not found",
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Inquiry data retrieved successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching Inquiry data by ID",
      data: err.message,
    });
  }
};

export { addContact, getAllContacts, getContactById, sendInquiryReply };
