"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", glow = false, ...props }, ref) => {
    let baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 interactive";
    
    let variants = {
      primary: "bg-surface text-foreground border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] hover:bg-surface glow-border",
      secondary: "bg-secondary text-white hover:bg-secondary/80",
      outline: "border border-[color-mix(in_srgb,var(--foreground)_20%,transparent)] bg-transparent hover:bg-surface",
      ghost: "hover:bg-surface hover:text-foreground",
    };
    
    let sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-md px-8",
      icon: "h-10 w-10",
    };

    let glowClass = glow ? "glow-border" : "";

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowClass} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
