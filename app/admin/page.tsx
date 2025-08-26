'use client';

import { useState } from 'react';
import {
  BarChart3,
  Calendar,
  DollarSign,
  Home,
  LogOut,
  Menu,
  Star,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

// Mock data for dashboard
const stats = {
  totalBookings: 1247,
  monthlyRevenue: 45680,
  activeCleaners: 24,
  satisfactionScore: 4.8,
};

const recentBookings = [
  { id: 1, customer: 'Sarah Johnson', service: 'Regular Cleaning', date: '2024-01-15', time: '9:00 AM', status: 'Completed', amount: 80 },
  { id: 2, customer: 'Mike Williams', service: 'Deep Cleaning', date: '2024-01-15', time: '2:00 PM', status: 'In Progress', amount: 150 },
  { id: 3, customer: 'Emily Davis', service: 'Move-in Cleaning', date: '2024-01-16', time: '10:00 AM', status: 'Scheduled', amount: 200 },
  { id: 4, customer: 'James Brown', service: 'Office Cleaning', date: '2024-01-16', time: '4:00 PM', status: 'Scheduled', amount: 120 },
  { id: 5, customer: 'Lisa Anderson', service: 'Regular Cleaning', date: '2024-01-17', time: '11:00 AM', status: 'Scheduled', amount: 80 },
];

const topCleaners = [
  { id: 1, name: 'Maria Garcia', jobs: 145, rating: 4.9, revenue: 11600 },
  { id: 2, name: 'John Smith', jobs: 132, rating: 4.8, revenue: 10560 },
  { id: 3, name: 'Anna Lee', jobs: 128, rating: 4.9, revenue: 10240 },
  { id: 4, name: 'Robert Chen', jobs: 118, rating: 4.7, revenue: 9440 },
];

// Mock chart data
const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 45000 },
  { month: 'Mar', revenue: 43500 },
  { month: 'Apr', revenue: 48000 },
  { month: 'May', revenue: 51000 },
  { month: 'Jun', revenue: 45680 },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: Home },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'cleaners', name: 'Cleaners', icon: Users },
    { id: 'revenue', name: 'Revenue', icon: DollarSign },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">CleanFlow Admin</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-white lg:shadow-lg lg:block">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">CleanFlow Admin</h1>
        </div>
        <nav className="p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
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
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, Admin</span>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <>
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-10 h-10 text-blue-600" />
                    <span className="text-sm text-green-600 font-semibold">+12%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalBookings.toLocaleString()}</h3>
                  <p className="text-gray-600">Total Bookings</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-10 h-10 text-green-600" />
                    <span className="text-sm text-green-600 font-semibold">+8%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">${stats.monthlyRevenue.toLocaleString()}</h3>
                  <p className="text-gray-600">Monthly Revenue</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-10 h-10 text-purple-600" />
                    <span className="text-sm text-green-600 font-semibold">+2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.activeCleaners}</h3>
                  <p className="text-gray-600">Active Cleaners</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Star className="w-10 h-10 text-yellow-500" />
                    <span className="text-sm text-green-600 font-semibold">+0.1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.satisfactionScore}</h3>
                  <p className="text-gray-600">Satisfaction Score</p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {revenueData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-600 rounded-t"
                        style={{ height: `${(data.revenue / 60000) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${booking.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Cleaners */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Top Performing Cleaners</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topCleaners.map((cleaner) => (
                      <div key={cleaner.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {cleaner.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{cleaner.name}</h4>
                            <p className="text-sm text-gray-600">{cleaner.jobs} jobs completed</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold">{cleaner.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600">${cleaner.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'overview' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {sidebarItems.find(item => item.id === activeTab)?.name}
              </h3>
              <p className="text-gray-600">
                This section is under development. More features coming soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}