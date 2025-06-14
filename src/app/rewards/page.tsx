"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Gift,
  Star,
  Coins,
  Target,
  Zap,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Crown,
  ArrowRight,
} from "lucide-react";
import CustomButton from "@/components/custom/CustomButton";
import ButtonCustom from "@/components/ui/Button.custom";

const RewardsPage = () => {
  const [activeReward, setActiveReward] = useState<number | null>(null);
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);

  const rewards = [
    {
      id: 1,
      title: "Eco Warrior",
      description: "Complete 30 days of sustainable actions",
      points: 500,
      icon: Trophy,
      color: "from-yellow-400 to-orange-500",
      requirement: "30 days streak",
      claimed: false,
      rarity: "Epic",
    },
    {
      id: 2,
      title: "Carbon Crusher",
      description: "Reduce your carbon footprint by 50%",
      points: 750,
      icon: Target,
      color: "from-green-400 to-emerald-600",
      requirement: "50% reduction",
      claimed: false,
      rarity: "Legendary",
    },
    {
      id: 3,
      title: "Community Leader",
      description: "Invite 10 friends to join EcoTrack360",
      points: 300,
      icon: Users,
      color: "from-blue-400 to-purple-600",
      requirement: "10 referrals",
      claimed: false,
      rarity: "Rare",
    },
    {
      id: 4,
      title: "Green Innovator",
      description: "Submit 5 sustainability improvement ideas",
      points: 400,
      icon: Zap,
      color: "from-purple-400 to-pink-600",
      requirement: "5 ideas submitted",
      claimed: false,
      rarity: "Epic",
    },
  ];

  const achievements = [
    {
      title: "First Steps",
      description: "Created your first sustainability goal",
      completed: true,
    },
    {
      title: "Consistent Action",
      description: "7-day streak completed",
      completed: true,
    },
    {
      title: "Data Tracker",
      description: "Logged 30 days of data",
      completed: false,
    },
    {
      title: "Social Impact",
      description: "Shared progress with community",
      completed: false,
    },
  ];

  const leaderboard = [
    { name: "Alex Green", points: 2450, rank: 1, avatar: "🌱" },
    { name: "Sarah Eco", points: 2301, rank: 2, avatar: "🌿" },
    { name: "Mike Nature", points: 2156, rank: 3, avatar: "🌳" },
    { name: "You", points: 1876, rank: 4, avatar: "⭐", isUser: true },
    { name: "Emma Earth", points: 1654, rank: 5, avatar: "🍃" },
  ];

  const handleClaimReward = (rewardId: number) => {
    setClaimedRewards([...claimedRewards, rewardId]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6eee8] via-[#e8dbc6] to-[#f6eee8] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-30"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
            }}
            animate={{
              y: -100,
              x: Math.random() * 100 - 50,
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl"
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 25px 50px rgba(251, 191, 36, 0.5)",
              }}
              transition={{ duration: 0.8 }}
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Eco Rewards
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Earn points, unlock achievements, and compete with the
              <span className="relative mx-2">
                community
                <svg
                  viewBox="0 0 286 73"
                  fill="none"
                  className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 1.25,
                      ease: "easeInOut",
                    }}
                    d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                    stroke="#FACC15"
                    strokeWidth="3"
                  />
                </svg>
              </span>
              while making a positive environmental impact
            </motion.p>

            {/* Stats Overview */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
              variants={itemVariants}
            >
              {[
                {
                  label: "Total Points",
                  value: "1,876",
                  icon: Coins,
                  color: "from-yellow-500 to-orange-600",
                },
                {
                  label: "Achievements",
                  value: "12/20",
                  icon: Award,
                  color: "from-purple-500 to-pink-600",
                },
                {
                  label: "Global Rank",
                  value: "#4",
                  icon: TrendingUp,
                  color: "from-emerald-500 to-green-600",
                },
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/60"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-4`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Available Rewards */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Available <span className="text-emerald-600">Rewards</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rewards.map((reward) => {
                const IconComponent = reward.icon;
                const isClaimed = claimedRewards.includes(reward.id);

                return (
                  <motion.div
                    key={reward.id}
                    className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60 overflow-hidden transition-all duration-500 ${
                      isClaimed ? "opacity-75" : ""
                    }`}
                    onMouseEnter={() => setActiveReward(reward.id)}
                    onMouseLeave={() => setActiveReward(null)}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                    }}
                    variants={itemVariants}
                  >
                    {/* Rarity Badge */}
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                        reward.rarity === "Legendary"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : reward.rarity === "Epic"
                          ? "bg-gradient-to-r from-orange-500 to-red-500"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500"
                      }`}
                    >
                      {reward.rarity}
                    </div>

                    {/* Claimed Badge */}
                    {isClaimed && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Claimed</span>
                      </div>
                    )}

                    <div className="text-center">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${reward.color} rounded-2xl mb-6 shadow-xl`}
                        whileHover={{
                          rotate: 360,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.8 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {reward.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{reward.description}</p>
                      <p className="text-sm text-emerald-600 font-medium mb-6">
                        Requirement: {reward.requirement}
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-6">
                        <Coins className="w-5 h-5 text-yellow-500" />
                        <span className="text-2xl font-bold text-gray-800">
                          {reward.points}
                        </span>
                        <span className="text-gray-600">points</span>
                      </div>{" "}
                      {/* <CustomButton
                        onClick={() => handleClaimReward(reward.id)}
                        variant={isClaimed ? "secondary" : "primary"}
                        disabled={isClaimed}
                        className="w-full"
                      >
                        {isClaimed ? "Claimed" : "Claim Reward"}
                      </CustomButton> */}
                      <ButtonCustom value="Claim Reward"/>
                    </div>

                    {/* Animated Sparkles on Hover */}
                    <AnimatePresence>
                      {activeReward === reward.id && !isClaimed && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                              style={{
                                left: `${20 + i * 10}%`,
                                top: `${20 + (i % 2) * 60}%`,
                              }}
                              animate={{
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0],
                                rotate: 360,
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Achievements */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Your <span className="text-purple-600">Achievements</span>
              </h2>

              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/60 flex items-center space-x-4 ${
                      achievement.completed ? "ring-2 ring-green-400" : ""
                    }`}
                    whileHover={{ scale: 1.02, x: 10 }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        achievement.completed
                          ? "bg-gradient-to-r from-green-400 to-emerald-500"
                          : "bg-gray-200"
                      }`}
                    >
                      {achievement.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Star className="w-6 h-6 text-yellow-500" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Global <span className="text-orange-600">Leaderboard</span>
              </h2>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/60">
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.name}
                      className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                        user.isUser
                          ? "bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-300"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          user.rank === 1
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : user.rank === 2
                            ? "bg-gradient-to-r from-gray-400 to-gray-600"
                            : user.rank === 3
                            ? "bg-gradient-to-r from-amber-600 to-yellow-700"
                            : "bg-gradient-to-r from-emerald-400 to-green-500"
                        }`}
                      >
                        {user.rank === 1 ? (
                          <Crown className="w-4 h-4" />
                        ) : (
                          user.rank
                        )}
                      </div>
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            user.isUser ? "text-emerald-700" : "text-gray-800"
                          }`}
                        >
                          {user.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {user.points.toLocaleString()} points
                        </p>
                      </div>
                      {user.isUser && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-5 h-5 text-emerald-500" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <motion.div
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 max-w-4xl mx-auto shadow-xl border border-white/60"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
              }}
            >
              <motion.h2
                className="text-4xl font-bold text-gray-800 mb-6"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ready to Earn More Rewards?
              </motion.h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Complete daily challenges, track your progress, and unlock
                exclusive
                <span className="relative mx-2">
                  rewards
                  <svg
                    viewBox="0 0 286 73"
                    fill="none"
                    className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{
                        duration: 1.25,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                      stroke="#FACC15"
                      strokeWidth="3"
                    />
                  </svg>
                </span>
                for your eco-friendly lifestyle
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {" "}
                {/* <CustomButton variant="primary">
                  View Daily Challenges
                </CustomButton>
                <CustomButton variant="secondary">
                  Browse Reward Store
                </CustomButton> */}
                <ButtonCustom value="View Daily Challenges" />
                <ButtonCustom value="Browse Reward Store" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RewardsPage;
