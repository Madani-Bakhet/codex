"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  glowOnHover?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className = "", glowOnHover = false, children, ...props }, ref) => {
    const glowClass = glowOnHover ? "hover:glow-border interactive" : "";
    return (
      <motion.div
        ref={ref}
        className={`glass-card rounded-xl p-6 transition-all duration-300 ${glowClass} ${className}`}
        whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,240,255,0.1)' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
