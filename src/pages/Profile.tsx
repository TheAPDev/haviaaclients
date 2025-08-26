import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Check } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    preferences: user?.preferences || []
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const preferenceOptions = [
    'Pet-friendly maid required',
    'Cooking support needed',
    'Elderly care experience',
    'Baby care experience',
    'Organic cleaning products only',
    'Deep cleaning focus',
    'Laundry and ironing',
    'Garden maintenance'
  ];

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProfile({
        ...formData,
        profileComplete: true
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const isComplete = formData.name && formData.email && formData.phone && formData.address;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-montserrat font-bold text-blue-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-sm sm:text-base text-blue-600 font-inter">
            Complete your profile to start hiring maids
          </p>
          {!user?.profileComplete && (
            <div className="mt-4 p-3 sm:p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 font-inter text-xs sm:text-sm">
                ⚠️ Profile completion is mandatory before hiring any services
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2">
                  Full Name *
                </label>
                <User className="absolute left-3 top-11 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2">
                  Email Address *
                </label>
                <Mail className="absolute left-3 top-11 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2">
                Contact Number *
              </label>
              <Phone className="absolute left-3 top-11 w-5 h-5 text-blue-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2">
                Full Address *
              </label>
              <MapPin className="absolute left-3 top-11 w-5 h-5 text-blue-400" />
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-4">
                Preferences (Optional)
              </label>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                {preferenceOptions.map((preference) => (
                  <label
                    key={preference}
                    className="flex items-center p-2 sm:p-3 rounded-lg border border-blue-200 hover:bg-blue-50 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferences.includes(preference)}
                      onChange={() => handlePreferenceToggle(preference)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${
                      formData.preferences.includes(preference)
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-blue-300'
                    }`}>
                      {formData.preferences.includes(preference) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-blue-800">{preference}</span>
                  </label>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading || !isComplete}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </motion.button>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 sm:p-4 bg-green-100 border border-green-300 rounded-lg"
              >
                <p className="text-green-800 text-center text-sm sm:text-base">
                  ✅ Profile updated successfully! You can now hire maids.
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;