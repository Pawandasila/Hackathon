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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Set active index based on current route
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentIndex = navItems.findIndex(
      (item) => item.href === currentPath
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, []);

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
  }, [isMobile, isTablet, isDesktop]);
  useEffect(() => {
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
                    {/* Active indicator - always shows for active item */}
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
                    {/* Hover indicator - only shows for hovered item when it's not active */}
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
            {/* Enhanced Background with More Sophisticated Animations */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Dynamic Gradient Mesh */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.12) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(5, 150, 105, 0.08) 0%, transparent 50%)
                  `,
                }}
                animate={{
                  background: [
                    `radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.12) 0%, transparent 50%),
                     radial-gradient(circle at 40% 40%, rgba(5, 150, 105, 0.08) 0%, transparent 50%)`,
                    `radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.18) 0%, transparent 60%),
                     radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
                     radial-gradient(circle at 60% 60%, rgba(5, 150, 105, 0.10) 0%, transparent 60%)`,
                    `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 50%),
                     radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
                     radial-gradient(circle at 70% 30%, rgba(5, 150, 105, 0.06) 0%, transparent 50%)`,
                  ],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Floating Geometric Elements */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`geo-${i}`}
                  className={`absolute ${
                    i % 4 === 0
                      ? "w-6 h-6 rounded-full bg-gradient-to-br from-emerald-200/30 to-green-300/20"
                      : i % 4 === 1
                      ? "w-4 h-4 rounded bg-gradient-to-br from-teal-200/25 to-emerald-300/15 rotate-45"
                      : i % 4 === 2
                      ? "w-8 h-1 rounded-full bg-gradient-to-r from-green-200/20 to-emerald-200/15"
                      : "w-3 h-8 rounded-full bg-gradient-to-b from-emerald-200/20 to-green-200/10"
                  }`}
                  initial={{
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                    y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: [
                      Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                      Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                    ],
                    y: [
                      Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                      Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                    ],
                    opacity: [0, 0.6, 0],
                    scale: [0, 1.2, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Animated Light Rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute top-0 left-1/2 w-0.5 origin-top"
                  style={{
                    height: "100vh",
                    background: `linear-gradient(to bottom, rgba(16, 185, 129, 0.1), transparent)`,
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: "top center",
                  }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    scaleY: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Morphing Blob Shapes */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`blob-${i}`}
                  className="absolute rounded-full filter blur-2xl"
                  style={{
                    width: `${150 + i * 50}px`,
                    height: `${150 + i * 50}px`,
                    left: `${15 + i * 20}%`,
                    top: `${10 + i * 20}%`,
                    background: `radial-gradient(circle, ${
                      i % 2 === 0
                        ? "rgba(16, 185, 129, 0.08)"
                        : "rgba(34, 197, 94, 0.06)"
                    } 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [0.8, 1.4, 0.8],
                    x: [-30, 30, -30],
                    y: [-20, 20, -20],
                    borderRadius: ["50%", "40% 60%", "50%"],
                  }}
                  transition={{
                    duration: 12 + i * 2,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Interactive Particle System */}
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-emerald-400/40 rounded-full"
                  initial={{
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                    y: typeof window !== "undefined" ? window.innerHeight : 800,
                    scale: 0,
                  }}
                  animate={{
                    y: -100,
                    x: [
                      Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                      Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                    ],
                    scale: [0, Math.random() * 2 + 0.5, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Pulsing Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute top-1/2 left-1/2 border border-emerald-300/20 rounded-full"
                  style={{
                    width: `${200 + i * 100}px`,
                    height: `${200 + i * 100}px`,
                    marginLeft: `-${100 + i * 50}px`,
                    marginTop: `-${100 + i * 50}px`,
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0, 0.3, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Close button and Header Section at the top */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between p-4 sm:p-6">
              {/* Enhanced Brand Section - At the top with close button */}
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
                        {/* Enhanced Menu Item Background */}
                        <motion.div
                          className="absolute inset-0 b p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.02 }}
                        />
                        
                        {/* Menu Item Number */}
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
                        
                        {/* Animated Arrow */}
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

                {/* Enhanced Footer Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="space-y-6 sm:space-y-8  flex items-center justify-between"
                >
                  {/* Social Links with Enhanced Styling */}
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
                            {/* Background Glow Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={false}
                            />
                            
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10" />
                            
                            {/* Tooltip */}
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

                  {/* Call to Action Button */}
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
                      {/* Animated background glow */}
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

                  {/* Additional Info Text */}
                  
                </motion.div>
              </div>
              
              {/* Bottom Spacer */}
              <div className="flex-shrink-0 h-8 sm:h-12 md:h-16" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
