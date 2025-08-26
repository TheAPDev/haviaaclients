import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  locality: string;
  minExperience: number;
  maxExperience: number;
  languages: string[];
  priceRange: [number, number];
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    locality: '',
    minExperience: 0,
    maxExperience: 10,
    languages: [],
    priceRange: [8000, 20000]
  });

  const localities = ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Jayanagar'];
  const languageOptions = ['Hindi', 'English', 'Kannada', 'Tamil', 'Gujarati', 'Punjabi'];

  const handleLanguageToggle = (language: string) => {
    setFilters(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const resetFilters = () => {
    setFilters({
      locality: '',
      minExperience: 0,
      maxExperience: 10,
      languages: [],
      priceRange: [8000, 20000]
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-blue-100 p-4 sm:p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Filter className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                  <h2 className="text-lg sm:text-xl font-montserrat font-semibold text-blue-900">
                    Filter Maids
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Locality */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2 sm:mb-3">
                  Locality/Area
                </label>
                <select
                  value={filters.locality}
                  onChange={(e) => setFilters({ ...filters, locality: e.target.value })}
                  className="w-full p-2 sm:p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                >
                  <option value="">All Areas</option>
                  {localities.map(locality => (
                    <option key={locality} value={locality}>{locality}</option>
                  ))}
                </select>
              </div>

              {/* Experience Range */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2 sm:mb-3">
                  Years of Experience
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <label className="text-xs text-blue-600 mb-1 block">Min</label>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={filters.minExperience}
                      onChange={(e) => setFilters({ ...filters, minExperience: Number(e.target.value) })}
                      className="w-full p-2 sm:p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-blue-600 mb-1 block">Max</label>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={filters.maxExperience}
                      onChange={(e) => setFilters({ ...filters, maxExperience: Number(e.target.value) })}
                      className="w-full p-2 sm:p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2 sm:mb-3">
                  Monthly Price Range
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <label className="text-xs text-blue-600 mb-1 block">Min (₹)</label>
                    <input
                      type="number"
                      min="5000"
                      max="25000"
                      step="1000"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters({ 
                        ...filters, 
                        priceRange: [Number(e.target.value), filters.priceRange[1]] 
                      })}
                      className="w-full p-2 sm:p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-blue-600 mb-1 block">Max (₹)</label>
                    <input
                      type="number"
                      min="5000"
                      max="25000"
                      step="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({ 
                        ...filters, 
                        priceRange: [filters.priceRange[0], Number(e.target.value)] 
                      })}
                      className="w-full p-2 sm:p-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-800 mb-2 sm:mb-3">
                  Language Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {languageOptions.map(language => (
                    <label
                      key={language}
                      className="flex items-center p-2 sm:p-3 rounded-lg border border-blue-200 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={filters.languages.includes(language)}
                        onChange={() => handleLanguageToggle(language)}
                        className="mr-2 sm:mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs sm:text-sm text-blue-800">{language}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-blue-100 p-4 sm:p-6 rounded-b-2xl">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-all text-sm sm:text-base"
                >
                  Reset
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;