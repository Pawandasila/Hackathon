"use client";
import { motion } from "framer-motion";
import ButtonCustom from "../ui/Button.custom";

const features = [
  {
    icon: "📊",
    title: "REAL-TIME CARBON TRACKING",
    desc: "Monitor your daily carbon footprint across all activities with precision and clarity",
    color: "bg-rose-300",
    hoverText: "LEARN MORE",
  },
  {
    icon: "🤖",
    title: "AI-POWERED RECOMMENDATIONS",
    desc: "Get personalized suggestions to reduce environmental impact through smart technology",
    color: "bg-green-300",
    hoverText: "LEARN MORE",
  },
  {
    icon: "🌍",
    title: "COMMUNITY IMPACT",
    desc: "Join a global movement of environmentally conscious individuals making real change",
    color: "bg-orange-300",
    hoverText: "LEARN MORE",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden py-16 lg:py-20">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              What We Do
            </span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            EcoTrack360 empowers individuals and businesses to make meaningful environmental impact through intelligent tracking and actionable insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer transition-all duration-700 ease-in-out"
            >
              {/* Main Card */}
              <div
                className={`${item.color} p-8 rounded-2xl border-2 border-gray-800 transition-all duration-300 group-hover:transform group-hover:rotate-3 group-hover:scale-105 relative overflow-hidden`}
              >
                {/* Hover Text on Side */}
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-gray-800 font-bold text-sm tracking-wider whitespace-nowrap">
                    {item.hoverText}
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="text-3xl">{item.icon}</div>
                  <motion.div
                    className="text-gray-800"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </motion.div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom CTA */}
                <div className="mt-8 pt-4 border-t border-gray-700/20 flex justify-center">
                  <ButtonCustom value="Let's Go" />
                </div>
              </div>

              {/* Background Shadow Cards */}
              <div
                className={`absolute inset-0 ${item.color} rounded-2xl border-2 border-gray-800 -z-10 transform translate-x-2 translate-y-2 opacity-60`}
              ></div>
              <div
                className={`absolute inset-0 ${item.color} rounded-2xl border-2 border-gray-800 -z-20 transform translate-x-4 translate-y-4 opacity-30`}
              ></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-8 rounded-3xl max-w-4xl mx-auto shadow-2xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Our Sustainability Promise
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                We're committed to making a real difference. Every action tracked, every insight shared, and every community member contributes to a healthier planet.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-2xl mb-2">♻️</div>
                  <div className="text-lg font-semibold">Carbon Neutral</div>
                  <div className="text-sm opacity-90">Operations</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="text-lg font-semibold">100% Green</div>
                  <div className="text-sm opacity-90">Energy</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="text-lg font-semibold">Global Impact</div>
                  <div className="text-sm opacity-90">Community</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
