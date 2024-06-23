const mongoose = require("mongoose");

// Define the schema for a Note
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const Note = new mongoose.model("Note", noteSchema);
module.exports = Note;
