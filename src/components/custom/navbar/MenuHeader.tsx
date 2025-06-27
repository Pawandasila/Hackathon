"use client";

import React from "react";
import { motion } from "framer-motion";

const MenuHeader: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        className="flex-1 text-left pr-4"
      >
        <motion.h1 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Navigate Your
        </motion.h1>
        <motion.h2 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-700 mb-2 sm:mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Sustainable Journey
        </motion.h2>
        <motion.div 
          className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </motion.div>
    </div>
  );
};

export default MenuHeader;
