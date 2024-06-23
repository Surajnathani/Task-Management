// Load environment variables from a .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./utils/db");
const router = require("./router/auth-router");
const noteRouter = require("./router/note-router");
const cookieParser = require("cookie-parser");

// Configure CORS options which Allow requests from this origin
const corsOptions = {
  origin: "task-management-apk.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Set up port and MongoDB URI
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
connectDb(mongoURI);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Route setup
app.use("/api/v1/auth", router);
app.use("/api/v1/note", noteRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
