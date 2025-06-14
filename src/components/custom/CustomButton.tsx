'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseClasses = "px-8 py-3 rounded-lg font-medium transition-all duration-200 border-2";
  
  const variants = {
    primary: "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700",
    secondary: "bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default CustomButton;
