"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(true);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Removed the spring configuration to eliminate the artificial delay.
  // The cursor will now instantly track the mouse pointer.

  useEffect(() => {
    // Check if device uses fine pointer (mouse/trackpad)
    if (typeof window !== "undefined") {
      const isFine = window.matchMedia("(pointer: fine)").matches;
      setIsPointerFine(isFine);
      if (!isFine) return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parents are interactive
      const isClickable = target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('[data-cursor-hover]');
      if (isClickable) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isPointerFine || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        width: 32,
        height: 32,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full border-2 border-primary/50 backdrop-blur-[2px]"
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'color-mix(in srgb, var(--primary) 80%, transparent)' : 'color-mix(in srgb, var(--primary) 10%, transparent)',
          borderColor: isHovering ? 'rgba(0, 0, 0, 0)' : 'color-mix(in srgb, var(--primary) 50%, transparent)',
        }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  );
};
