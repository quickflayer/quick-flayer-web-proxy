# Custom Axios Authentication System

This document explains the new custom Axios-based authentication system that provides better control over HTTP requests, automatic token management, and enhanced error handling.

## Overview

The new system replaces RTK Query with a custom Axios implementation that includes:

- **Automatic token management** with localStorage and cookie synchronization
- **Request/Response interceptors** for authentication and error handling
- **Token refresh logic** with automatic retry
- **React Query-like hooks** for data fetching and mutations
- **Enhanced error handling** with meaningful error messages
- **Caching and stale-while-revalidate** functionality

## Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   React Components  │    │   Custom Hooks      │    │   HTTP Client       │
│                     │    │                     │    │                     │
│ - AxiosAuthDemo     │───▶│ - useAuthAxios      │───▶│ - http        │
│ - LoginForm         │    │ - useAuthQueries    │    │ - AuthService       │
│ - Dashboard         │    │ - useAxiosQuery     │    │ - Interceptors      │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
                                      │                           │
                                      ▼                           ▼
                           ┌─────────────────────┐    ┌─────────────────────┐
                           │   Redux Store       │    │   Token Manager     │
                           │                     │    │                     │
                           │ - auth-slice        │    │ - localStorage      │
                           │ - User state        │    │ - Cookies           │
                           │ - Error handling    │    │ - Token validation  │
                           └─────────────────────┘    └─────────────────────┘
```

## Core Components

### 1. HTTP Client (`lib/api/http-client.ts`)

The foundation of the system - an Axios instance with interceptors:

```typescript
import http from '../lib/api/http-client';

// Automatic token injection
// Automatic error handling
// Token refresh on 401 errors
// Request/response logging
```

**Features:**
- Automatically adds Bearer tokens to requests
- Handles token expiration and refresh
- Logs all requests and responses for debugging
- Redirects to login on authentication failures

### 2. Auth Service (`lib/api/auth-service.ts`)

Service class with all authentication methods:

```typescript
import AuthService from '../lib/api/auth-service';

// Login
const result = await AuthService.login({ email, password });

// Get profile
const user = await AuthService.getProfile();

// Update profile
const updatedUser = await AuthService.updateProfile(updates);

// Change password
await AuthService.changePassword(currentPassword, newPassword);
```

### 3. Custom Query Hooks (`hooks/useAxiosQuery.ts`)

React Query-like functionality with Axios:

```typescript
import { useAxiosQuery, useAxiosMutation } from '../hooks/useAxiosQuery';

// Query with caching and auto-refetch
const { data, isLoading, error, refetch } = useAxiosQuery(
  ['users', 'profile'],
  () => http.get('/auth/profile'),
  {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  }
);

// Mutation with optimistic updates
const { mutate, isLoading } = useAxiosMutation(
  (data) => http.post('/auth/login', data),
  {
    onSuccess: (result) => {
      console.log('Login successful:', result);
    },
  }
);
```

### 4. Auth-Specific Hooks (`hooks/useAuthQueries.ts`)

Pre-configured hooks for common auth operations:

```typescript
import { 
  useProfileQuery, 
  useLoginMutation, 
  useUpdateProfileMutation 
} from '../hooks/useAuthQueries';

// Auto-fetch profile when authenticated
const { data: profile, isLoading } = useProfileQuery(isAuthenticated);

// Login mutation
const loginMutation = useLoginMutation();
await loginMutation.mutateAsync({ email, password });

// Update profile
const updateMutation = useUpdateProfileMutation();
await updateMutation.mutateAsync({ firstName: 'John' });
```

### 5. Enhanced Auth Hook (`hooks/useAuthAxios.ts`)

Complete authentication state management:

```typescript
import { useAuthAxios } from '../hooks/useAuthAxios';

const {
  user,
  isAuthenticated,
  isCheckingAuth,
  isLoginLoading,
  error,
  login,
  logout,
  updateProfile,
  changePassword,
  isAdmin,
  hasRole,
} = useAuthAxios();
```

## Usage Examples

### Basic Login Component

```typescript
import React, { useState } from 'react';
import { useAuthAxios } from '../hooks/useAuthAxios';

export const LoginForm: React.FC = () => {
  const { login, isLoginLoading, error } = useAuthAxios();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials.email, credentials.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Password"
        required
      />
      
      <button type="submit" disabled={isLoginLoading}>
        {isLoginLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

### Profile Management

```typescript
import React from 'react';
import { useProfileQuery, useUpdateProfileMutation } from '../hooks/useAuthQueries';

export const ProfilePage: React.FC = () => {
  const { data: profile, isLoading, refetch } = useProfileQuery();
  const updateMutation = useUpdateProfileMutation();

  const handleUpdate = async (updates: Partial<User>) => {
    try {
      await updateMutation.mutateAsync(updates);
      await refetch(); // Refresh profile data
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {profile?.email}</p>
      <p>Role: {profile?.role}</p>
      
      <button 
        onClick={() => handleUpdate({ firstName: 'New Name' })}
        disabled={updateMutation.isLoading}
      >
        {updateMutation.isLoading ? 'Updating...' : 'Update Profile'}
      </button>
    </div>
  );
};
```

### Admin Dashboard

```typescript
import React from 'react';
import { useUsersQuery, useAuthAxios } from '../hooks/useAuthQueries';

export const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuthAxios();
  const { data: users, isLoading } = useUsersQuery(isAdmin());

  if (!isAdmin()) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {isLoading ? (
        <div>Loading users...</div>
      ) : (
        <div>
          {users?.map(user => (
            <div key={user.id}>
              {user.email} - {user.role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## Configuration

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Auth Config

```typescript
// lib/auth/auth-config.ts
export const AUTH_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  LOGIN_ENDPOINT: '/auth/login',
  PROFILE_ENDPOINT: '/auth/profile',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  // ... other config
};
```

## Migration from RTK Query

To migrate from the existing RTK Query setup:

1. **Install Axios** (if not already installed):
   ```bash
   npm install axios
   ```

2. **Replace imports**:
   ```typescript
   // Old
   import { useLoginMutation, useGetProfileQuery } from '../api/auth-api';
   
   // New
   import { useLoginMutation, useProfileQuery } from '../hooks/useAuthQueries';
   ```

3. **Update hook usage**:
   ```typescript
   // Old
   const [login, { isLoading }] = useLoginMutation();
   const result = await login(credentials).unwrap();
   
   // New
   const loginMutation = useLoginMutation();
   const result = await loginMutation.mutateAsync(credentials);
   ```

4. **Update component logic**:
   ```typescript
   // Old
   const { data: profile } = useGetProfileQuery(undefined, { skip: !isAuthenticated });
   
   // New
   const { data: profile } = useProfileQuery(isAuthenticated);
   ```

## Benefits

1. **Better Error Handling**: More granular error messages and automatic retry logic
2. **Token Management**: Automatic token refresh and synchronization between storage methods
3. **Caching**: Built-in caching with configurable stale time
4. **Debugging**: Comprehensive request/response logging
5. **Flexibility**: Easy to extend and customize for specific needs
6. **Type Safety**: Full TypeScript support with proper typing
7. **Performance**: Optimized with request deduplication and caching

## Demo Component

See `components/auth/AxiosAuthDemo.tsx` for a complete working example that demonstrates all features of the new authentication system.
