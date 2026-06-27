"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion, useTransform } from "framer-motion";

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ end, duration = 2, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  const rounded = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-[family-name:var(--font-space-grotesk)] flex justify-center items-center">
        <motion.span>{rounded}</motion.span>{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-text-muted font-medium">
        {label}
      </div>
    </div>
  );
}
