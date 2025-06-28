"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingCart, X, LogOut, Settings, Sparkles } from "lucide-react";

interface NavActionsProps {
  showHamburger: boolean;
  scrolled: boolean;
}

const NavActions: React.FC<NavActionsProps> = ({ showHamburger, scrolled }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock user state - replace with actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("John Doe");

  // Check login status from localStorage on mount and listen for changes
  useEffect(() => {
    const updateAuthState = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const storedName = localStorage.getItem("userName") || "EcoWarrior";
      setIsLoggedIn(loggedIn);
      setUserName(storedName);
    };

    // Initial check
    updateAuthState();

    // Listen for storage changes (for cross-tab updates and immediate updates)
    window.addEventListener('storage', updateAuthState);
    
    // Custom event for same-tab updates
    window.addEventListener('storage', updateAuthState);

    return () => {
      window.removeEventListener('storage', updateAuthState);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Add your search logic here
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleProfileAction = (action: string) => {
    console.log(`${action} clicked`);
    setProfileOpen(false);
    
    if (action === "logout") {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      
      // Trigger storage event for immediate UI update
      window.dispatchEvent(new Event('storage'));
    } else if (action === "login") {
      // Navigate to client login page
      window.location.href = "/login";
    } else if (action === "signup") {
      // Navigate to client signup page
      window.location.href = "/signup";
    }
  };

  return (
    <>
      <motion.div
        className={`items-center space-x-3 transition-all duration-300 ${
          showHamburger ? "hidden" : "hidden md:flex"
        }`}
        animate={{
          opacity: showHamburger ? 0 : 1,
          x: showHamburger ? 20 : 0,
        }}
        initial={false}
      >
        {/* Enhanced Search Button */}
        <motion.button
          onClick={() => setSearchOpen(true)}
          whileHover={{
            scale: 1.05,
            y: -1,
          }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-3 rounded-2xl transition-all duration-300 group ${
            scrolled
              ? "text-gray-600 hover:text-emerald-600 bg-white/10 hover:bg-white/20 shadow-sm hover:shadow-md border border-white/10"
              : "text-gray-700/90 hover:text-gray-500 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
          }`}
        >
          <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
            layoutId="search-glow"
          />
        </motion.button>

        {/* Enhanced Profile Button */}
        <div className="relative" ref={profileRef}>
          <motion.button
            onClick={() => setProfileOpen(!profileOpen)}
            whileHover={{
              scale: 1.05,
              y: -1,
            }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-3 rounded-2xl transition-all duration-300 group ${
              scrolled
                ? "text-gray-600 hover:text-emerald-600 bg-white/10 hover:bg-white/20 shadow-sm hover:shadow-md border border-white/10"
                : "text-gray-700/90 hover:text-gray-500 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
            } ${profileOpen ? "!bg-emerald-50 !text-emerald-600 !border-emerald-200" : ""}`}
          >
            <User className="w-5 h-5 transition-transform group-hover:scale-110" />
            {profileOpen && (
              <motion.div
                className="absolute inset-0 rounded-2xl bg-emerald-100"
                layoutId="profile-bg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>

          {/* Enhanced Profile Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-50"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="p-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-b border-emerald-100/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-800">
                        {isLoggedIn ? userName : "Welcome!"}
                      </p>
                      <p className="text-sm text-emerald-600 font-medium">
                        {isLoggedIn ? "Premium EcoWarrior" : "Join EcoTrack360"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-3">
                  {isLoggedIn ? (
                    <>
                      <motion.button
                        onClick={() => handleProfileAction("profile")}
                        whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                        className="w-full text-left px-6 py-4 text-sm text-gray-700 hover:text-emerald-600 transition-all flex items-center space-x-4 group"
                      >
                        <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium">My Profile</span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleProfileAction("settings")}
                        whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                        className="w-full text-left px-6 py-4 text-sm text-gray-700 hover:text-emerald-600 transition-all flex items-center space-x-4 group"
                      >
                        <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors">
                          <Settings className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Settings</span>
                      </motion.button>
                      <hr className="my-2 border-gray-100/70" />
                      <motion.button
                        onClick={() => handleProfileAction("logout")}
                        whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.05)" }}
                        className="w-full text-left px-6 py-4 text-sm text-red-600 hover:text-red-700 transition-all flex items-center space-x-4 group"
                      >
                        <div className="w-8 h-8 bg-red-50 group-hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => handleProfileAction("login")}
                        whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                        className="w-full text-left px-6 py-4 text-sm text-emerald-600 hover:text-emerald-700 transition-all flex items-center space-x-4 group font-medium"
                      >
                        <div className="w-8 h-8 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <span>Login</span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleProfileAction("signup")}
                        whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                        className="w-full text-left px-6 py-4 text-sm text-gray-700 hover:text-emerald-600 transition-all flex items-center space-x-4 group"
                      >
                        <div className="w-8 h-8 bg-gray-100 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Sign Up</span>
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Shopping Cart Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -1,
          }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-3 rounded-2xl transition-all duration-300 group ${
            scrolled
              ? "text-gray-600 hover:text-emerald-600 bg-white/10 hover:bg-white/20 shadow-sm hover:shadow-md border border-white/10"
              : "text-gray-700/90 hover:text-gray-500 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
          }`}
        >
          <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white"
          >
            3
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Simple Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="flex items-center">
                    <Search className="w-5 h-5 text-gray-400 ml-6" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for products..."
                      className="flex-1 px-4 py-4 text-lg text-gray-700 bg-transparent border-none outline-none placeholder-gray-400"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 mr-4 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                
                <p className="text-center text-gray-600 text-sm mt-3">
                  Press <kbd className="bg-white px-2 py-1 rounded shadow text-xs">Enter</kbd> to search or <kbd className="bg-white px-2 py-1 rounded shadow text-xs">Esc</kbd> to close
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavActions;