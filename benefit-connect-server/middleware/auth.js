import jwt, { decode } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized! Login Again!",
    });
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      return res.status(500).json({
        success: false,
        message: "Token has expired! Login to try again!",
      });
    } else {
      const decode_token = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decode_token.id;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error!" });
  }
};

export default authMiddleware;
