const mongoose = require("mongoose");

// Define an asynchronous function to connect to the database
const connectDb = async (URI) => {
  try {
    // Attempt to connect to MongoDB using the provided URI
    await mongoose.connect(URI);
    console.log("connection successful");
  } catch (error) {
    console.log(error);
    // Exit the process with a status code of 0
    process.exit(0);
  }
};

module.exports = connectDb;
