"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  User,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  X,
} from "lucide-react";
import { useMediaQuery } from "@/lib/use-media-query";
import Link from "next/link";
import FlipLink from "./FLipLink";
import ButtonCustom from "../ui/Button.custom";

const AnimatedHamburger = ({
  isOpen,
  onClick,
  isFloating = false,
}: {
  isOpen: boolean;
  onClick: () => void;
  isFloating?: boolean;
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
        {" "}
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 20;

      const heroSectionHeight = window.innerHeight;
      const isInNextSection = scrollY > heroSectionHeight * 0.8;

      setScrolled(isScrolled);

      if (isMobile || isTablet) {
        setShowHamburger(true);
      } else if (isDesktop) {
        setShowHamburger(isInNextSection);
      }
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, isTablet, isDesktop]);  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Rewards", href: "/rewards" },
    { name: "Marketing", href: "/marketing" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];
  const navVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: "easeInOut" as const,
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

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
  const overlayVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      transition: {
        duration: 0.2,
        ease: "easeOut" as const,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };
  // Enhanced exit variants for beautiful exit animation
  const overlayExitVariants = {
    opacity: 0,
    scale: 1.1,
    y: -50,
    filter: "blur(20px)",
    transition: {
      duration: 1.2, // Increased from 0.5 for slower exit
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }; // Menu item container variants
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced from 0.15
        delayChildren: 0, // Removed delay
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05, // Slower stagger for exit
        staggerDirection: -1,
        delayChildren: 0.1, // Added delay for exit
        duration: 1.0, // Slower overall exit
      },
    },
  };

  // Individual menu item variants with break effect
  const menuItemVariants = {
    hidden: {
      opacity: 0,
      y: 50, // Reduced from 100
      rotateX: -45, // Reduced from -90
      scale: 0.9, // Increased from 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.4, // Reduced from 0.8
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 200, // Increased for faster response
        damping: 20, // Increased for less bounce
      },
    },
    exit: {
      opacity: 0,
      y: -50, // Increased movement
      rotateX: 90, // More dramatic rotation
      scale: 0.7, // Smaller scale
      transition: {
        duration: 0.8, // Much slower exit
        ease: "easeInOut" as const,
        type: "tween" as const,
      },
    },
  }; // Social items with enhanced animation
  const socialItemVariants = {
    hidden: {
      opacity: 0,
      x: -30, // Reduced from -50
      scale: 0.8, // Increased from 0
      rotate: -90, // Reduced from -180
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.2 + i * 0.05, // Reduced delay and stagger
        duration: 0.3, // Reduced from 0.6
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 200, // Increased
        damping: 20, // Increased
      },
    }),
    exit: {
      opacity: 0,
      x: 50, // Increased movement
      scale: 0.4, // Smaller scale
      rotate: 180, // Full rotation
      transition: {
        duration: 0.6, // Slower exit
        ease: "easeInOut" as const,
        type: "tween" as const,
      },
    },
  };

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
    <>
      {/* Main Navbar - Completely hidden when hamburger should show on desktop */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          !isMobile && !isTablet && showHamburger
            ? "hidden"
            : scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50"
            : "bg-transparent"
        }`}
        style={{
          backdropFilter:
            scrolled && !(!isMobile && !isTablet && showHamburger)
              ? "blur(20px) saturate(180%)"
              : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <motion.div
              variants={logoVariants}
              className="flex items-center space-x-2"
            >
              {" "}
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
            </motion.div>{" "}
            {/* Enhanced Desktop Navigation - Show only on desktop when NOT scrolled into next section */}
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
                  onMouseEnter={() => setActiveIndex(index)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                      activeIndex === index
                        ? "text-blue-600"
                        : scrolled
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
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
                  </Link>
                </motion.div>
              ))}
            </motion.div>{" "}
            {/* Enhanced Right side icons - Hide when hamburger should show */}
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
            </motion.div>{" "}
            {/* Enhanced Mobile/Scroll menu button - Show on mobile/tablet OR when scrolled into next section */}
            <motion.div
              className={`transition-all duration-300 ${
                showHamburger ? "block" : "block md:hidden"
              }`}
              animate={{
                opacity: showHamburger ? 1 : isMobile || isTablet ? 1 : 0,
                scale: showHamburger ? 1 : isMobile || isTablet ? 1 : 0.8,
              }}
              initial={false}
            >
              <AnimatedHamburger
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </motion.div>
          </div>
        </div>
      </motion.nav>
      {/* Floating Hamburger Menu - Only visible when navbar is hidden on desktop */}
      <AnimatePresence>
        {!isMobile && !isTablet && showHamburger && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 right-4 z-50"
          >
            <AnimatedHamburger
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              isFloating={true}
            />
          </motion.div>
        )}
      </AnimatePresence>{" "}
      {/* Enhanced Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit={overlayExitVariants}
            className="fixed inset-0 z-40 bg-[#f6eee8] p-1 sm:p-2"
            style={{
              background:
                "linear-gradient(135deg, #f6eee8 0%, #e8dbc6 50%, #f6eee8 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset 0 0 100px rgba(16, 185, 129, 0.1)",
            }}
          >
            
            <div className="absolute inset-0 overflow-hidden">
              {/* Ambient glowing orbs */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`glow-${i}`}
                  className="absolute rounded-full filter blur-xl"
                  style={{
                    width: `${100 + i * 50}px`,
                    height: `${100 + i * 50}px`,
                    left: `${15 + i * 15}%`,
                    top: `${10 + i * 12}%`,
                    background: `radial-gradient(circle, ${
                      i % 2 === 0
                        ? "rgba(16, 185, 129, 0.15)"
                        : "rgba(34, 197, 94, 0.12)"
                    } 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.3, 0.6, 0.3],
                    x: [-20, 20],
                    y: [-15, 15],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Floating sparkles */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{
                    scale: 0,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    rotate: 360,
                    x: [-20, 20, -20],
                    y: [-20, 20, -20],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-1 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full">
                    <div className="absolute inset-0 bg-white/60 rounded-full animate-pulse" />
                  </div>
                </motion.div>
              ))}

              {/* Larger animated particles */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-3 h-3 bg-gradient-to-r from-emerald-300/40 to-green-400/40 rounded-full"
                  initial={{
                    x:
                      Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerWidth
                        : 1200),
                    y:
                      Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 800),
                    scale: 0,
                  }}
                  animate={{
                    y: -100,
                    scale: [0, 1.2, 0],
                    opacity: [0, 0.8, 0],
                    rotate: 720,
                  }}
                  transition={{
                    duration: 6 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Gradient waves */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at ${30 + i * 20}% ${
                      20 + i * 15
                    }%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Floating geometric shapes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`shape-${i}`}
                  className={`absolute ${
                    i % 3 === 0
                      ? "w-4 h-4 rounded-full"
                      : i % 3 === 1
                      ? "w-3 h-3 rounded"
                      : "w-2 h-6 rounded-full"
                  } bg-gradient-to-br from-emerald-200/30 to-green-300/30 backdrop-blur-sm`}
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${15 + i * 8}%`,
                  }}
                  animate={{
                    y: [-20, 20],
                    x: [-10, 10],
                    rotate: [0, 180],
                    scale: [0.8, 1.2],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />              ))}
            </div>
            
            {/* Close button for mobile */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:text-red-500 hover:bg-white transition-colors duration-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
              <div className="flex flex-col justify-center min-h-screen px-4 sm:px-6 md:px-16 relative z-10">              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-3 sm:space-y-4 md:space-y-6 mb-6 sm:mb-8 md:mb-10 text-center md:text-left"
              >
                {navItems.map((item, index) => (                  <motion.div
                    key={item.name}
                    variants={menuItemVariants}
                    className="overflow-hidden"
                    style={{ perspective: "1000px" }}
                  >
                    <div onClick={() => setIsOpen(false)}>
                      <FlipLink href={item.href}>
                        {item.name}
                      </FlipLink>
                    </div>
                  </motion.div>
                ))}
              </motion.div>              <div className="flex space-x-3 sm:space-x-4 md:space-x-6 justify-center sm:justify-start">
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
                    >
                      {" "}
                      <motion.a
                        href={social.href}
                        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/50 backdrop-blur-sm border border-amber-200 text-gray-700 hover:text-emerald-600 hover:bg-white/70 transition-colors duration-150"
                        whileHover={{
                          scale: 1.1, // Reduced from 1.2
                          rotate: 180, // Reduced from 360
                          boxShadow: "0 5px 15px rgba(16, 185, 129, 0.2)",
                          transition: { duration: 0.2 }, // Much faster
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </motion.a>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.3, // Reduced from 1.2
                    duration: 0.3, // Reduced from 0.6
                    type: "spring",
                    stiffness: 200, // Increased
                    damping: 20, // Increased
                  }}
                  className="ml-auto hidden sm:block"
                >
                  {/* <motion.button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 backdrop-blur-sm border border-emerald-300 text-white px-10 py-4 rounded-full font-medium hover:from-emerald-600 hover:to-green-700 transition-colors duration-200 flex items-center space-x-3 shadow-2xl"
                    whileHover={{
                      scale: 1.02, // Reduced from 1.05
                      boxShadow: "0 10px 20px rgba(16, 185, 129, 0.3)",
                      transition: { duration: 0.15 }, // Much faster
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">START YOUR ECO JOURNEY</span>
                    <motion.svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </motion.button> */}
                  <ButtonCustom value="START YOUR ECO JOURNEY" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
