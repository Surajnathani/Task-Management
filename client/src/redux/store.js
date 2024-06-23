import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import userApi from "./api/userApi";
import notesReducer from "./reducer/notesReducer";
import notesApi from "./api/notesApi";

// Configure the Redux store
const store = configureStore({
  // Configure the Redux store
  reducer: {
    [userReducer.name]: userReducer.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [notesReducer.name]: notesReducer.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  // Configure middleware
  middleware: (mid) => [...mid(), userApi.middleware, notesApi.middleware],
});

export default store;
