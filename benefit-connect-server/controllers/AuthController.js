import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "Email and Password are required",
      data: null,
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User does not exist",
        data: null,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect Email or Password",
        data: null,
      });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        email,
        hasFilledEligibilityForm: user?.hasFilledEligibilityForm,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
      data: error.message,
    });
  }
};

// Register user
const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
        data: null,
      });
    }

    // Validate email format and password strength
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "error",
        message: "Please enter a valid email",
        data: null,
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 8 characters long",
        data: null,
      });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fullname,
      email,
      password: hashedPassword,
      userType: "user",
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { token, email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
      data: error.message,
    });
  }
};

const adminSignUp = async (req, res) => {
  const { fullname, email, password, userType } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { email, userType }],
    });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
        data: null,
      });
    }

    // Validate email format and password strength
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "error",
        message: "Please enter a valid email",
        data: null,
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 8 characters long",
        data: null,
      });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fullname,
      email,
      password: hashedPassword,
      userType: userType,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    return res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
      data: { token, email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
      data: error.message,
    });
  }
};

const adminSignIn = async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "Email and Password are required",
      data: null,
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User does not exist",
        data: null,
      });
    }

    if (user.userType == "admin") {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          status: "error",
          message: "Incorrect Email or Password",
          data: null,
        });
      }

      const token = createToken(user._id);
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        data: { token, email },
      });
    } else {
      return res.status(401).json({
        status: "error",
        message: `Sorry, ${user.email} is not authorized to access admin panel!`,
        data: {},
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
      data: error.message,
    });
  }
};

// Token creation helper function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export { signIn, signUp, adminSignIn, adminSignUp };
