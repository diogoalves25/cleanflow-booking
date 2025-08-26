'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Calendar,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  DollarSign,
  Mail,
  Receipt,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: Home, path: '/admin' },
    { id: 'bookings', name: 'Bookings', icon: Calendar, path: '/admin/bookings' },
    { id: 'cleaners', name: 'Cleaners', icon: Users, path: '/admin/cleaners' },
    { id: 'customers', name: 'Customers', icon: Users, path: '/admin/customers' },
    { id: 'payroll', name: 'Payroll', icon: DollarSign, path: '/admin/payroll' },
    { id: 'marketing', name: 'Marketing', icon: Mail, path: '/admin/marketing' },
    { id: 'expenses', name: 'Expenses', icon: Receipt, path: '/admin/expenses' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">CleanFlow Admin</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                      pathname === item.path
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-white lg:shadow-lg">
        <div className="flex-shrink-0 p-4 border-b">
          <div>
            <h1 className="text-xl font-bold text-blue-600">CleanFlow Admin</h1>
            <p className="text-xs text-gray-500">All {sidebarItems.length} menu items</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                    pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
        <div className="flex-shrink-0 p-4 border-t">
          <button 
            onClick={() => router.push('/')}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {sidebarItems.find(item => item.path === pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, Admin</span>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}