import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/auth',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the auth state
      const token = (getState() as unknown as RootState).auth.token;
      
      // If we have a token, add it to the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => '/profile',
    }),
    verifyToken: builder.mutation<{ valid: boolean }, { token: string }>({
      query: (tokenData) => ({
        url: '/verify',
        method: 'POST',
        body: tokenData,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useVerifyTokenMutation } = authApi;
