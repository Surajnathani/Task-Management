import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
  user: null,
  loader: true,
  isLoggedIn: false,
};

// Create a slice for user authentication with name, initial state, and reducers
const userReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
      state.isLoggedIn = true;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
      state.isLoggedIn = false;
    },
  },
});

export default userReducer;

export const { userExists, userNotExists } = userReducer.actions;
