import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/Layout/DashboardLayout';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-6 sm:p-8 lg:p-12"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
          >
            <Clock className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-white" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-montserrat font-bold text-blue-900 mb-4">
            Coming Soon
          </h1>
          <p className="text-blue-600 font-inter text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
            We're working hard to bring you amazing new features. 
            This section will be available soon with exciting updates!
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            Back to Dashboard
          </motion.button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ComingSoon;