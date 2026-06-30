"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fetchTestimonials, TestimonialData } from "@/context/api";

export function TestimonialSlider() {
  const { i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading testimonials:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center animate-pulse">
        <Quote className="w-12 h-12 text-primary/10 mx-auto mb-6" />
        <div className="h-6 bg-foreground/10 rounded w-3/4 mx-auto mb-6" />
        <div className="h-4 bg-foreground/10 rounded w-1/4 mx-auto mb-2" />
        <div className="h-3 bg-foreground/10 rounded w-1/6 mx-auto" />
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return null; // Mute testimonials if backend fails rather than cluttering UI
  }

  const activeTestimonial = testimonials[currentIndex];
  const quote = i18n.language === "ar" ? activeTestimonial.quoteAr : activeTestimonial.quoteEn;
  const author = i18n.language === "ar" ? activeTestimonial.authorAr : activeTestimonial.authorEn;
  const role = i18n.language === "ar" ? activeTestimonial.roleAr : activeTestimonial.roleEn;
  const company = i18n.language === "ar" ? activeTestimonial.companyAr : activeTestimonial.companyEn;

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
              "{quote}"
            </p>
            <div>
              <h4 className="font-bold text-lg font-[family-name:var(--font-space-grotesk)] text-foreground">
                {author}
              </h4>
              <p className="text-primary text-sm">
                {role}{company ? `, ${company}` : ""}
              </p>
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
