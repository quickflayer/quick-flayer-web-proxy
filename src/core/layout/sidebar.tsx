"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export function Sidebar() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  
  const isActive = (path: string) => pathname === path;
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'grid' },
    { name: 'Users', path: '/users', icon: 'users', adminOnly: true },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];
  
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="mt-8">
        <ul className="space-y-2">
          {navItems.map((item) => {
            // Skip admin-only items for non-admin users
            if (item.adminOnly && !isAdmin()) return null;
            
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center p-2 rounded-md transition-colors ${isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
