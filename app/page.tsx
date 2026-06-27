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

// Icons for Marquee
import { Blocks, Braces, Cloud, Database, Layout, Server, Code2 } from "lucide-react";

export default function Home() {
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
      title: "What is your typical project timeline?",
      content: "Depending on the complexity, a typical MVP takes 8-12 weeks. Enterprise solutions can take 4-6 months to ensure maximum robustness and scalability."
    },
    {
      title: "Do you offer post-launch support?",
      content: "Yes, we offer comprehensive maintenance and support packages to ensure your software remains secure, updated, and performs optimally."
    },
    {
      title: "What is your pricing model?",
      content: "We offer both fixed-bid and time-and-materials engagement models, tailored to the specific needs and flexibility requirements of your project."
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
            <StatCounter end={100} suffix="+" label="Projects Delivered" />
            <StatCounter end={99} suffix="%" label="Client Satisfaction" />
            <StatCounter end={24} suffix="/7" label="Support Available" />
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-8 bg-background border-b border-foreground/5 overflow-hidden">
        <div className="container mx-auto px-4 mb-4 text-center">
          <p className="text-sm font-medium text-text-muted uppercase tracking-widest">
            Powered By Modern Technology
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
              Our Process
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              A transparent, agile methodology designed to deliver value quickly while minimizing risk.
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
              Featured Work
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Explore some of the innovative solutions we've crafted for our partners.
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
                We are Codex.
              </h2>
              <p className="text-lg text-text-muted mb-6">
                Founded with the mission to build robust, scalable software, we are a team of passionate engineers, designers, and strategists.
              </p>
              <p className="text-lg text-text-muted mb-8">
                We believe in code quality, transparent communication, and delivering products that not only meet business goals but also delight users.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 glass-card p-4 text-center">
                  <h4 className="font-bold text-primary mb-1">Innovation</h4>
                  <p className="text-sm text-text-muted">Pushing boundaries</p>
                </div>
                <div className="flex-1 glass-card p-4 text-center">
                  <h4 className="font-bold text-secondary mb-1">Reliability</h4>
                  <p className="text-sm text-text-muted">Built to last</p>
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
              Client Success
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
              Frequently Asked Questions
            </h2>
            <p className="text-text-muted">Everything you need to know about working with us.</p>
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
              Let's build something extraordinary together.
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Ready to transform your vision into reality? Send us a message and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="glass-card p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                  <input type="text" className="w-full h-12 px-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <input type="email" className="w-full h-12 px-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Project Description</label>
                <textarea className="w-full h-32 p-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none text-foreground" placeholder="Tell us about your project..."></textarea>
              </div>
              <Button variant="primary" size="lg" glow className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-foreground/10 text-center text-sm text-text-muted bg-background">
        <p>© {new Date().getFullYear()} Codex Software. All rights reserved.</p>
      </footer>
    </div>
  );
}
