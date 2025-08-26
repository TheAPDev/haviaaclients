import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, AlertCircle, RefreshCw } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';

const Sessions = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  // Mock booked session
  const booking = {
    id: '1',
    maidName: 'Priya Sharma',
    maidPhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 3,
    dailyHours: 2,
    timeSlot: '9:00 AM - 11:00 AM',
    startDate: '2025-01-20',
    totalAmount: 36000,
    remainingAmount: 25200,
    status: 'active'
  };

  const handleCancel = () => {
    if (cancelReason) {
      // Handle cancellation logic
      console.log('Cancelling with reason:', cancelReason);
      setShowCancelModal(false);
    }
  };

  const handleReplace = () => {
    // Handle replacement logic
    setShowReplaceModal(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-montserrat font-bold text-blue-900 mb-2">
            Booked Sessions
          </h1>
          <p className="text-sm sm:text-base text-blue-600 font-inter">
            Manage your active and upcoming bookings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6 lg:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-6">
            <img
              src={booking.maidPhoto}
              alt={booking.maidName}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-4 border-blue-100 mx-auto sm:mx-0"
            />
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-blue-900 mb-2 text-center sm:text-left">
                {booking.maidName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center text-blue-600">
                  <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                  {booking.duration} months duration
                </div>
                <div className="flex items-center text-blue-600">
                  <Clock className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                  {booking.dailyHours} hours daily ({booking.timeSlot})
                </div>
                <div className="flex items-center text-blue-600">
                  <DollarSign className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                  Total: ₹{booking.totalAmount.toLocaleString()}
                </div>
                <div className="flex items-center text-green-600">
                  Started: {new Date(booking.startDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span className="inline-block px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-semibold">
                Active
              </span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Payment Status</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-blue-600">Advance Paid:</span>
                <span className="font-semibold text-green-600 ml-2">
                  ₹{(booking.totalAmount - booking.remainingAmount).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-blue-600">Remaining:</span>
                <span className="font-semibold text-blue-800 ml-2">
                  ₹{booking.remainingAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowReplaceModal(true)}
              className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <RefreshCw className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
              Replace Maid
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <AlertCircle className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
              Cancel Service
            </button>
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-100 rounded-lg">
            <p className="text-yellow-800 text-xs sm:text-sm">
              <strong>Note:</strong> Service cancellation requires minimum 1 month completion. 
              Maid replacement requires minimum 2 weeks notice. You cannot hire another maid while one is active.
            </p>
          </div>
        </motion.div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-blue-900 mb-4">
                Cancel Service
              </h3>
              <div className="mb-4">
                <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2">
                  Reason for cancellation *
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                  rows={3}
                  placeholder="Please provide a reason..."
                />
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm sm:text-base"
                >
                  Keep Service
                </button>
                <button
                  onClick={handleCancel}
                  disabled={!cancelReason}
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Replace Modal */}
        {showReplaceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-md w-full text-center mx-4"
            >
              <RefreshCw className="w-12 sm:w-16 h-12 sm:h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-blue-900 mb-4">
                Replace Maid Request
              </h3>
              <p className="text-sm sm:text-base text-blue-600 mb-4 sm:mb-6">
                Your replacement request is now under review. We'll contact you within 24 hours 
                with available options.
              </p>
              <button
                onClick={handleReplace}
                className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm sm:text-base"
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

export default Sessions;