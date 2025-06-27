"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  isFloating?: boolean;
}

const AnimatedHamburger: React.FC<AnimatedHamburgerProps> = ({
  isOpen,
  onClick,
  isFloating = false,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative h-12 w-12 rounded-full transition-colors flex items-center justify-center z-50 ${
        isFloating
          ? "bg-white/90 backdrop-blur-md shadow-lg hover:bg-white border border-gray-200/50"
          : "bg-transparent hover:bg-white/20"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-6 h-6 relative">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute top-1 left-0 h-0.5 w-6 rounded-full origin-center ${
            isFloating ? "bg-gray-800" : "bg-gray-800 dark:bg-white"
          }`}
          style={{ transformOrigin: "center" }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute top-3 left-0 h-0.5 w-6 rounded-full ${
            isFloating ? "bg-gray-800" : "bg-gray-800 dark:bg-white"
          }`}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute top-5 left-0 h-0.5 w-6 rounded-full origin-center ${
            isFloating ? "bg-gray-800" : "bg-gray-800 dark:bg-white"
          }`}
          style={{ transformOrigin: "center" }}
        />
      </div>
    </motion.button>
  );
};

export default AnimatedHamburger;
