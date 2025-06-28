'use client'
import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Leaf, TreePine, Flower, Mountain, Sun, Cloud, Check, Globe, Award, Users } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Simulate successful signup
      console.log("Signup successful!", formData);
      
      // Store user data in localStorage (simulate successful registration)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", formData.name);
      localStorage.setItem("userEmail", formData.email);
      
      // Trigger storage event for immediate UI update
      window.dispatchEvent(new Event('storage'));
      
      // Redirect to home page
      window.location.href = "/";
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: "Something went wrong. Please try again.",
      }));
    }

    setIsLoading(false);
  };

  const passwordRequirements = [
    { text: "At least 6 characters", met: formData.password.length >= 6 },
    { text: "Contains letters", met: /[a-zA-Z]/.test(formData.password) },
    { text: "Contains numbers", met: /\d/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Nature Theme with Benefits */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 50%), 
                             radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 20% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Animated Nature Icons */}
          <div className="absolute top-24 left-20 animate-pulse">
            <TreePine className="w-10 h-10 text-green-200 opacity-60" />
          </div>
          <div className="absolute top-40 right-24 animate-bounce" style={{ animationDuration: '3s' }}>
            <Leaf className="w-8 h-8 text-emerald-200 opacity-70" />
          </div>
          <div className="absolute bottom-40 left-16 animate-pulse" style={{ animationDelay: '1s' }}>
            <Flower className="w-9 h-9 text-teal-200 opacity-50" />
          </div>
          <div className="absolute top-1/3 right-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}>
            <Mountain className="w-12 h-12 text-green-300 opacity-40" />
          </div>
          <div className="absolute top-20 right-40 animate-pulse" style={{ animationDelay: '3s' }}>
            <Sun className="w-10 h-10 text-yellow-200 opacity-60" />
          </div>
          <div className="absolute bottom-24 right-32 animate-bounce" style={{ animationDuration: '5s' }}>
            <Cloud className="w-8 h-8 text-white opacity-50" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-8 text-white">
          <div className="max-w-md">
            {/* <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
              <Leaf className="w-14 h-14 text-white" />
            </div> */}
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Join the
              <span className="block text-emerald-200">Green Revolution</span>
            </h1>
            
            {/* <p className="text-xl text-green-100 mb-10 leading-relaxed">
              Start tracking your carbon footprint today and become part of a global community committed to environmental sustainability.
            </p> */}

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Track Your Impact</h3>
                  <p className="text-green-100 text-sm">Monitor your daily carbon emissions and see your environmental progress in real-time.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-teal-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Earn Rewards</h3>
                  <p className="text-green-100 text-sm">Get recognized for your sustainable choices with badges and achievements.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Community Support</h3>
                  <p className="text-green-100 text-sm">Connect with like-minded individuals and share sustainability tips.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-xs text-green-100">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-xs text-green-100">CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-xs text-green-100">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/50 to-transparent"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-xl">
          {/* Mobile Header (visible only on smaller screens) */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Join EcoTrack360</h1>
            <p className="text-gray-600">Start your sustainable journey today</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join thousands of users making a positive environmental impact</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                      errors.name
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs ml-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs ml-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password and Confirm Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className={`w-full pl-12 pr-12 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs ml-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`w-full pl-12 pr-12 py-4 bg-white border-2 rounded-2xl transition-all focus:outline-none ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs ml-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            {/* Password Requirements - Full Width */}
            {formData.password && (
              <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs font-medium text-gray-600 mb-3">Password Requirements:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        req.met ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className={`text-xs ${req.met ? "text-emerald-600" : "text-gray-500"}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Terms and Privacy */}
            <div className="flex items-center space-x-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{" "}
                <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:from-green-700 hover:to-emerald-700"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Social Signup and Links - Outside Form */}
          <div className="mt-6 space-y-6">

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">or sign up with</span>
              </div>
            </div>

            {/* Social Signup Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <span>Already have an account?</span>
                <Link
                  href="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}