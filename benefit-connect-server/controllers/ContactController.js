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

export { addContact };
