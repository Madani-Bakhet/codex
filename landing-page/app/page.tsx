"use client";

import { useEffect, useState } from "react";
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
import { fetchStats, fetchFaqs, submitContact, StatData, FaqData } from "@/context/api";

// Icons for Marquee
import { Blocks, Braces, Cloud, Database, Layout, Server, Code2 } from "lucide-react";

export default function Home() {
  const { t, i18n } = useTranslation();

  // Dynamic States
  const [stats, setStats] = useState<StatData[]>([]);
  const [faqs, setFaqs] = useState<FaqData[]>([]);
  
  // Contact Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    // Load Stats
    fetchStats()
      .then(setStats)
      .catch((err) => console.error("Error loading stats:", err));

    // Load FAQs
    fetchFaqs()
      .then(setFaqs)
      .catch((err) => console.error("Error loading FAQs:", err));
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectDescription) {
      setSubmitStatus({ type: "error", message: t("contact.validation_error") || "Please fill in all fields." });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitContact({ name, email, projectDescription });
      setSubmitStatus({ type: "success", message: t("contact.success_msg") || "Thank you! Your message has been sent successfully." });
      setName("");
      setEmail("");
      setProjectDescription("");
    } catch (err: any) {
      console.error("Contact submit error:", err);
      setSubmitStatus({ type: "error", message: err.message || "Failed to send message. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const techStack = [
    <Blocks key="1" className="w-16 h-16" />,
    <Braces key="2" className="w-16 h-16" />,
    <Cloud key="3" className="w-16 h-16" />,
    <Database key="4" className="w-16 h-16" />,
    <Layout key="5" className="w-16 h-16" />,
    <Server key="6" className="w-16 h-16" />,
  ];

  // Fallbacks if stats fail to load from API
  const defaultStats = [
    { id: 1, key: "projects", value: 100, suffix: "+", labelEn: "Projects Delivered", labelAr: "مشاريع منجزة" },
    { id: 2, key: "satisfaction", value: 99, suffix: "%", labelEn: "Client Satisfaction", labelAr: "رضا العملاء" },
    { id: 3, key: "support", value: 24, suffix: "/7", labelEn: "Support Available", labelAr: "دعم متاح" }
  ];

  const displayedStats = stats.length > 0 ? stats : defaultStats;

  // Localized FAQ Accordion items
  const faqItems = faqs.map(faq => ({
    title: i18n.language === "ar" ? faq.questionAr : faq.questionEn,
    content: i18n.language === "ar" ? faq.answerAr : faq.answerEn
  }));

  // Fallback FAQs if backend is empty/loading
  const defaultFaqs = [
    { title: t("faq.q1"), content: t("faq.a1") },
    { title: t("faq.q2"), content: t("faq.a2") },
    { title: t("faq.q3"), content: t("faq.a3") }
  ];

  const displayedFaqs = faqItems.length > 0 ? faqItems : defaultFaqs;

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
            {displayedStats.map((stat) => (
              <StatCounter 
                key={stat.id} 
                end={stat.value} 
                suffix={stat.suffix} 
                label={i18n.language === "ar" ? stat.labelAr : stat.labelEn} 
              />
            ))}
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
          <Accordion items={displayedFaqs} />
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
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">{t("contact.form_name")}</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 px-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground" 
                    placeholder={t("contact.form_name_ph")} 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">{t("contact.form_email")}</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground" 
                    placeholder={t("contact.form_email_ph")} 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">{t("contact.form_desc")}</label>
                <textarea 
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full h-32 p-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none text-foreground" 
                  placeholder={t("contact.form_desc_ph")}
                  required
                ></textarea>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-md text-sm ${
                  submitStatus.type === "success" 
                    ? "bg-green-500/10 border border-green-500/30 text-green-400" 
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <Button 
                type="submit"
                variant="primary" 
                size="lg" 
                glow 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : t("contact.submit")}
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
