import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  refetchOnReconnect: true,
  endpoints: (_) => ({}),
  // Every feature endpoints will be injected to the apiSlice.
});
