const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendToken, cookieOptions } = require("../utils/features");

// User registration controller
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    // User registration controller
    const user = await User.create({ username, email, password });

    // Send token and response
    sendToken(res, user, 201, "User created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Registration Error", error });
  }
};

// User login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    if (!user) {
      return res.status(404).json({ msg: "User Not exist" });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "invalid email or password" });
    }

    // Send token and response
    sendToken(res, user, 200, `Welcome back, ${user.name}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Login Error" });
  }
};

// Get user details controller
const user = async (req, res) => {
  try {
    const userData = await User.findById(req.user);

    if (!userData) return res.status(404).json({ msg: "User not found" });

    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

// User logout controller
const logout = async (req, res) => {
  try {
    // Clear the token cookie
    return res
      .status(200)
      .cookie("user-token", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        msg: "Logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Logout Error",
    });
  }
};

module.exports = { register, login, user, logout };
