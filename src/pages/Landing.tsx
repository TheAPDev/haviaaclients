import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-25 to-yellow-100 flex items-center justify-center overflow-hidden px-4">
      {/* Animated Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-yellow-50/30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(48, 86, 211, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(253, 246, 228, 0.3) 0%, transparent 50%)
          `,
        }}
      />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-blue-900 mb-6 lg:mb-8 leading-tight"
        >
          Welcome to{' '}
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"
          >
            Haviaa
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg sm:text-xl text-blue-700 mb-8 lg:mb-12 font-inter leading-relaxed px-4"
        >
          Premium housekeeping services with verified, professional maids at your doorstep
        </motion.p>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 20px 40px rgba(48, 86, 211, 0.3)" 
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/auth')}
          className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base sm:text-lg font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl font-inter"
        >
          Continue
        </motion.button>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-60 blur-xl"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-40 blur-xl"
        />
      </div>
    </div>
  );
};

export default Landing;