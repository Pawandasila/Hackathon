"use client";
import React from "react";
import { motion } from "framer-motion";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  tooltip?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = "button",
  ariaLabel,
  tooltip,
}) => {
  const baseClasses = `
    backdrop-blur-sm font-medium transition-all duration-300 
    flex items-center justify-center space-x-2 rounded-lg
    border group relative overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    active:transform active:scale-95
    ${fullWidth ? "w-full" : "w-auto"}
    ${disabled || loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
  `;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600/90 to-blue-700/90 
      border-blue-500/50 text-white 
      hover:from-blue-500/90 hover:to-blue-600/90 
      hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/25
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/20 before:to-transparent before:opacity-0 
      before:transition-opacity before:duration-300 hover:before:opacity-100
    `,
    secondary: `
      bg-white/10 border-white/30 text-white 
      hover:bg-white/20 hover:border-white/50
      hover:shadow-lg hover:shadow-white/10
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/10 before:to-transparent before:opacity-0 
      before:transition-opacity before:duration-300 hover:before:opacity-100
    `,
    ghost: `
      bg-transparent border-transparent text-white 
      hover:bg-white/10 hover:border-white/20
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/5 before:to-transparent before:opacity-0 
      before:transition-opacity before:duration-300 hover:before:opacity-100
    `,
    danger: `
      bg-gradient-to-r from-red-600/90 to-red-700/90 
      border-red-500/50 text-white 
      hover:from-red-500/90 hover:to-red-600/90 
      hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/25
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-white/20 before:to-transparent before:opacity-0 
      before:transition-opacity before:duration-300 hover:before:opacity-100
    `,
  };

  const LoadingSpinner = () => (
    <motion.div
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const DefaultArrow = () => (
    <svg
      width="12"
      height="8"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
    >
      <path
        d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
        fill="currentColor"
      />
    </svg>
  );

  const buttonContent = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {!loading && (rightIcon || (!leftIcon && !rightIcon)) && (
        <span className="flex-shrink-0">
          {rightIcon || <DefaultArrow />}
        </span>
      )}
    </>
  );

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]} ${className}`}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      aria-label={ariaLabel}
      title={tooltip}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {buttonContent}
    </motion.button>
  );
};

// Usage Examples Component
export const ButtonExamples: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const HeartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );

  const DownloadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15.577l-3.538-3.539 1.061-1.061L12 13.454l2.477-2.477 1.061 1.061L12 15.577zM12 3.423l8.479 8.479-1.061 1.061L12 5.544 4.582 12.963l-1.061-1.061L12 3.423z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Enhanced Glassy Buttons
        </h1>
        
        {/* Variants */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <CustomButton variant="primary">Primary Button</CustomButton>
            <CustomButton variant="secondary">Secondary Button</CustomButton>
            <CustomButton variant="ghost">Ghost Button</CustomButton>
            <CustomButton variant="danger">Danger Button</CustomButton>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <CustomButton size="sm">Small</CustomButton>
            <CustomButton size="md">Medium</CustomButton>
            <CustomButton size="lg">Large</CustomButton>
          </div>
        </div>

        {/* With Icons */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <CustomButton leftIcon={<HeartIcon />}>Like</CustomButton>
            <CustomButton rightIcon={<DownloadIcon />}>Download</CustomButton>
            <CustomButton leftIcon={<HeartIcon />} rightIcon={<DownloadIcon />}>
              Save & Download
            </CustomButton>
          </div>
        </div>

        {/* States */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">States</h2>
          <div className="flex flex-wrap gap-4">
            <CustomButton disabled>Disabled</CustomButton>
            <CustomButton loading={loading} onClick={handleAsyncAction}>
              {loading ? "Processing..." : "Start Process"}
            </CustomButton>
          </div>
        </div>

        {/* Full Width */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Full Width</h2>
          <CustomButton fullWidth variant="primary">
            Full Width Button
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CustomButton;