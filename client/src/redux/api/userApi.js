import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API for user authentication and management
const userApi = createApi({
  reducerPath: "userReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/auth/`,
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    // Endpoint for registering a new user
    register: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["users"],
    }),

    // Endpoint for logging in a user
    login: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),

    // Endpoint for getting user details
    getUserDetails: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // Endpoint for logging out a user
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export default userApi;

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserDetailsQuery,
  useLogoutMutation,
} = userApi;
