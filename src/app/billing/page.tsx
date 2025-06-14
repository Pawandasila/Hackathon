"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Star,
  Zap,
  Shield,
  Users,
  BarChart3,
  Globe,
  Leaf,
  Crown,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const priceRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
  const gsapRef = useRef<{
    animateNumber: (
      element: HTMLSpanElement | null,
      from: number,
      to: number,
      duration?: number
    ) => void;
  } | null>(null);

  const plans = [
    {
      name: "Starter",
      icon: Leaf,
      description:
        "Perfect for individuals starting their sustainability journey",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        "Basic carbon footprint tracking",
        "Personal sustainability score",
        "Monthly progress reports",
        "Community access",
        "Mobile app access",
        "Basic recommendations",
      ],
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      name: "Professional",
      icon: BarChart3,
      description: "Ideal for professionals and small businesses",
      monthlyPrice: 29,
      annualPrice: 290,
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced analytics dashboard",
        "Custom sustainability goals",
        "Team collaboration (up to 10 users)",
        "API access",
        "Priority customer support",
        "Export reports (PDF/Excel)",
        "Carbon offset marketplace",
      ],
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: "Comprehensive solution for large organizations",
      monthlyPrice: 99,
      annualPrice: 990,
      popular: false,
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced AI recommendations",
        "White-label options",
        "24/7 priority support",
        "Custom reporting",
        "Compliance tracking",
        "On-premise deployment options",
      ],
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const handleToggle = () => {
    const newIsAnnual = !isAnnual;
    setIsAnnual(newIsAnnual);

    // Animate price changes
    plans.forEach((plan, index) => {
      const priceElement = priceRefs.current[index];
      if (priceElement && gsapRef.current) {
        const fromPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
        const toPrice = newIsAnnual ? plan.annualPrice : plan.monthlyPrice;

        if (fromPrice !== toPrice) {
          gsapRef.current.animateNumber(priceElement, fromPrice, toPrice, 600);
        }
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };
  const cardVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.9,
      rotateX: 20,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 15,
        duration: 0.8,
      },
    },
  };
  const floatingVariants = {
    animate: {
      y: -20,
      rotate: 10,
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
        type: "tween" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6eee8] via-[#e8dbc6] to-[#f6eee8] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {" "}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: 600 + i * 40,
              y: 400 + i * 30,
            }}
            animate={{
              y: -150,
              x: 50,
              opacity: 1,
              scale: 1.5,
              rotate: 720,
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut" as const,
              type: "tween" as const,
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-30" />
          </motion.div>
        ))}
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {" "}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              scale: 1.2,
              rotate: 360,
              opacity: 1,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse" as const,
              repeatDelay: 1,
              delay: i * 0.2,
              ease: "easeInOut" as const,
              type: "tween" as const,
            }}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute top-40 right-20 text-blue-600/30"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Sparkles size={40} />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-2xl"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
              }}
              transition={{ duration: 0.6 }}
            >
              <BarChart3 className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Start your sustainability journey today. Choose the plan that fits
              your needs and begin making a positive impact on our planet.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              className="flex items-center justify-center space-x-6 mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.span
                className={`text-lg font-medium transition-all duration-300 ${
                  !isAnnual ? "text-gray-800 scale-110" : "text-gray-500"
                }`}
                animate={{ scale: !isAnnual ? 1.1 : 1 }}
              >
                Monthly
              </motion.span>

              <motion.button
                onClick={handleToggle}
                className={`relative w-20 h-10 rounded-full shadow-lg transition-all duration-500 ${
                  isAnnual
                    ? "bg-gradient-to-r from-emerald-500 to-green-600"
                    : "bg-gray-300"
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
                  animate={{
                    x: isAnnual ? 40 : 4,
                    rotate: isAnnual ? 360 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.6,
                  }}
                >
                  <motion.div
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{
                      scale: isAnnual ? 1.5 : 0.5,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              </motion.button>

              <motion.span
                className={`text-lg font-medium transition-all duration-300 ${
                  isAnnual ? "text-gray-800 scale-110" : "text-gray-500"
                }`}
                animate={{ scale: isAnnual ? 1.1 : 1 }}
              >
                Annual
              </motion.span>

              <AnimatePresence>
                {isAnnual && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      rotate: 2,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      x: 20,
                      rotate: 180,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: 0.6,
                    }}
                    className="bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-300 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    <motion.span
                      animate={{ scale: 1.1 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse" as const,
                      }}
                    >
                      🎉 Save 17%
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const originalPrice = isAnnual
                ? plan.monthlyPrice * 12
                : plan.monthlyPrice;

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className={`relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-emerald-500 scale-105" : ""
                  }`}
                  onMouseEnter={() => setHoveredPlan(index)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)",
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>Most Popular</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl mb-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold text-gray-800">
                        ${price}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-gray-500">
                          /{isAnnual ? "year" : "month"}
                        </span>
                      )}
                    </div>

                    {isAnnual && plan.monthlyPrice > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-500 mt-1"
                      >
                        <span className="line-through">
                          ${originalPrice}/year
                        </span>
                        <span className="text-emerald-600 ml-2 font-medium">
                          Save ${originalPrice - price}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      plan.popular
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: plan.popular
                        ? "0 20px 40px rgba(16, 185, 129, 0.3)"
                        : undefined,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>
                      {plan.monthlyPrice === 0
                        ? "Get Started Free"
                        : "Start Free Trial"}
                    </span>
                    <motion.div
                      animate={{ x: hoveredPlan === index ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* FAQ or Additional Info */}
          <motion.div variants={cardVariants} className="text-center mt-16">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 max-w-4xl mx-auto shadow-xl border border-white/50">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Not sure which plan is right for you?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Start with our free plan and upgrade anytime. All plans include
                a 14-day free trial of premium features. No credit card
                required.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  className="bg-emerald-100 text-emerald-700 px-6 py-3 rounded-lg font-medium hover:bg-emerald-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Demo
                </motion.button>
                <motion.button
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Sales
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
