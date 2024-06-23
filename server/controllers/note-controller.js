const Note = require("../models/note");

// Controller to create a new note
const noteForm = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;

    if (!title || !description) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    const data = await Note.create({ title, description, user });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ msg: "Note added failed" });
  }
};

// Controller to get all notes for a user
const getAllUserNotes = async (req, res) => {
  try {
    const userId = req.user;

    const userNotes = await Note.find({ user: userId });

    if (!userNotes.length) {
      return res.status(404).send({ msg: "Create new note" });
    }

    return res.status(200).json({ userNotes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

// Controller to get a specific note by ID
const getUserNotesById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Note.findOne({ _id: id }, { password: 0 });

    if (!data) {
      return res.status(404).json({ msg: "Note not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

// Controller to update a note
const updateByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Note.findOne({ _id: id }, { password: 0 });

    const userId = req.user;

    // Check if the user is authorized to delete this note
    if (data.user != userId) {
      return res
        .status(404)
        .json({ msg: "You are not authorized to update this note" });
    }

    const updateUserNode = req.body;

    const updateNote = await Note.updateOne(
      { _id: id },
      {
        $set: updateUserNode,
      }
    );

    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

// Controller to delete a note
const deleteByUserId = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Note.findOne({ _id: id }, { password: 0 });

    const userId = req.user;

    // Check if the user is authorized to delete this note
    if (data.user != userId) {
      return res
        .status(404)
        .json({ msg: "You are not authorized to update this note" });
    }

    await Note.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ success: true, msg: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = {
  noteForm,
  getAllUserNotes,
  updateByUserId,
  deleteByUserId,
  getUserNotesById,
};
