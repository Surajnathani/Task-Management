const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");

// Route for user registration
// POST /api/v1/auth/register
router.post("/register", auth.register);

// Route for user login
// POST /api/v1/auth/login
router.post("/login", auth.login);

// Apply authentication middleware to all routes below this line
router.use(authMiddleware);

// Route to get user details (protected route)
// GET /api/v1/auth/user
router.get("/user", auth.user);

// Route for user logout (protected route)
// POST /api/v1/auth/logout
router.post("/logout", auth.logout);

// Export the router to be used in the main application
module.exports = router;
