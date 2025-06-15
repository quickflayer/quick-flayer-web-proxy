import AuthProvider from '@/core/providers/AuthProvider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">{children}</div>
    </AuthProvider>
  );
}
