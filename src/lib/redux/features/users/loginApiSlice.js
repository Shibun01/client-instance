import { apiSlice } from '../../api/rootApi';

export const loginApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        }
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'user/logout', 
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation } = loginApiSlice;
