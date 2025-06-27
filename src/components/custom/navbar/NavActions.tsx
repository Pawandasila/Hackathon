"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, User, ShoppingCart } from "lucide-react";

interface NavActionsProps {
  showHamburger: boolean;
  scrolled: boolean;
}

const NavActions: React.FC<NavActionsProps> = ({ showHamburger, scrolled }) => {
  return (
    <motion.div
      className={`items-center space-x-2 transition-all duration-300 ${
        showHamburger ? "hidden" : "hidden md:flex"
      }`}
      animate={{
        opacity: showHamburger ? 0 : 1,
        x: showHamburger ? 20 : 0,
      }}
      initial={false}
    >
      {[Search, User, ShoppingCart].map((Icon, index) => (
        <motion.button
          key={index}
          whileHover={{
            scale: 1.1,
            y: -2,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
          whileTap={{ scale: 0.9 }}
          className={`p-3 rounded-full transition-all duration-300 relative ${
            scrolled
              ? "text-gray-700 hover:bg-gray-100 hover:shadow-md"
              : "text-gray-800 hover:bg-white/20 hover:shadow-lg"
          }`}
        >
          <Icon className="w-5 h-5" />
          {Icon === ShoppingCart && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
            >
              3
            </motion.span>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default NavActions;
