import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Shield, Check, Star } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { Maid } from '../types';

const Hire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const maid = location.state?.maid as Maid;
  
  const [duration, setDuration] = useState(1);
  const [dailyHours, setDailyHours] = useState(2);
  const [timeSlot, setTimeSlot] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!maid) {
    navigate('/dashboard');
    return null;
  }

  const hourMultiplier = dailyHours === 2 ? 1 : 1.25;
  const totalAmount = Math.round(maid.monthlyPrice * duration * hourMultiplier);
  const advanceAmount = Math.round(totalAmount * 0.3);
  const remainingAmount = totalAmount - advanceAmount;

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '9:00 AM - 11:00 AM',
    '10:00 AM - 12:00 PM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '3:00 PM - 5:00 PM',
  ];

  const handleHire = () => {
    if (!timeSlot) return;
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Save booking logic here
    navigate('/sessions');
  };

  const serviceStart = new Date();
  serviceStart.setDate(serviceStart.getDate() + 3);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-montserrat font-bold text-blue-900 mb-2">
            Hire Maid
          </h1>
          <p className="text-sm sm:text-base text-blue-600 font-inter">
            Complete your booking details
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Maid Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6">
              <div className="text-center mb-6">
                <img
                  src={maid.photo}
                  alt={maid.name}
                  className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                />
                <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-blue-900 mb-1">
                  {maid.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 fill-current" />
                  <span className="text-xs sm:text-sm text-gray-700">{maid.rating}</span>
                </div>
                <p className="text-blue-600 text-xs sm:text-sm">{maid.experience} years experience</p>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-blue-600 mb-1">Base Monthly Rate</p>
                  <p className="text-xl sm:text-2xl font-montserrat font-bold text-blue-900">
                    ₹{maid.monthlyPrice.toLocaleString()}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {maid.skillset.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs sm:text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-6">
                {/* Duration Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2 sm:mb-3">
                    <Calendar className="inline w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                    Duration (Months)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((month) => (
                      <button
                        key={month}
                        onClick={() => setDuration(month)}
                        className={`p-2 sm:p-3 rounded-lg border transition-all text-sm sm:text-base ${
                          duration === month
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Daily Hours Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2 sm:mb-3">
                    <Clock className="inline w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                    Daily Hours
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={() => setDailyHours(2)}
                      className={`p-3 sm:p-4 rounded-lg border transition-all ${
                        dailyHours === 2
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-semibold text-sm sm:text-base">2 Hours</div>
                      <div className="text-xs sm:text-sm">Base Price</div>
                    </button>
                    <button
                      onClick={() => setDailyHours(4)}
                      className={`p-3 sm:p-4 rounded-lg border transition-all ${
                        dailyHours === 4
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-semibold text-sm sm:text-base">4 Hours</div>
                      <div className="text-xs sm:text-sm">+25% Price</div>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
                    <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-500">
                      <div className="font-semibold text-sm sm:text-base">6 Hours</div>
                      <div className="text-xs sm:text-sm">Coming Soon</div>
                    </div>
                    <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-500">
                      <div className="font-semibold text-sm sm:text-base">8 Hours</div>
                      <div className="text-xs sm:text-sm">Coming Soon</div>
                    </div>
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2 sm:mb-3">
                    Time Slot Selection
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`p-2 sm:p-3 rounded-lg border transition-all text-xs sm:text-sm ${
                          timeSlot === slot
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* What Haviaa Provides */}
                <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                  <h4 className="font-semibold text-blue-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <Shield className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    What Haviaa Provides
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-blue-700">
                    {[
                      'Police-verified maids',
                      'Health & hygiene training',
                      'Background verification',
                      '24/7 customer support',
                      'Insurance coverage',
                      'Regular quality checks'
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center">
                        <Check className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-green-600 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                  <h4 className="font-semibold text-blue-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Pricing Summary
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Monthly Rate × {duration} months × {hourMultiplier}x</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 mt-2">
                      <div className="flex justify-between font-semibold text-base sm:text-lg">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-blue-600 mt-1">
                        <span>Advance (30%)</span>
                        <span>₹{advanceAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-blue-600">
                        <span>Remaining</span>
                        <span>₹{remainingAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-100 rounded-lg">
                    <p className="text-yellow-800 text-xs sm:text-sm">
                      💡 Service starts 3 days after booking confirmation<br/>
                      📅 Start Date: {serviceStart.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Hire Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleHire}
                  disabled={!timeSlot}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg disabled:opacity-50 text-sm sm:text-base"
                >
                  Hire Now - Pay ₹{advanceAmount.toLocaleString()} Advance
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center mx-4"
            >
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-blue-900 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-sm sm:text-base text-blue-600 mb-4 sm:mb-6">
                Your service will start on {serviceStart.toLocaleDateString()}
              </p>
              <button
                onClick={handleConfirm}
                className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Hire;