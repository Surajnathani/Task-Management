import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the notes slice
const initialState = {
  notes: [],
  loading: true,
};

// Create a slice for notes management with name, initial state, and reducers
const notesReducer = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addedNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deletedNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    updatedNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...action.payload };
      }
    },
    getNotes: (state, action) => {
      state.notes = action.payload;
      state.loading = false;
    },
    noNotes: (state) => {
      state.notes = [];
      state.loading = false;
    },
  },
});

export default notesReducer;

export const { addedNote, deletedNote, updatedNote, getNotes, noNotes } =
  notesReducer.actions;
