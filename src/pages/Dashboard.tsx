import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/Layout/DashboardLayout';
import MaidCard from '../components/MaidCard';
import FilterModal, { FilterOptions } from '../components/FilterModal';
import { maids } from '../data/maids';
import { Maid } from '../types';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    locality: '',
    minExperience: 0,
    maxExperience: 10,
    languages: [],
    priceRange: [8000, 20000]
  });

  const filteredMaids = useMemo(() => {
    return maids.filter(maid => {
      if (filters.locality && maid.locality !== filters.locality) return false;
      if (maid.experience < filters.minExperience || maid.experience > filters.maxExperience) return false;
      if (maid.monthlyPrice < filters.priceRange[0] || maid.monthlyPrice > filters.priceRange[1]) return false;
      if (filters.languages.length > 0) {
        const hasMatchingLanguage = filters.languages.some(lang => maid.languages.includes(lang));
        if (!hasMatchingLanguage) return false;
      }
      return true;
    });
  }, [filters]);

  const handleHire = (maid: Maid) => {
    if (!user?.profileComplete) {
      navigate('/profile');
      return;
    }
    navigate('/hire', { state: { maid } });
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const canHire = user?.profileComplete || false;

  return (
    <DashboardLayout>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-montserrat font-bold text-blue-900 mb-2">
            Available Maids
          </h1>
          <p className="text-sm sm:text-base text-blue-600 font-inter">
            Choose from our verified and professional housekeeping staff
          </p>
          
          {!canHire && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 p-3 sm:p-4 bg-yellow-100 border border-yellow-300 rounded-lg"
            >
              <p className="text-yellow-800 font-inter text-sm sm:text-base">
                ⚠️ Please complete your profile to hire maids.{' '}
                <button
                  onClick={() => navigate('/profile')}
                  className="font-semibold underline hover:no-underline"
                >
                  Complete Profile
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredMaids.map((maid, index) => (
            <motion.div
              key={maid.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MaidCard
                maid={maid}
                onHire={handleHire}
                canHire={canHire}
              />
            </motion.div>
          ))}
        </div>

        {filteredMaids.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12"
          >
            <p className="text-blue-600 text-base sm:text-lg font-inter px-4">
              No maids match your current filters. Try adjusting your preferences.
            </p>
          </motion.div>
        )}

        {/* Floating Filter Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowFilters(true)}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 z-30"
        >
          <Filter className="w-5 sm:w-6 h-5 sm:h-6" />
        </motion.button>

        {/* Filter Modal */}
        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;