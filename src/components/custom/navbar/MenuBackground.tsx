"use client";

import React from "react";
import { motion } from "framer-motion";

const MenuBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dynamic Gradient Mesh */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(5, 150, 105, 0.08) 0%, transparent 50%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.12) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(5, 150, 105, 0.08) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.18) 0%, transparent 60%),
             radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
             radial-gradient(circle at 60% 60%, rgba(5, 150, 105, 0.10) 0%, transparent 60%)`,
            `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 50%),
             radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
             radial-gradient(circle at 70% 30%, rgba(5, 150, 105, 0.06) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Geometric Elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className={`absolute ${
            i % 4 === 0
              ? "w-6 h-6 rounded-full bg-gradient-to-br from-emerald-200/30 to-green-300/20"
              : i % 4 === 1
              ? "w-4 h-4 rounded bg-gradient-to-br from-teal-200/25 to-emerald-300/15 rotate-45"
              : i % 4 === 2
              ? "w-8 h-1 rounded-full bg-gradient-to-r from-green-200/20 to-emerald-200/15"
              : "w-3 h-8 rounded-full bg-gradient-to-b from-emerald-200/20 to-green-200/10"
          }`}
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            ],
            y: [
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            ],
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Light Rays */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-0 left-1/2 w-0.5 origin-top"
          style={{
            height: "100vh",
            background: `linear-gradient(to bottom, rgba(16, 185, 129, 0.1), transparent)`,
            transform: `rotate(${i * 45}deg)`,
            transformOrigin: "top center",
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Morphing Blob Shapes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`blob-${i}`}
          className="absolute rounded-full filter blur-2xl"
          style={{
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            left: `${15 + i * 20}%`,
            top: `${10 + i * 20}%`,
            background: `radial-gradient(circle, ${
              i % 2 === 0
                ? "rgba(16, 185, 129, 0.08)"
                : "rgba(34, 197, 94, 0.06)"
            } 0%, transparent 70%)`,
          }}
          animate={{
            scale: [0.8, 1.4, 0.8],
            x: [-30, 30, -30],
            y: [-20, 20, -20],
            borderRadius: ["50%", "40% 60%", "50%"],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Interactive Particle System */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-emerald-400/40 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: typeof window !== "undefined" ? window.innerHeight : 800,
            scale: 0,
          }}
          animate={{
            y: -100,
            x: [
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            ],
            scale: [0, Math.random() * 2 + 0.5, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        />
      ))}

      {/* Pulsing Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute top-1/2 left-1/2 border border-emerald-300/20 rounded-full"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            marginLeft: `-${100 + i * 50}px`,
            marginTop: `-${100 + i * 50}px`,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0, 0.3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default MenuBackground;
