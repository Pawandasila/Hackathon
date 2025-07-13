"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocity: {
    x: number;
    y: number;
  };
}

export default function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  const colors = [
    "#f43f5e", // rose
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#ec4899", // pink
  ];

  const createConfettiPiece = (id: number): ConfettiPiece => ({
    id,
    x: Math.random() * window.innerWidth,
    y: -10,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    velocity: {
      x: (Math.random() - 0.5) * 4,
      y: Math.random() * 3 + 2,
    },
  });

  const triggerConfetti = () => {
    setIsActive(true);
    const pieces: ConfettiPiece[] = [];
    
    // Create initial burst
    for (let i = 0; i < 50; i++) {
      pieces.push(createConfettiPiece(i));
    }
    
    setConfetti(pieces);

    // Add more pieces over time
    let count = 50;
    const interval = setInterval(() => {
      if (count < 100) {
        setConfetti(prev => [...prev, createConfettiPiece(count++)]);
      } else {
        clearInterval(interval);
      }
    }, 100);

    // Clean up after 5 seconds
    setTimeout(() => {
      setIsActive(false);
      setConfetti([]);
    }, 5000);
  };

  useEffect(() => {
    const handleTriggerConfetti = () => {
      triggerConfetti();
    };

    window.addEventListener('triggerConfetti', handleTriggerConfetti);

    return () => {
      window.removeEventListener('triggerConfetti', handleTriggerConfetti);
    };
  }, []);

  useEffect(() => {
    if (!isActive || confetti.length === 0) return;

    const interval = setInterval(() => {
      setConfetti(prev => 
        prev
          .map(piece => ({
            ...piece,
            x: piece.x + piece.velocity.x,
            y: piece.y + piece.velocity.y,
            rotation: piece.rotation + 5,
            velocity: {
              ...piece.velocity,
              y: piece.velocity.y + 0.1, // gravity
            },
          }))
          .filter(piece => piece.y < window.innerHeight + 50) // Remove pieces that fall off screen
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isActive, confetti.length]);

  if (!isActive || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  );
}
