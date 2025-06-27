"use client";
import { motion } from "framer-motion";

interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

const benefits: Benefit[] = [
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

export default function RewardsSection() {
  return (
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
            Turn your sustainable actions into tangible rewards. Every eco-friendly choice you make earns you EcoCoins and brings you closer to exclusive benefits.
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
              <div className="text-4xl mb-4 text-center">{benefit.icon}</div>
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
            <h3 className="text-2xl font-bold mb-4">🎯 Your Impact Multiplied</h3>
            <p className="text-lg">
              Every 100 EcoCoins = 1kg CO₂ offset. Join 50,000+ users who've already offset 2.5M kg of CO₂!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
