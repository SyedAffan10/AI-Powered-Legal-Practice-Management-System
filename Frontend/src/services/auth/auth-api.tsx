import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './base-query-with-reauth';

// Define the base API
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    getUser: builder.query<unknown ,void>({
      query: () => '/get_profile/',
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserQuery } = authApi;
