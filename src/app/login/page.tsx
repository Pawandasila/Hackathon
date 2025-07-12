"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Leaf,
  TreePine,
  Flower,
  Mountain,
  Sun,
  Cloud,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "demo@ecotrack360.com",
    password: "demo123",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  // Hardcoded demo credentials
  const DEMO_CREDENTIALS = {
    email: "demo@ecotrack360.com",
    password: "demo123",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };

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

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check against demo credentials
    if (
      formData.email === DEMO_CREDENTIALS.email &&
      formData.password === DEMO_CREDENTIALS.password
    ) {
      // Success - store login state and redirect
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", "EcoWarrior Demo");
      localStorage.setItem("userEmail", formData.email);

      // Trigger storage event for immediate UI update
      window.dispatchEvent(new Event("storage"));

      // Redirect to home page
      window.location.href = "/";
    } else {
      setErrors((prev) => ({
        ...prev,
        general: "Invalid credentials. Try demo@ecotrack360.com / demo123",
      }));
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Nature Theme */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Animated Trees */}
          <div className="absolute top-20 left-16 animate-pulse">
            <TreePine className="w-8 h-8 text-green-200 opacity-60" />
          </div>
          <div
            className="absolute top-32 right-20 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <Leaf className="w-6 h-6 text-emerald-200 opacity-70" />
          </div>
          <div
            className="absolute bottom-32 left-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <Flower className="w-7 h-7 text-teal-200 opacity-50" />
          </div>
          <div
            className="absolute top-1/2 right-16 animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "2s" }}
          >
            <Mountain className="w-10 h-10 text-green-300 opacity-40" />
          </div>
          <div
            className="absolute top-16 right-32 animate-pulse"
            style={{ animationDelay: "3s" }}
          >
            <Sun className="w-8 h-8 text-yellow-200 opacity-60" />
          </div>
          <div
            className="absolute bottom-20 right-28 animate-bounce"
            style={{ animationDuration: "5s" }}
          >
            <Cloud className="w-6 h-6 text-white opacity-50" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-start px-16 py-12 text-white">
          <div className="max-w-md">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
              <Leaf className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome Back to
              <span className="block text-emerald-200">EcoTrack360</span>
            </h1>

            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Continue your journey towards a more sustainable future. Track
              your carbon footprint and make a positive impact on our planet.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-green-100">
                <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                <span>Track your daily carbon emissions</span>
              </div>
              <div className="flex items-center space-x-3 text-green-100">
                <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                <span>Get personalized sustainability tips</span>
              </div>
              <div className="flex items-center space-x-3 text-green-100">
                <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                <span>Join a community of eco-warriors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/50 to-transparent"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Header (visible only on smaller screens) */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your EcoTrack360 account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">
              🎯 Demo Credentials
            </h3>
            <p className="text-xs text-blue-700">
              <strong>Email:</strong> demo@ecotrack360.com
              <br />
              <strong>Password:</strong> demo123
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
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

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
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
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <span>Don't have an account?</span>
                <Link
                  href="/signup"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
