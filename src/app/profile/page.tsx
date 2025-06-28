"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Coins,
  TrendingUp,
  Calendar,
  ShoppingBag,
  Gift,
  Star,
  Leaf,
  Award,
  History,
  IndianRupee,
  ChevronRight,
  Settings,
  LogOut,
  Sparkles,
  Crown,
  Flame,
  Zap,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "purchase" | "bonus" | "referral";
  productName: string;
  ecoCoins: number;
  rupees: number;
  date: string;
  description: string;
}

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  totalEcoCoins: number;
  totalRupeesSaved: number;
  level: string;
  badge: string;
}

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for demo
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [isClient, setIsClient] = useState(false);

  // Generate consistent random values for particles
  const [particlePositions] = useState(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  });

  // Set client-side flag after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // User data
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "alex.johnson@ecotrack360.com",
    joinDate: "January 2024",
    totalEcoCoins: 2450,
    totalRupeesSaved: 1225,
    level: "Eco Champion",
    badge: "🌟",
  });

  // Form data for editing
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@ecotrack360.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Mock transaction history
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "purchase",
      productName: "Organic Cotton T-Shirt",
      ecoCoins: 150,
      rupees: 75,
      date: "2024-06-25",
      description: "Sustainable fashion purchase",
    },
    {
      id: "2",
      type: "bonus",
      productName: "Daily Check-in Bonus",
      ecoCoins: 50,
      rupees: 25,
      date: "2024-06-24",
      description: "Daily sustainability commitment",
    },
    {
      id: "3",
      type: "purchase",
      productName: "Bamboo Water Bottle",
      ecoCoins: 200,
      rupees: 100,
      date: "2024-06-23",
      description: "Eco-friendly hydration",
    },
    {
      id: "4",
      type: "referral",
      productName: "Friend Referral Bonus",
      ecoCoins: 300,
      rupees: 150,
      date: "2024-06-22",
      description: "Referred Sarah to EcoTrack360",
    },
    {
      id: "5",
      type: "purchase",
      productName: "Solar Power Bank",
      ecoCoins: 400,
      rupees: 200,
      date: "2024-06-20",
      description: "Renewable energy gadget",
    },
  ]);

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    general: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
  };

  const handleSaveProfile = async () => {
    setErrors({ currentPassword: "", newPassword: "", confirmPassword: "", general: "" });

    if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        setErrors(prev => ({ ...prev, currentPassword: "Current password required" }));
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
        return;
      }
      if (formData.newPassword.length < 6) {
        setErrors(prev => ({ ...prev, newPassword: "Password must be at least 6 characters" }));
        return;
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    setProfile(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
    }));

    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    setIsEditing(false);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase": return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case "bonus": return <Gift className="w-5 h-5 text-violet-600" />;
      case "referral": return <Star className="w-5 h-5 text-amber-600" />;
      default: return <Coins className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="text-center bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <User className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-4">Welcome Back</h1>
          <p className="text-white/70 mb-8">Please login to access your eco profile</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all relative overflow-hidden"
          >
            <span className="relative z-10">Login Now</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6eee8] via-[#fbeaff] to-[#fbeee8] pt-8 pb-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {isClient && particlePositions.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section with Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative inline-block mb-6"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/25">
              <User className="w-16 h-16 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 bg-gradient-to-r from-violet-500 via-emerald-500 to-violet-500 rounded-full opacity-20 blur-sm"
            ></motion.div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Crown className="w-4 h-4 text-white" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2"
          >
            {profile.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-slate-600 mb-4"
          >
            {profile.level} • {profile.badge}
          </motion.p>
          
          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center space-x-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{profile.totalEcoCoins.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Eco Coins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">₹{profile.totalRupeesSaved.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Saved</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-2 shadow-2xl border border-white/10">
            <div className="flex space-x-2">
              {[
                { id: "account", label: "Account", icon: User, gradient: "from-violet-500 to-purple-600" },
                { id: "rewards", label: "Rewards", icon: Coins, gradient: "from-emerald-500 to-green-600" },
                { id: "history", label: "History", icon: History, gradient: "from-blue-500 to-indigo-600" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all overflow-hidden ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg shadow-${tab.id === 'account' ? 'purple' : tab.id === 'rewards' ? 'emerald' : 'blue'}-500/25`
                      : "text-slate-600 hover:text-slate-800 hover:bg-white/30"
                  }`}
                >
                  <tab.icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Account Tab */}
          {activeTab === "account" && (
            <motion.div
              key="account"
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 50, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Account Settings</h2>
                  </div>
                  <motion.button
                    onClick={() => setIsEditing(!isEditing)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-xl border border-violet-400/30 text-violet-700 rounded-2xl hover:from-violet-500/30 hover:to-purple-500/30 transition-all"
                  >
                    {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                    <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                  </motion.button>
                </div>

                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-400/30 rounded-2xl text-red-300 text-sm backdrop-blur-xl"
                  >
                    {errors.general}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Full Name</span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-violet-600 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={isEditing ? formData.name : profile.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl transition-all focus:outline-none text-slate-800 placeholder-slate-500 ${
                          isEditing 
                            ? "focus:border-violet-400/50 focus:bg-white/70 focus:shadow-lg focus:shadow-violet-500/10" 
                            : "cursor-not-allowed opacity-60"
                        }`}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-violet-500/0 group-focus-within:from-violet-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-violet-500/10 transition-all pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-violet-600 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={isEditing ? formData.email : profile.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl transition-all focus:outline-none text-slate-800 placeholder-slate-500 ${
                          isEditing 
                            ? "focus:border-violet-400/50 focus:bg-white/70 focus:shadow-lg focus:shadow-violet-500/10" 
                            : "cursor-not-allowed opacity-60"
                        }`}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-violet-500/0 group-focus-within:from-violet-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-violet-500/10 transition-all pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Password Fields - Only show when editing */}
                  {isEditing && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Current Password</span>
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-violet-600 transition-colors" />
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Enter current password"
                            className={`w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl transition-all focus:outline-none text-slate-800 placeholder-slate-500 focus:border-violet-400/50 focus:bg-white/70 focus:shadow-lg focus:shadow-violet-500/10 ${
                              errors.currentPassword ? "border-red-400/50" : ""
                            }`}
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-violet-500/0 group-focus-within:from-violet-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-violet-500/10 transition-all pointer-events-none"></div>
                        </div>
                        {errors.currentPassword && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-400 text-xs ml-1"
                          >
                            {errors.currentPassword}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3"
                      >
                        <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>New Password</span>
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-violet-600 transition-colors" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                            className={`w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl transition-all focus:outline-none text-slate-800 placeholder-slate-500 focus:border-violet-400/50 focus:bg-white/70 focus:shadow-lg focus:shadow-violet-500/10 ${
                              errors.newPassword ? "border-red-400/50" : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-violet-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-violet-500/0 group-focus-within:from-violet-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-violet-500/10 transition-all pointer-events-none"></div>
                        </div>
                        {errors.newPassword && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-400 text-xs ml-1"
                          >
                            {errors.newPassword}
                          </motion.p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-3 lg:col-span-2"
                      >
                        <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Confirm New Password</span>
                        </label>
                        <div className="relative group max-w-md">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-violet-600 transition-colors" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm new password"
                            className={`w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl transition-all focus:outline-none text-slate-800 placeholder-slate-500 focus:border-violet-400/50 focus:bg-white/70 focus:shadow-lg focus:shadow-violet-500/10 ${
                              errors.confirmPassword ? "border-red-400/50" : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-violet-600 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-violet-500/0 group-focus-within:from-violet-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-violet-500/10 transition-all pointer-events-none"></div>
                        </div>
                        {errors.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-400 text-xs ml-1"
                          >
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Account Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="group bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-xl rounded-2xl p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-emerald-700">Member Since</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-800">{profile.joinDate}</p>
                  </div>

                  <div className="group bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-blue-700">Level</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-800">{profile.level}</p>
                  </div>

                  <div className="group bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-400/20 hover:border-amber-400/40 transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-amber-700">Badge</span>
                    </div>
                    <p className="text-3xl">{profile.badge}</p>
                  </div>
                </motion.div>

                {/* Save Button */}
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-10 flex justify-end"
                  >
                    <motion.button
                      onClick={handleSaveProfile}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center space-x-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all relative overflow-hidden"
                    >
                      <Save className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Save Changes</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Eco Rewards Tab */}
          {activeTab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 50, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="space-y-8"
            >
              {/* Rewards Summary */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Coins className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Eco Rewards</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Total Eco Coins */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="group bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Coins className="w-8 h-8" />
                          <span className="text-lg font-semibold">Total Eco Coins</span>
                        </div>
                        <TrendingUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-4xl font-bold mb-2">{profile.totalEcoCoins.toLocaleString()}</p>
                      <p className="text-emerald-100 text-sm">Keep earning more!</p>
                    </motion.div>

                    {/* Rupees Saved */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <IndianRupee className="w-8 h-8" />
                          <span className="text-lg font-semibold">Rupees Saved</span>
                        </div>
                        <TrendingUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-4xl font-bold mb-2">₹{profile.totalRupeesSaved.toLocaleString()}</p>
                      <p className="text-blue-100 text-sm">Through eco choices</p>
                    </motion.div>
                  </div>

                  {/* Conversion Rate */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-400/20"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Leaf className="w-6 h-6 text-amber-600" />
                      <span className="font-semibold text-amber-700">Conversion Rate</span>
                    </div>
                    <p className="text-lg text-slate-700 mb-2">
                      <span className="font-bold text-amber-600">2 Eco Coins = ₹1</span>
                    </p>
                    <p className="text-sm text-slate-600">
                      Your {profile.totalEcoCoins} eco coins are worth ₹{(profile.totalEcoCoins / 2).toFixed(0)}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Eco Achievements</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "First Purchase", desc: "Made your first eco-friendly purchase", earned: true, coins: 100, icon: "🛍️" },
                      { title: "Green Streak", desc: "7 days of sustainable choices", earned: true, coins: 200, icon: "🔥" },
                      { title: "Eco Champion", desc: "Earned 2000+ eco coins", earned: true, coins: 500, icon: "👑" },
                      { title: "Tree Hugger", desc: "Saved equivalent of 5 trees", earned: false, coins: 300, icon: "🌳" },
                      { title: "Carbon Saver", desc: "Reduced 100kg CO2 emissions", earned: false, coins: 400, icon: "🌍" },
                      { title: "Eco Influencer", desc: "Refer 10 friends", earned: false, coins: 1000, icon: "📢" },
                    ].map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                          achievement.earned
                            ? "bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-400/30 hover:border-emerald-400/50"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`text-2xl ${achievement.earned ? "grayscale-0" : "grayscale opacity-50"}`}>
                            {achievement.icon}
                          </div>
                          <span className={`font-semibold ${
                            achievement.earned ? "text-emerald-700" : "text-slate-600"
                          }`}>
                            {achievement.title}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{achievement.desc}</p>
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-medium ${
                            achievement.earned ? "text-emerald-600" : "text-slate-500"
                          }`}>
                            +{achievement.coins} Eco Coins
                          </p>
                          {achievement.earned && (
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 50, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <History className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Transaction History</h2>
                </div>
                
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center justify-between p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-emerald-400/20">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">{transaction.productName}</h4>
                          <p className="text-sm text-slate-600 mb-1">{transaction.description}</p>
                          <p className="text-xs text-slate-500">{formatDate(transaction.date)}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span className="font-bold text-emerald-600">+{transaction.ecoCoins}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <IndianRupee className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-blue-600">₹{transaction.rupees}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all relative overflow-hidden"
                  >
                    <span className="relative z-10">Load More Transactions</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 text-slate-700 hover:text-slate-800 hover:border-white/50 transition-all"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Back to Home</span>
            </motion.a>
            
            <motion.button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userName");
                localStorage.removeItem("userEmail");
                window.dispatchEvent(new Event("logout"));
                setIsLoggedIn(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 px-6 py-3 bg-red-500/20 border border-red-400/50 text-red-600 rounded-2xl hover:bg-red-500/30 hover:border-red-400/70 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;