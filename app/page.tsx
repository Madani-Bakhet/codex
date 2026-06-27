"use client";

import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { Accordion } from "@/components/ui/Accordion";
import { Marquee } from "@/components/ui/Marquee";
import { StatCounter } from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/Navbar";
import { useTranslation } from "react-i18next";

// Icons for Marquee
import { Blocks, Braces, Cloud, Database, Layout, Server, Code2 } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  const techStack = [
    <Blocks key="1" className="w-16 h-16" />,
    <Braces key="2" className="w-16 h-16" />,
    <Cloud key="3" className="w-16 h-16" />,
    <Database key="4" className="w-16 h-16" />,
    <Layout key="5" className="w-16 h-16" />,
    <Server key="6" className="w-16 h-16" />,
  ];

  const faqs = [
    {
      title: t("faq.q1"),
      content: t("faq.a1")
    },
    {
      title: t("faq.q2"),
      content: t("faq.a2")
    },
    {
      title: t("faq.q3"),
      content: t("faq.a3")
    }
  ];

  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      
      <div id="home">
        <Hero />
      </div>

      {/* Stats Section */}
      <section className="py-12 border-y border-foreground/5 bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCounter end={100} suffix="+" label={t("stats.projects")} />
            <StatCounter end={99} suffix="%" label={t("stats.satisfaction")} />
            <StatCounter end={24} suffix="/7" label={t("stats.support")} />
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-8 bg-background border-b border-foreground/5 overflow-hidden">
        <div className="container mx-auto px-4 mb-4 text-center">
          <p className="text-sm font-medium text-text-muted uppercase tracking-widest">
            {t("marquee.title")}
          </p>
        </div>
        <Marquee items={techStack} speed={30} />
      </section>

      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* Our Process Section */}
      <section id="process" className="py-24 relative overflow-hidden bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)] text-foreground">
              {t("process.title")}
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              {t("process.subtitle")}
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* Portfolio / Featured Work */}
      <section id="portfolio" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)] text-foreground">
              {t("portfolio.title")}
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              {t("portfolio.subtitle")}
            </p>
          </div>
          <PortfolioGrid />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative bg-surface/30 border-y border-foreground/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)] text-foreground">
                {t("about.title")}
              </h2>
              <p className="text-lg text-text-muted mb-6">
                {t("about.desc1")}
              </p>
              <p className="text-lg text-text-muted mb-8">
                {t("about.desc2")}
              </p>
              <div className="flex gap-4">
                <div className="flex-1 glass-card p-4 text-center">
                  <h4 className="font-bold text-primary mb-1">{t("about.innovation_title")}</h4>
                  <p className="text-sm text-text-muted">{t("about.innovation_desc")}</p>
                </div>
                <div className="flex-1 glass-card p-4 text-center">
                  <h4 className="font-bold text-secondary mb-1">{t("about.reliability_title")}</h4>
                  <p className="text-sm text-text-muted">{t("about.reliability_desc")}</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full h-[400px] glass-card flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10" />
                <Code2 className="w-32 h-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[128px] -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)] text-foreground">
              {t("testimonials.title")}
            </h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative bg-surface/30 border-y border-foreground/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)] text-foreground">
              {t("faq.title")}
            </h2>
            <p className="text-text-muted">{t("faq.subtitle")}</p>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10" />
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)] text-foreground">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>
          
          <div className="glass-card p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">{t("contact.form_name")}</label>
                  <input type="text" className="w-full h-12 px-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground" placeholder={t("contact.form_name_ph")} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">{t("contact.form_email")}</label>
                  <input type="email" className="w-full h-12 px-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground" placeholder={t("contact.form_email_ph")} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">{t("contact.form_desc")}</label>
                <textarea className="w-full h-32 p-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none text-foreground" placeholder={t("contact.form_desc_ph")}></textarea>
              </div>
              <Button variant="primary" size="lg" glow className="w-full">
                {t("contact.submit")}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-foreground/10 text-center text-sm text-text-muted bg-background">
        <p>© {new Date().getFullYear()} {t("footer.rights")}</p>
      </footer>
    </div>
  );
}
