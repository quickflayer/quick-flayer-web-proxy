"use client";

import React, { useState } from 'react';
import { useAuthAxios } from '../../hooks/useAuthAxios';
import { 
  useProfileQuery, 
  useLoginMutation, 
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUsersQuery 
} from '../../hooks/useAuthQueries';

export const AxiosAuthDemo: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isCheckingAuth,
    isLoginLoading,
    error,
    login,
    logout,
    isAdmin,
    clearError,
  } = useAuthAxios();

  // Query hooks
  const { data: profileData, isLoading: profileLoading, refetch: refetchProfile } = useProfileQuery(isAuthenticated);
  const { data: usersData, isLoading: usersLoading } = useUsersQuery(isAdmin());

  // Mutation hooks
  const updateProfileMutation = useUpdateProfileMutation();
  const changePasswordMutation = useChangePasswordMutation();

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginForm.email, loginForm.password);
  };

  // Handle profile update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync(profileForm);
      await refetchProfile();
      setProfileForm({ firstName: '', lastName: '' });
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  // Handle password change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePasswordMutation.mutateAsync(passwordForm);
      setPasswordForm({ currentPassword: '', newPassword: '' });
      alert('Password changed successfully!');
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Checking authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login with Axios</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button 
              onClick={clearError}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoginLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoginLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Axios Auth Dashboard</h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          {profileLoading ? (
            <p>Loading profile...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Email:</strong> {user?.email}</div>
              <div><strong>Role:</strong> {user?.role}</div>
              <div><strong>First Name:</strong> {user?.firstName || 'Not set'}</div>
              <div><strong>Last Name:</strong> {user?.lastName || 'Not set'}</div>
              <div><strong>Active:</strong> {user?.isActive ? 'Yes' : 'No'}</div>
              <div><strong>Admin:</strong> {isAdmin() ? 'Yes' : 'No'}</div>
            </div>
          )}
        </div>

        {/* Update Profile */}
        <div className="mb-6 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-4">Update Profile</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={updateProfileMutation.isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {updateProfileMutation.isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="mb-6 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              disabled={changePasswordMutation.isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {changePasswordMutation.isLoading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>

        {/* Admin Section */}
        {isAdmin() && (
          <div className="p-4 border rounded bg-yellow-50">
            <h3 className="text-lg font-semibold mb-4">Admin Section</h3>
            {usersLoading ? (
              <p>Loading users...</p>
            ) : (
              <div>
                <h4 className="font-medium mb-2">All Users ({usersData?.length || 0})</h4>
                <div className="space-y-2">
                  {usersData?.map((user) => (
                    <div key={user.id} className="p-2 bg-white rounded border">
                      <div className="flex justify-between">
                        <span>{user.email}</span>
                        <span className="text-sm text-gray-500">{user.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
