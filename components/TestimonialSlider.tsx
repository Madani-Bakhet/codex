"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Codex completely transformed our digital presence. The new web app is incredibly fast and our conversion rates have doubled.",
    author: "Jane Doe",
    role: "CEO, TechStart",
  },
  {
    quote: "Working with Codex was a breeze. They handled everything from design to deployment with extreme professionalism.",
    author: "John Smith",
    role: "CTO, Enterprise Solutions",
  },
  {
    quote: "The mobile app they delivered is stunning. The UI is flawless and it performs perfectly across all devices.",
    author: "Sarah Connor",
    role: "Product Manager, Innovate AI",
  },
];

export function TestimonialSlider() {
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
