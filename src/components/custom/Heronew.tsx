"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ButtonCustom from "../ui/Button.custom";

export default function Index() {
  const carouselImages = [
    {
      src: "/earth.jpg",
      alt: "Earth sustainability visualization",
    },
    {
      src: "/earthImage.jpg",
      alt: "Environmental conservation imagery",
    },
    {
      src: "/illus.svg",
      alt: "Sustainability illustration and icons",
    },
    {
      src: "/globe.svg",
      alt: "Global environmental awareness",
    },
  ];

  const benefits = [
    {
      icon: "🪙",
      title: "EcoCoins",
      desc: "Earn rewards for every sustainable action",
    },
    {
      icon: "🏆",
      title: "Achievements",
      desc: "Unlock badges for environmental milestones",
    },
    {
      icon: "📊",
      title: "Impact Score",
      desc: "Track your real-time sustainability rating",
    },
    {
      icon: "🎁",
      title: "Rewards",
      desc: "Redeem coins for eco-friendly products",
    },
  ];

  const processSteps = [
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop",
      title: "Track Your Footprint",
      description:
        "Monitor your daily activities, energy usage, and consumption patterns with our AI-powered tracking system.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop",
      title: "Get Smart Insights",
      description:
        "Receive personalized recommendations and actionable insights to reduce your environmental impact.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1593113616828-6f22bde67318?w=500&auto=format&fit=crop",
      title: "Earn EcoCoins",
      description:
        "Complete sustainability challenges and earn EcoCoins for every positive environmental action you take.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&auto=format&fit=crop",
      title: "Make Real Impact",
      description:
        "Join a community of eco-warriors and contribute to global environmental preservation efforts.",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(imageInterval);
  }, [carouselImages.length]);

  return (
    <ReactLenis root>
      <main>
        <div className="wrapper">
            
          <section className=" grid place-content-center sticky top-0 text-gray-800 min-h-screen w-full bg-[#f6eee8] overflow-hidden px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#8b5a2b20_1px,transparent_1px),linear-gradient(to_bottom,#8b5a2b20_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>{" "}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 w-full max-w-7xl min-h-[550px]">
              <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-12 xl:p-16 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-1"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl mb-4 lg:mb-6">
                    🌱
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-3 lg:mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                      EcoTrack360
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-3 lg:mb-4">
                    AI-Powered Sustainability Scoring & Smart Recommendations
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 mb-4 lg:mb-4">
                    Track, analyze, and improve your environmental footprint
                    with real-time insights tailored to your business or
                    lifestyle.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <ButtonCustom value="Join us Now" />
                    <ButtonCustom value="Get Started" />
                  </div>
                </motion.div>
              </div>

              <div className="relative flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-radial from-emerald-100/30 via-transparent to-transparent"></div>{" "}
                <div className="relative w-full h-64 sm:h-80 lg:h-full max-w-xs sm:max-w-sm lg:max-w-md max-h-64 sm:max-h-80 lg:max-h-96">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0"
                    >
                      <div className="relative w-full h-full">
                        {" "}
                        {/* Enhanced Spotlight Ring with Multiple Layers */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute -inset-3 sm:-inset-4 lg:-inset-6 rounded-full opacity-30 blur-sm"
                          style={{
                            background:
                              "conic-gradient(from 0deg, #10b981, #059669, #047857, #064e3b, #10b981)",
                          }}
                        />
                        {/* Secondary Glow Ring */}
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute -inset-2 sm:-inset-3 lg:-inset-4 rounded-full opacity-20 blur-md"
                          style={{
                            background:
                              "conic-gradient(from 180deg, #6ee7b7, #34d399, #10b981, #059669, #6ee7b7)",
                          }}
                        />
                        {/* Image */}
                        {carouselImages[currentImage].src.endsWith(".svg") ? (
                          <img
                            src={carouselImages[currentImage].src}
                            alt={carouselImages[currentImage].alt}
                            className="w-full h-full object-cover rounded-xl lg:rounded-2xl shadow-xl border-2 sm:border-3 lg:border-4 border-white/50"
                          />
                        ) : (
                          <Image
                            src={carouselImages[currentImage].src}
                            alt={carouselImages[currentImage].alt}
                            fill
                            className="object-cover rounded-xl lg:rounded-2xl shadow-xl border-2 sm:border-3 lg:border-4 border-white/50"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={currentImage === 0}
                          />
                        )}
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent rounded-xl lg:rounded-2xl"></div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl shadow-lg"
                  >
                    🌍
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 lg:-bottom-4 lg:-left-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center text-sm sm:text-lg lg:text-xl shadow-lg"
                  >
                    ♻️
                  </motion.div>
                </div>
                {/* Image Indicators */}
                <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                  {carouselImages.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        index === currentImage
                          ? "bg-emerald-500 w-4 sm:w-6"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                      onClick={() => setCurrentImage(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-300 text-black grid place-content-center min-h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8 py-8 relative z-10">
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-4xl lg:text-6xl font-semibold mb-6 tracking-tight leading-[120%]">
                    What We Do
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    EcoTrack360 empowers individuals and businesses to make
                    meaningful environmental impact through intelligent tracking
                    and actionable insights.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ✓
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Real-time Carbon Tracking
                        </h3>
                        <p className="text-gray-600">
                          Monitor your daily carbon footprint across all
                          activities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ✓
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          AI-Powered Recommendations
                        </h3>
                        <p className="text-gray-600">
                          Get personalized suggestions to reduce environmental
                          impact
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ✓
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Community Impact
                        </h3>
                        <p className="text-gray-600">
                          Join a global movement of environmentally conscious
                          individuals
                        </p>
                      </div>
                    </div>
                  </div>

                  <ButtonCustom value="Discover More" />
                </motion.div>
              </div>

              <div className="flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative"
                >
                  <div className="w-80 h-80 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white text-6xl shadow-2xl">
                    🌍
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                    ⚡
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-xl animate-pulse">
                    💧
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>        <div className="wrapper">
          <section className="text-white w-full bg-[#f6eee8]">
            {/* Mobile Layout - Single Column */}
            <div className="block lg:hidden px-4 sm:px-6 py-8">
              <div className="max-w-4xl mx-auto">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl font-medium text-center tracking-tight leading-[120%] text-gray-800 mb-8 sm:mb-12"
                >
                  Your Journey to Sustainability
                </motion.h2>
                
                <div className="space-y-8 sm:space-y-12">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex flex-col space-y-4"
                    >
                      {/* Image */}
                      <div className="relative group mx-auto">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="transition-all duration-300 w-full max-w-sm h-48 sm:h-60 object-cover rounded-lg shadow-lg group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
                        <div className="absolute top-3 left-3">
                          <div className="bg-emerald-500 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 sm:mt-12 text-center"
                >
                  <ButtonCustom value="Start Tracking Now" />
                </motion.div>
              </div>
            </div>

            {/* Desktop Layout - Two Columns */}
            <div className="hidden lg:grid lg:grid-cols-2 px-8">
              <div className="flex flex-col">
                {processSteps.map((step, index) => (
                  <figure
                    key={index}
                    className="sticky top-0 h-screen grid place-content-center"
                  >
                    <div className="relative group">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="transition-all duration-300 w-80 xl:w-96 h-80 xl:h-96 align-bottom object-cover rounded-md group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-md"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-bold">{step.title}</h3>
                      </div>
                    </div>
                  </figure>
                ))}
              </div>
              <div className="sticky top-0 h-screen grid place-content-center">
                <div className="max-w-lg">
                  <h2 className="text-4xl xl:text-5xl font-medium text-right tracking-tight leading-[120%] text-gray-800 mb-8">
                    Your Journey to Sustainability
                  </h2>
                  <div className="space-y-6">
                    {processSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-right">
                    <ButtonCustom value="Start Tracking Now" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gradient-to-br from-emerald-50 to-green-100 min-h-screen sticky top-0 flex items-center py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                  Earn While You Impact
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Turn your sustainable actions into tangible rewards. Every
                  eco-friendly choice you make earns you EcoCoins and brings you
                  closer to exclusive benefits.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-4 text-center">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-center">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center mt-12"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-3xl max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4">
                    🎯 Your Impact Multiplied
                  </h3>
                  <p className="text-lg">
                    Every 100 EcoCoins = 1kg CO₂ offset. Join 50,000+ users
                    who've already offset 2.5M kg of CO₂!
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        <footer className="group bg-[#f6eee8]">
          <h1 className="hidden sm:block text-[12vw] group-hover:translate-y-1 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent transition-all ease-linear">
            EcoTrack360
          </h1>
          <section className="bg-[#e8dbc6] h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full">
            <div className="text-center text-gray-700">
              <div className="text-3xl mb-2">🌍</div>
              <p>Tracking Impact, Inspiring Change</p>
              <p className="text-sm text-gray-600 mt-2">
                "Be the change you wish to see in the world"
              </p>
            </div>
          </section>
        </footer>
      </main>
    </ReactLenis>
  );
}
