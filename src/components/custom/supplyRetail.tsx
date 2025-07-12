"use client";
import { motion } from "framer-motion";
import ButtonCustom from "../ui/Button.custom";

const retailerFeatures = [
  {
    icon: "📦",
    title: "SMART INVENTORY MANAGEMENT",
    desc: "Optimize stock levels sustainably, reducing waste and ensuring shelves are stocked efficiently using AI-powered demand forecasting.",
    color: "bg-purple-200",
    hoverText: "LEARN MORE",
  },
  {
    icon: "🚚",
    title: "ECO LAST-MILE DELIVERY",
    desc: "Minimize carbon emissions by optimizing delivery routes and utilizing hyper-local fulfillment for faster, cleaner deliveries.",
    color: "bg-yellow-200",
    hoverText: "LEARN MORE",
  },
  {
    icon: "📈",
    title: "AI-DRIVEN ANALYTICS",
    desc: "Leverage predictive analytics to align operations with sustainability goals while maintaining operational efficiency and reducing costs.",
    color: "bg-sky-200",
    hoverText: "LEARN MORE",
  },
];

export default function WhatWeDoRetailersSection() {
  return (
    <section className="bg-gradient-to-br from-sky-50 via-yellow-50 to-purple-50 min-h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden py-16 lg:py-20">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#8b5cf620_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf620_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-purple-600 via-yellow-600 to-sky-600 bg-clip-text text-transparent">
              What We Do For Retailers
            </span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 via-yellow-500 to-sky-500 rounded-full"></span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            EcoTrack360 helps retailers transform their supply chains by optimizing inventory, reducing last-mile emissions, and leveraging AI for sustainable operational excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {retailerFeatures.map((item, index) => (
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
                  <ButtonCustom value="Explore" />
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
      </div>
    </section>
  );
}
