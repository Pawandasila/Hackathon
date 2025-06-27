"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";

// Import sub-components
import AnimatedHamburger from "./navbar/AnimatedHamburger";
import Logo from "./navbar/Logo";
import DesktopNavigation from "./navbar/DesktopNavigation";
import NavActions from "./navbar/NavActions";
import MenuBackground from "./navbar/MenuBackground";
import MenuHeader from "./navbar/MenuHeader";
import MenuContent from "./navbar/MenuContent";

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

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Rewards", href: "/rewards" },
    { name: "Marketing", href: "/marketing" },
  ];
  // Set active index based on current route
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentIndex = navItems.findIndex(
      (item) => item.href === currentPath
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [navItems]);

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

  const overlayExitVariants = {
    opacity: 0,
    scale: 1.1,
    y: -50,
    filter: "blur(20px)",
    transition: {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  };

  return (
    <>
      {/* Main Navbar */}
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
            <Logo />
            
            <DesktopNavigation
              navItems={navItems}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              showHamburger={showHamburger}
              scrolled={scrolled}
            />

            <NavActions showHamburger={showHamburger} scrolled={scrolled} />

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

      {/* Floating Hamburger Menu */}
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
      </AnimatePresence>

      {/* Full-screen overlay menu */}
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
            <MenuBackground />
            <MenuHeader />
            <MenuContent navItems={navItems} setIsOpen={setIsOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
