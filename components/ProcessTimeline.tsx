"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ProcessTimeline() {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("process.steps.step1_title"),
      description: t("process.steps.step1_desc"),
    },
    {
      title: t("process.steps.step2_title"),
      description: t("process.steps.step2_desc"),
    },
    {
      title: t("process.steps.step3_title"),
      description: t("process.steps.step3_desc"),
    },
    {
      title: t("process.steps.step4_title"),
      description: t("process.steps.step4_desc"),
    },
  ];

  return (
    <div className="relative ml-4 md:ml-0 mt-16 md:flex md:justify-between md:pt-8">
      {/* Mobile Line */}
      <motion.div
        className="absolute left-[-1px] top-0 w-[1px] h-full bg-primary/30 md:hidden"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
      {/* Desktop Line */}
      <motion.div
        className="hidden md:block absolute left-0 top-[-1px] w-full h-[1px] bg-primary/30"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "left" }}
      />
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="mb-10 ml-8 md:mb-0 md:ml-0 md:flex-1 md:px-4 relative"
        >
          <div className="absolute -left-[41px] top-0 md:-top-[41px] md:left-1/2 md:-translate-x-1/2 bg-surface rounded-full p-1 border border-primary/30 text-primary">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="md:text-center mt-2">
            <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)] text-foreground">
              0{index + 1}. {step.title}
            </h3>
            <p className="text-text-muted">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
