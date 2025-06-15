import { Header } from '@core/layout/header';
import { Sidebar } from '@core/layout/sidebar';

import AuthProvider from '@/views/auth/AuthProvider';
import { ProtectedRoute } from '@/views/auth/ProtectedRoute';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute adminOnly>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
