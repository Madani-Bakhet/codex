"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { Monitor, Smartphone, Cog } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.items.web_title"),
      description: t("services.items.web_desc"),
      icon: <Monitor className="w-8 h-8 text-primary mb-4" />,
    },
    {
      title: t("services.items.mobile_title"),
      description: t("services.items.mobile_desc"),
      icon: <Smartphone className="w-8 h-8 text-secondary mb-4" />,
    },
    {
      title: t("services.items.sdlc_title"),
      description: t("services.items.sdlc_desc"),
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
            {t("services.title")}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {t("services.subtitle")}
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
