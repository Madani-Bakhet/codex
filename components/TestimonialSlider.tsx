"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TestimonialSlider() {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t("testimonials.quotes.quote1"),
      author: t("testimonials.quotes.author1"),
      role: t("testimonials.quotes.role1"),
    },
    {
      quote: t("testimonials.quotes.quote2"),
      author: t("testimonials.quotes.author2"),
      role: t("testimonials.quotes.role2"),
    },
    {
      quote: t("testimonials.quotes.quote3"),
      author: t("testimonials.quotes.author3"),
      role: t("testimonials.quotes.role3"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative max-w-4xl mx-auto glass-card p-8 md:p-12 text-center"
    >
      <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
      <div className="min-h-[150px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xl md:text-2xl font-medium mb-8 text-foreground">
              "{testimonials[currentIndex].quote}"
            </p>
            <div>
              <h4 className="font-bold text-lg font-[family-name:var(--font-space-grotesk)] text-foreground">
                {testimonials[currentIndex].author}
              </h4>
              <p className="text-primary text-sm">{testimonials[currentIndex].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={prev} className="p-2 rounded-full hover:bg-foreground/5 transition-colors border border-foreground/10 text-foreground interactive">
          <ChevronLeft className="w-6 h-6 pointer-events-none" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? "bg-primary" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 rounded-full hover:bg-foreground/5 transition-colors border border-foreground/10 text-foreground interactive">
          <ChevronRight className="w-6 h-6 pointer-events-none" />
        </button>
      </div>
    </motion.div>
  );
}
