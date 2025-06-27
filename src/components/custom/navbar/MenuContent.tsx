"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import FlipLink from "../FLipLink";
import ButtonCustom from "../../ui/Button.custom";

interface NavigationItem {
  name: string;
  href: string;
}

interface MenuContentProps {
  navItems: NavigationItem[];
  setIsOpen: (isOpen: boolean) => void;
}

const MenuContent: React.FC<MenuContentProps> = ({ navItems, setIsOpen }) => {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        delayChildren: 0.1,
        duration: 1.0,
      },
    },
  };

  const menuItemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -45,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      rotateX: 90,
      scale: 0.7,
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const,
        type: "tween" as const,
      },
    },
  };

  const socialItemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.8,
      rotate: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.2 + i * 0.05,
        duration: 0.3,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    }),
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.4,
      rotate: 180,
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
        type: "tween" as const,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <div className="flex-shrink-0 h-24 sm:h-28 md:h-32 mb-3" />
      
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-20 xl:px-24">
        <motion.div
          variants={menuContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-4 mt-2 sm:space-y-6 md:space-y-8 mb-10 text-center md:text-left"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              variants={menuItemVariants}
              className="overflow-hidden group"
              style={{ perspective: "1000px" }}
            >
              <motion.div 
                onClick={() => setIsOpen(false)}
                className="relative"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 b p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.02 }}
                />
                
                <motion.span
                  className="absolute -left-8 sm:-left-12 md:-left-16 top-1/2 transform -translate-y-1/2 text-emerald-300/60 font-mono text-sm sm:text-base hidden md:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  0{index + 1}
                </motion.span>
                
                <FlipLink href={item.href}>
                  {item.name}
                </FlipLink>
                
                <motion.div
                  className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="space-y-6 sm:space-y-8 flex items-center justify-between"
        >
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.div
                  key={social.label}
                  custom={index}
                  variants={socialItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group"
                >
                  <motion.a
                    href={social.href}
                    className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-white/60 backdrop-blur-md border border-emerald-200/50 text-gray-600 hover:text-emerald-600 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 10px 25px rgba(16, 185, 129, 0.25)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10" />
                    
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      {social.label}
                    </motion.div>
                  </motion.a>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, type: "spring", stiffness: 200 }}
            className="flex justify-center md:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <ButtonCustom value="START YOUR ECO JOURNEY" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="flex-shrink-0 h-8 sm:h-12 md:h-16" />
    </div>
  );
};

export default MenuContent;
