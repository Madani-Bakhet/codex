"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { Monitor, Smartphone, Cog } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "High-performance web applications built with modern frameworks like Next.js and React.",
      icon: <Monitor className="w-8 h-8 text-primary mb-4" />,
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile experiences that engage and convert users.",
      icon: <Smartphone className="w-8 h-8 text-secondary mb-4" />,
    },
    {
      title: "SDLC & DevOps",
      description: "End-to-end lifecycle management, from ideation to continuous deployment and maintenance.",
      icon: <Cog className="w-8 h-8 text-primary mb-4" />,
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
            Comprehensive Solutions
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            We handle every aspect of the software development lifecycle, delivering robust and scalable software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="h-full"
            >
              <GlassCard glowOnHover className="h-full">
                {service.icon}
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)]">
                  {service.title}
                </h3>
                <p className="text-text-muted">{service.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
