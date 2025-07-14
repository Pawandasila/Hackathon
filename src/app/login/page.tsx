"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, ArrowRight, Sparkles, Leaf, Users, TrendingUp, DollarSign, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: { email?: string; password?: string; general?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate login API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", email.split("@")[0]);
      localStorage.setItem("userEmail", email);
      
      // Trigger storage event for immediate UI update
      window.dispatchEvent(new Event('storage'));
      
      // Redirect to home page
      router.push("/");
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

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
            <Leaf className="w-10 h-10 text-green-200 opacity-60" />
          </div>
          <div className="absolute top-40 right-24 animate-bounce" style={{ animationDuration: '3s' }}>
            <Sparkles className="w-8 h-8 text-emerald-200 opacity-70" />
          </div>
          <div className="absolute bottom-40 left-16 animate-pulse" style={{ animationDelay: '1s' }}>
            <Users className="w-9 h-9 text-teal-200 opacity-50" />
          </div>
          <div className="absolute top-1/3 right-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}>
            <TrendingUp className="w-12 h-12 text-green-300 opacity-40" />
          </div>
          <div className="absolute top-20 right-40 animate-pulse" style={{ animationDelay: '3s' }}>
            <DollarSign className="w-10 h-10 text-yellow-200 opacity-60" />
          </div>
          <div className="absolute bottom-24 right-32 animate-bounce" style={{ animationDuration: '5s' }}>
            <Package className="w-8 h-8 text-white opacity-50" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 py-8 text-white">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome Back to
              <span className="block text-emerald-200">EcoTrack360</span>
            </h1>

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Track Your Progress</h3>
                  <p className="text-green-100 text-sm">Continue monitoring your sustainability journey and see your environmental impact grow.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-teal-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Save Money</h3>
                  <p className="text-green-100 text-sm">Access exclusive eco-friendly products and earn rewards for sustainable choices.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Join Community</h3>
                  <p className="text-green-100 text-sm">Connect with eco-warriors worldwide and share your sustainability achievements.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Mobile Header (visible only on smaller screens) */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to your EcoTrack360 account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your sustainability journey</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                    errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                    errors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <div className="text-sm text-gray-600 space-x-1">
              <span>Don't have an account?</span>
              <Link
                href="/signup"
                className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Sign up for free
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <h4 className="text-sm font-semibold text-emerald-800 mb-2">Demo Credentials:</h4>
            <div className="text-xs text-emerald-700 space-y-1">
              <div>Email: demo@ecotrack360.com</div>
              <div>Password: demo123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
