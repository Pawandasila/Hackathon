"use client";

import React from "react";
import { motion } from "framer-motion";

const Logo: React.FC = () => {
  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={logoVariants}
      className="flex items-center space-x-2"
    >
      <motion.div
        className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
        whileHover={{
          scale: 1.15,
          rotate: 360,
          boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)",
          transition: { duration: 0.5 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-lg">🌱</span>
      </motion.div>
      <motion.span
        className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent"
        whileHover={{
          scale: 1.05,
          textShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
        }}
      >
        EcoTrack360
      </motion.span>
    </motion.div>
  );
};

export default Logo;
