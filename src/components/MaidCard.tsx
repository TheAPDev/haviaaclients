import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Clock, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Maid } from '../types';

interface MaidCardProps {
  maid: Maid;
  onHire: (maid: Maid) => void;
  canHire: boolean;
}

const MaidCard: React.FC<MaidCardProps> = ({ maid, onHire, canHire }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="relative">
            <img
              src={maid.photo}
              alt={maid.name}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-4 border-blue-100"
            />
            <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 bg-green-500 w-4 sm:w-6 h-4 sm:h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1 sm:w-2 h-1 sm:h-2 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg sm:text-xl font-montserrat font-semibold text-blue-900">
                {maid.name}
              </h3>
              <div className="flex items-center space-x-1">
                <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 fill-current" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">{maid.rating}</span>
              </div>
            </div>

            <div className="flex items-center text-xs sm:text-sm text-blue-600 mb-2">
              <Clock className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
              {maid.experience} years experience
            </div>

            <div className="flex items-center text-xs sm:text-sm text-blue-600 mb-3">
              <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
              {maid.locality}
            </div>

            <div className="text-xl sm:text-2xl font-montserrat font-bold text-blue-900">
              ₹{maid.monthlyPrice.toLocaleString()}
              <span className="text-xs sm:text-sm text-blue-600 font-normal"> /month</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-blue-100"
            >
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Contact</h4>
                  <div className="flex items-center text-xs sm:text-sm text-blue-600">
                    <Mail className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                    {maid.email}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {maid.skillset.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {maid.languages.map((language) => (
                      <span
                        key={language}
                        className="px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 text-xs sm:text-sm rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpanded(!expanded)}
            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
          >
            More Info
            {expanded ? (
              <ChevronUp className="w-3 sm:w-4 h-3 sm:h-4 ml-2" />
            ) : (
              <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4 ml-2" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: canHire ? 1.02 : 1 }}
            whileTap={{ scale: canHire ? 0.98 : 1 }}
            onClick={() => canHire && onHire(maid)}
            disabled={!canHire}
            className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
              canHire
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Hire Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MaidCard;