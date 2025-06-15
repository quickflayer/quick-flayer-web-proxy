'use client';

import { useAuth } from '../../../hooks/use-auth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Welcome, {user?.firstName || user?.email}
          </h2>
          <p className="text-gray-600">
            You are logged in as:{' '}
            <span className="font-semibold">{user?.role}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-700 mb-2">
              User Management
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Manage users and permissions
            </p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
              View Users →
            </button>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-700 mb-2">
              Content Management
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Manage application content
            </p>
            <button className="text-green-600 text-sm font-medium hover:text-green-800">
              Edit Content →
            </button>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-700 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600 mb-3">View usage statistics</p>
            <button className="text-purple-600 text-sm font-medium hover:text-purple-800">
              View Reports →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
