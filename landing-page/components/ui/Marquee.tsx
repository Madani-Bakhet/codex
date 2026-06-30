"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number; // seconds to complete one loop
}

export function Marquee({ items, speed = 20 }: MarqueeProps) {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap flex relative py-8 w-full before:absolute before:inset-0 before:bg-gradient-to-r before:from-background before:via-transparent before:to-background before:z-10 before:pointer-events-none">
      <motion.div
        className="flex items-center gap-16 pr-16"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
