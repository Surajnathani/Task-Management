import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API for managing notes
const notesApi = createApi({
  reducerPath: "notesReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/note/`,
    credentials: "include",
  }),
  tagTypes: ["notes"],
  endpoints: (builder) => ({
    // Endpoint for adding a new note
    newNote: builder.mutation({
      query: (note) => ({
        url: "addnote",
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["notes"],
    }),

    // Endpoint for fetching all notes
    getNotes: builder.query({
      query: () => ({
        url: "mynotes",
        method: "GET",
      }),
      providesTags: ["notes"],
    }),

    // Endpoint for fetching a single note by its ID
    getSingleNote: builder.query({
      query: (id) => ({
        url: `notes/${id}`,
        method: "GET",
      }),
      providesTags: ["notes"],
    }),

    // Endpoint for updating a note
    updateNote: builder.mutation({
      query: ({ noteId, note }) => ({
        url: `notes/update/${noteId}`,
        method: "PATCH",
        body: note,
      }),
      invalidatesTags: ["notes"],
    }),

    // Endpoint for deleting a note
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `notes/delete/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notes"],
    }),
  }),
});

export default notesApi;

export const {
  useNewNoteMutation,
  useGetNotesQuery,
  useGetSingleNoteQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
