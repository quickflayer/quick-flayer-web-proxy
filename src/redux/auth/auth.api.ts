import { createApi } from '@reduxjs/toolkit/query/react';

import query from '@lib/http/query';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
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

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: query(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => ({ url: '/auth/profile', method: 'GET' }),
    }),
    verifyToken: builder.mutation<{ valid: boolean }, { token: string }>({
      query: (tokenData) => ({
        url: '/auth/verify',
        method: 'POST',
        body: tokenData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useVerifyTokenMutation,
} = authApi;

export default authApi;
