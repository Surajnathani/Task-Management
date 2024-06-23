const jwt = require("jsonwebtoken");

// Define cookie options Cookie expiration time
const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const sendToken = (res, user, code, message) => {
  // Create a JWT containing the user's ID
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("user-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

// Export the sendToken function and cookieOptions
module.exports = { sendToken, cookieOptions };
