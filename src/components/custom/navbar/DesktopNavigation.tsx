"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
}

interface DesktopNavigationProps {
  navItems: NavigationItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  showHamburger: boolean;
  scrolled: boolean;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navItems,
  activeIndex,
  setActiveIndex,
  hoveredIndex,
  setHoveredIndex,
  showHamburger,
  scrolled,
}) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.8,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        type: "spring" as const,
        stiffness: 120,
        damping: 15,
      },
    }),
  };

  return (
    <motion.div
      className={`hidden md:flex items-center space-x-1 transition-all duration-300 ${
        showHamburger ? "md:hidden" : ""
      }`}
      animate={{
        opacity: showHamburger ? 0 : 1,
        x: showHamburger ? -20 : 0,
      }}
      initial={false}
    >
      {navItems.map((item, index) => (
        <motion.div
          key={item.name}
          custom={index}
          variants={itemVariants}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative"
        >
          <Link
            href={item.href}
            onClick={() => setActiveIndex(index)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
              activeIndex === index
                ? "text-blue-600"
                : hoveredIndex === index
                ? "text-blue-600"
                : scrolled
                ? "text-gray-700 hover:text-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`}
          >
            {item.name}
            {/* Active indicator */}
            {activeIndex === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            {/* Hover indicator */}
            {hoveredIndex === index && activeIndex !== index && (
              <motion.div
                layoutId="hoverIndicator"
                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-100 rounded-full -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DesktopNavigation;
