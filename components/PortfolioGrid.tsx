"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code, Smartphone, Database } from "lucide-react";
import { useTranslation } from "react-i18next";

export function PortfolioGrid() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("portfolio.projects.proj1_title"),
      category: t("portfolio.projects.proj1_cat"),
      description: t("portfolio.projects.proj1_desc"),
      icon: <Database className="w-12 h-12 mb-4 text-primary" />,
    },
    {
      title: t("portfolio.projects.proj2_title"),
      category: t("portfolio.projects.proj2_cat"),
      description: t("portfolio.projects.proj2_desc"),
      icon: <Smartphone className="w-12 h-12 mb-4 text-secondary" />,
    },
    {
      title: t("portfolio.projects.proj3_title"),
      category: t("portfolio.projects.proj3_cat"),
      description: t("portfolio.projects.proj3_desc"),
      icon: <Code className="w-12 h-12 mb-4 text-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group h-full"
        >
          <div className="glass-card h-full p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:glow-border hover:-translate-y-2 interactive">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            {project.icon}
            <div className="text-sm text-primary mb-2 font-medium">{project.category}</div>
            <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)] text-foreground">
              {project.title}
            </h3>
            <p className="text-text-muted flex-grow">{project.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
