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
} from "lucide-react";
import Link from "next/link";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  // User data
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    joinDate: "January 2024",
    totalEcoCoins: 2450,
    totalRupeesSaved: 1225,
    level: "Eco Champion",
    badge: "🌟",
  });

  // Form data for editing
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  // Check login status and load user data
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        const userName = localStorage.getItem("userName") || "EcoWarrior";
        const userEmail = localStorage.getItem("userEmail") || "user@ecotrack360.com";
        
        setProfile(prev => ({
          ...prev,
          name: userName,
          email: userEmail,
        }));
        
        setFormData(prev => ({
          ...prev,
          name: userName,
          email: userEmail,
        }));
      } else {
        setIsLoggedIn(false);
      }
    };

    
    checkLoginStatus();

    // Listen for storage changes (when user logs out from navbar or other components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isLoggedIn") {
        checkLoginStatus();
      }
    };

    // Listen for custom logout events (when logout happens in same tab)
    const handleCustomLogout = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("logout", handleCustomLogout);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("logout", handleCustomLogout);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear errors when user starts typing
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

    // Validate password change if attempting
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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update profile
    setProfile(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
    }));

    // Update localStorage
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);

    // Clear password fields
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
      case "purchase": return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case "bonus": return <Gift className="w-5 h-5 text-blue-600" />;
      case "referral": return <Star className="w-5 h-5 text-purple-600" />;
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-3 max-w-md w-full"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
          <Link
            href="/login"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
          >
            <span>Login</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and track your eco journey</p>
        </motion.div> */}

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="flex space-x-2">
              {[
                { id: "account", label: "Account", icon: User },
                { id: "rewards", label: "Eco Rewards", icon: Coins },
                { id: "history", label: "History", icon: History },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Account Tab */}
          {activeTab === "account" && (
            <motion.div
              key="account"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors"
                >
                  {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                  <span>{isEditing ? "Cancel" : "Edit"}</span>
                </button>
              </div>

              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {errors.general}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={isEditing ? formData.name : profile.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                        isEditing 
                          ? "border-gray-200 focus:border-emerald-500" 
                          : "border-gray-100 bg-gray-50 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? formData.email : profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                        isEditing 
                          ? "border-gray-200 focus:border-emerald-500" 
                          : "border-gray-100 bg-gray-50 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Password Fields - Only show when editing */}
                {isEditing && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          placeholder="Enter current password"
                          className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                            errors.currentPassword ? "border-red-300" : "border-gray-200 focus:border-emerald-500"
                          }`}
                        />
                      </div>
                      {errors.currentPassword && (
                        <p className="text-red-500 text-xs ml-1">{errors.currentPassword}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Enter new password"
                          className={`w-full pl-12 pr-12 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                            errors.newPassword ? "border-red-300" : "border-gray-200 focus:border-emerald-500"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="text-red-500 text-xs ml-1">{errors.newPassword}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm new password"
                          className={`w-full pl-12 pr-12 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                            errors.confirmPassword ? "border-red-300" : "border-gray-200 focus:border-emerald-500"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs ml-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Account Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-6 h-6 text-emerald-600" />
                    <span className="font-semibold text-gray-700">Member Since</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-700">{profile.joinDate}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Award className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold text-gray-700">Level</span>
                  </div>
                  <p className="text-xl font-bold text-blue-700">{profile.level}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Star className="w-6 h-6 text-purple-600" />
                    <span className="font-semibold text-gray-700">Badge</span>
                  </div>
                  <p className="text-2xl">{profile.badge}</p>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Eco Rewards Tab */}
          {activeTab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Rewards Summary */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Eco Rewards Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Total Eco Coins */}
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Coins className="w-8 h-8" />
                        <span className="text-lg font-semibold">Total Eco Coins</span>
                      </div>
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold">{profile.totalEcoCoins.toLocaleString()}</p>
                    <p className="text-green-100 text-sm mt-2">Keep earning more!</p>
                  </div>

                  {/* Rupees Saved */}
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IndianRupee className="w-8 h-8" />
                        <span className="text-lg font-semibold">Rupees Saved</span>
                      </div>
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold">₹{profile.totalRupeesSaved.toLocaleString()}</p>
                    <p className="text-blue-100 text-sm mt-2">Through eco choices</p>
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Leaf className="w-6 h-6 text-amber-600" />
                    <span className="font-semibold text-gray-700">Conversion Rate</span>
                  </div>
                  <p className="text-lg text-gray-600">
                    <span className="font-bold text-amber-600">2 Eco Coins = ₹1</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Your {profile.totalEcoCoins} eco coins are worth ₹{(profile.totalEcoCoins / 2).toFixed(0)}
                  </p>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Eco Achievements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "First Purchase", desc: "Made your first eco-friendly purchase", earned: true, coins: 100 },
                    { title: "Green Streak", desc: "7 days of sustainable choices", earned: true, coins: 200 },
                    { title: "Eco Champion", desc: "Earned 2000+ eco coins", earned: true, coins: 500 },
                    { title: "Tree Hugger", desc: "Saved equivalent of 5 trees", earned: false, coins: 300 },
                    { title: "Carbon Saver", desc: "Reduced 100kg CO2 emissions", earned: false, coins: 400 },
                    { title: "Eco Influencer", desc: "Refer 10 friends", earned: false, coins: 1000 },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        achievement.earned
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-green-500" : "bg-gray-400"
                        }`}>
                          {achievement.earned ? "✓" : "○"}
                        </div>
                        <span className={`font-semibold ${
                          achievement.earned ? "text-green-700" : "text-gray-500"
                        }`}>
                          {achievement.title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.desc}</p>
                      <p className={`text-xs font-medium ${
                        achievement.earned ? "text-green-600" : "text-gray-400"
                      }`}>
                        +{achievement.coins} Eco Coins
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>
              
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{transaction.productName}</h4>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Coins className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-green-600">+{transaction.ecoCoins}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-600">₹{transaction.rupees}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-8">
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all">
                  Load More Transactions
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 text-gray-600 hover:text-emerald-600 transition-all"
            >
              <span>← Back to Home</span>
            </Link>
            
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userName");
                localStorage.removeItem("userEmail");
                window.location.href = "/";
              }}
              className="flex items-center space-x-2 px-6 py-3 bg-red-100 text-red-600 rounded-2xl hover:bg-red-200 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
