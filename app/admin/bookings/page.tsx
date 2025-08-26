'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, User, DollarSign, Calendar as CalendarIcon } from 'lucide-react';

// Mock booking data
const bookingsData = [
  { id: 1, customer: 'Sarah Johnson', cleaner: 'Maria Garcia', service: 'Regular Cleaning', date: '2024-01-15', time: '9:00 AM', status: 'completed', address: '123 Oak Street, SF', amount: 80 },
  { id: 2, customer: 'Mike Williams', cleaner: 'John Smith', service: 'Deep Cleaning', date: '2024-01-15', time: '2:00 PM', status: 'completed', address: '456 Pine Avenue, SF', amount: 150 },
  { id: 3, customer: 'Emily Davis', cleaner: 'Anna Lee', service: 'Move-in Cleaning', date: '2024-01-16', time: '10:00 AM', status: 'in_progress', address: '789 Elm Street, SF', amount: 200 },
  { id: 4, customer: 'James Brown', cleaner: 'Robert Chen', service: 'Office Cleaning', date: '2024-01-16', time: '4:00 PM', status: 'scheduled', address: '321 Market Street, SF', amount: 120 },
  { id: 5, customer: 'Lisa Anderson', cleaner: 'Maria Garcia', service: 'Regular Cleaning', date: '2024-01-17', time: '11:00 AM', status: 'scheduled', address: '555 Broadway, SF', amount: 80 },
  { id: 6, customer: 'David Wilson', cleaner: 'John Smith', service: 'Deep Cleaning', date: '2024-01-17', time: '1:00 PM', status: 'scheduled', address: '777 Valencia St, SF', amount: 150 },
  { id: 7, customer: 'Jennifer Martinez', cleaner: 'Anna Lee', service: 'Regular Cleaning', date: '2024-01-18', time: '9:00 AM', status: 'scheduled', address: '999 Mission St, SF', amount: 80 },
  { id: 8, customer: 'Robert Taylor', cleaner: 'Robert Chen', service: 'Move-out Cleaning', date: '2024-01-18', time: '2:00 PM', status: 'scheduled', address: '111 Powell St, SF', amount: 200 },
  { id: 9, customer: 'Maria Rodriguez', cleaner: 'Maria Garcia', service: 'Office Cleaning', date: '2024-01-19', time: '10:00 AM', status: 'scheduled', address: '222 Geary St, SF', amount: 120 },
  { id: 10, customer: 'William Lee', cleaner: 'John Smith', service: 'Regular Cleaning', date: '2024-01-19', time: '3:00 PM', status: 'scheduled', address: '333 Bush St, SF', amount: 80 },
];

// Calendar data structure
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  while (current <= lastDay || current.getDay() !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days;
};

export default function BookingsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookingsData.filter(booking => booking.date === dateStr);
  };
  
  const filteredBookings = selectedDate 
    ? getBookingsForDate(selectedDate)
    : bookingsData;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg ${
              view === 'calendar' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg ${
              view === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {view === 'calendar' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {dayNames.map(day => (
              <div key={day} className="bg-gray-50 p-3 text-center font-semibold text-gray-900">
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => {
              const bookings = getBookingsForDate(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();
              const isSelected = selectedDate?.toDateString() === day.toDateString();
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`bg-white p-3 min-h-[100px] cursor-pointer hover:bg-gray-50 ${
                    !isCurrentMonth ? 'text-gray-400' : ''
                  } ${isToday ? 'ring-2 ring-blue-600' : ''} ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="font-semibold mb-1 text-gray-900">{day.getDate()}</div>
                  {bookings.length > 0 && (
                    <div className="space-y-1">
                      {bookings.slice(0, 3).map((booking, i) => (
                        <div
                          key={i}
                          className={`text-xs p-1 rounded truncate ${
                            booking.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'in_progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {booking.time} - {booking.customer.split(' ')[0]}
                        </div>
                      ))}
                      {bookings.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{bookings.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedDate 
              ? `Bookings for ${selectedDate.toLocaleDateString()}`
              : 'All Bookings'
            }
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cleaner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{booking.date}</div>
                        <div className="text-gray-500">{booking.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{booking.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.cleaner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="mr-1 h-4 w-4" />
                      {booking.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
                      {booking.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}