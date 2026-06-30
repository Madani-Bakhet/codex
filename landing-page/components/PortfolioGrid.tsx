"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code, Smartphone, Database } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fetchPortfolio, PortfolioItemData } from "@/context/api";

export function PortfolioGrid() {
  const { i18n } = useTranslation();
  const [projects, setProjects] = useState<PortfolioItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPortfolio()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading portfolio:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("mobile") || cat.includes("جوال") || cat.includes("phone")) {
      return <Smartphone className="w-12 h-12 mb-4 text-secondary" />;
    }
    if (cat.includes("app") || cat.includes("تطبيق") || cat.includes("dashboard") || cat.includes("مالية")) {
      return <Database className="w-12 h-12 mb-4 text-primary" />;
    }
    return <Code className="w-12 h-12 mb-4 text-primary" />;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card h-[250px] p-8 animate-pulse flex flex-col justify-between">
            <div className="w-12 h-12 bg-foreground/10 rounded" />
            <div className="space-y-3">
              <div className="h-4 bg-foreground/10 rounded w-1/3" />
              <div className="h-6 bg-foreground/10 rounded w-3/4" />
              <div className="h-4 bg-foreground/10 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || projects.length === 0) {
    // Elegant fallback to look premium even if connection fails
    return (
      <div className="text-center py-12 glass-card max-w-lg mx-auto">
        <p className="text-text-muted mb-4">Unable to load dynamic work showcase.</p>
        <button 
          onClick={() => { setLoading(true); setError(false); }} 
          className="px-4 py-2 border border-primary/20 hover:border-primary/50 text-foreground text-sm rounded transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => {
        const title = i18n.language === "ar" ? project.titleAr : project.titleEn;
        const category = i18n.language === "ar" ? project.categoryAr : project.categoryEn;
        const description = i18n.language === "ar" ? project.descriptionAr : project.descriptionEn;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group h-full"
          >
            <a 
              href={project.projectUrl || "#"} 
              className="glass-card h-full p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:glow-border hover:-translate-y-2 interactive block"
            >
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              {getIcon(category)}
              <div className="text-sm text-primary mb-2 font-medium">{category}</div>
              <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)] text-foreground">
                {title}
              </h3>
              <p className="text-text-muted flex-grow">{description}</p>
            </a>
          </motion.div>
        );
      })}
    </div>
  );
}
