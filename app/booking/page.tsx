'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Home, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

interface BookingFormData {
  serviceType: string;
  serviceFrequency: string;
  date: string;
  time: string;
  duration: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialInstructions?: string;
}

const services = [
  { id: 'regular', name: 'Regular Cleaning', icon: Home, price: 80 },
  { id: 'deep', name: 'Deep Cleaning', icon: Sparkles, price: 150 },
  { id: 'move-in', name: 'Move-in/Move-out', icon: Home, price: 200 },
  { id: 'office', name: 'Office Cleaning', icon: Home, price: 120 },
];

const frequencies = [
  { id: 'once', name: 'One-time', discount: 0 },
  { id: 'weekly', name: 'Weekly', discount: 20 },
  { id: 'biweekly', name: 'Bi-weekly', discount: 15 },
  { id: 'monthly', name: 'Monthly', discount: 10 },
];

const durations = [
  { hours: '2', label: '2 hours' },
  { hours: '3', label: '3 hours' },
  { hours: '4', label: '4 hours' },
  { hours: '5', label: '5+ hours' },
];

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('once');
  
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    console.log('Booking submitted:', data);
    // In a real app, this would submit to an API
    alert('Booking submitted successfully! We\'ll contact you soon to confirm.');
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedFrequencyData = frequencies.find(f => f.id === selectedFrequency);
  
  const basePrice = selectedServiceData?.price || 0;
  const discount = selectedFrequencyData?.discount || 0;
  const finalPrice = basePrice * (1 - discount / 100);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">CleanFlow</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Service Details</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Schedule & Location</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Contact Info</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Service Details */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Service</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">Service Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 border rounded-lg text-left transition ${
                          selectedService === service.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-blue-600 mb-2" />
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-gray-700">Starting at ${service.price}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">Cleaning Frequency</label>
                <div className="space-y-2">
                  {frequencies.map((freq) => (
                    <label
                      key={freq.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${
                        selectedFrequency === freq.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        value={freq.id}
                        checked={selectedFrequency === freq.id}
                        onChange={(e) => setSelectedFrequency(e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="flex-1 font-medium text-gray-900">{freq.name}</span>
                      {freq.discount > 0 && (
                        <span className="text-green-600 font-semibold">Save {freq.discount}%</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {selectedService && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">Estimated Price:</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${finalPrice.toFixed(2)}
                    {selectedFrequency !== 'once' && <span className="text-sm font-normal">/cleaning</span>}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={nextStep}
                disabled={!selectedService}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Schedule & Location */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Cleaning</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Preferred Time
                  </label>
                  <select
                    {...register('time', { required: 'Time is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="" className="text-gray-500">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Estimated Duration
                </label>
                <select
                  {...register('duration', { required: 'Duration is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="" className="text-gray-500">Select duration</option>
                  {durations.map((duration) => (
                    <option key={duration.hours} value={duration.hours}>{duration.label}</option>
                  ))}
                </select>
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">Service Address</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Street Address</label>
                  <input
                    type="text"
                    {...register('address', { required: 'Address is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="123 Main Street"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-900 mb-2">City</label>
                    <input
                      type="text"
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-900 mb-2">State</label>
                    <input
                      type="text"
                      {...register('state', { required: 'State is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
                      maxLength={2}
                      placeholder="CA"
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-900 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      {...register('zipCode', { required: 'ZIP code is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
                      maxLength={5}
                      placeholder="12345"
                    />
                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">First Name</label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Last Name</label>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  {...register('specialInstructions')}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Any special requests or access instructions..."
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm text-gray-900">
                  <p>Service: {selectedServiceData?.name}</p>
                  <p>Frequency: {selectedFrequencyData?.name}</p>
                  <p className="font-semibold text-blue-600">Total: ${finalPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}