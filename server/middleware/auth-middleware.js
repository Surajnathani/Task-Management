const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Define the authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the cookies
    const token = req.cookies["user-token"];

    // If no token is found, return an unauthorized error
    if (!token)
      return res.status(401).send({ error: "Please Login to access this" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.user = decodedData._id;
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Invalid token" });
  }
  // If everything is okay, move to the next middleware or route handler
  next();
};

module.exports = authMiddleware;
