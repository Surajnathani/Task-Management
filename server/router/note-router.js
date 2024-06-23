const express = require("express");
const router = express.Router();
const note = require("../controllers/note-controller");
const authMiddleware = require("../middleware/auth-middleware");

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Route to add a new note
// POST /api/v1/note/addnote
router.post("/addnote", note.noteForm);

// Route to get all notes for the authenticated user
// GET /api/v1/note/mynotes
router.get("/mynotes", note.getAllUserNotes);

// Route to get a specific note by its ID
// GET /api/v1/note/notes/:id
router.get("/notes/:id", note.getUserNotesById);

// Route to update a specific note by its ID
// PATCH /api/v1/note/notes/update/:id
router.patch("/notes/update/:id", note.updateByUserId);

// Route to delete a specific note by its ID
// DELETE /api/v1/note/notes/delete/:id
router.delete("/notes/delete/:id", note.deleteByUserId);

// Export the router to be used in the main application
module.exports = router;
