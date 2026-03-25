import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MapPin, Shield, Star, Zap } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Every ride comes with verified drivers, SOS alerts, live trip sharing, and AI road-health monitoring.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Heart,
    title: "Local Pride",
    desc: "Built by Uttarakhandis, for Uttarakhandis. We deeply respect the culture, language, and landscape of Devbhoomi.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Star,
    title: "Reliability",
    desc: "On-time pickups, transparent pricing, and zero hidden charges. Your trust is our highest metric.",
    color: "text-brand-orange",
    bg: "bg-brand-orange/10",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Drone deliveries, AI concierge, 3D seat selection, and offline-first architecture for mountain dead zones.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const stats = [
  { value: "50+", label: "Destinations" },
  { value: "12K+", label: "Happy Riders" },
  { value: "2K+", label: "Drone Deliveries" },
  { value: "4.9\u2605", label: "App Rating" },
  { value: "5+", label: "Vehicle Types" },
  { value: "24/7", label: "Support" },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <img
          src="/assets/generated/about-us-team.dim_800x500.jpg"
          alt="PITTHU Team in the Himalayas"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-brand-orange font-montserrat font-bold uppercase tracking-[0.25em] text-sm mb-3">
              Our Story
            </p>
            <h1 className="font-montserrat font-black uppercase text-white text-4xl md:text-6xl leading-tight mb-4">
              About <span className="text-brand-orange">PITTHU</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Born in the mountains. Built for the mountains. PITTHU connects
              every corner of Uttarakhand with safe, reliable, and affordable
              travel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-montserrat font-bold uppercase tracking-widest text-xs mb-3">
                Our Mission
              </p>
              <h2 className="font-montserrat font-black text-foreground text-3xl md:text-4xl mb-6">
                Connecting the Hills of Uttarakhand
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                PITTHU was born out of a simple need &mdash; reliable, safe, and
                affordable travel across the rugged and beautiful terrain of
                Uttarakhand. From bustling Dehradun to remote Milam Glacier, we
                make every journey possible.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                Our mission is to blend cutting-edge technology with a deep
                understanding of the mountains &mdash; offering ride booking,
                drone delivery, and AI-powered travel planning for locals and
                tourists alike.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Headquarters: Dehradun, Uttarakhand, India</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-muted rounded-2xl p-5 text-center border border-border"
                >
                  <div className="font-montserrat font-black text-2xl text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="py-16 bg-muted border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-montserrat font-bold uppercase tracking-[0.25em] text-xs mb-2">
              Leadership
            </p>
            <h2 className="font-montserrat font-extrabold uppercase text-3xl md:text-4xl text-foreground">
              Meet the Founder
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-card rounded-3xl p-8 shadow-card border border-border text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary/20 shadow-card">
                <img
                  src="/assets/generated/owner-luv-maithani.dim_400x400.jpg"
                  alt="Luv Maithani"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-montserrat font-black text-foreground text-2xl mb-1">
                Luv Maithani
              </h3>
              <p className="text-primary font-semibold text-sm mb-2">
                Founder &amp; CEO
              </p>
              <p className="text-muted-foreground text-xs mb-6 uppercase tracking-wider">
                PITTHU Travel Technologies
              </p>
              <blockquote className="text-muted-foreground text-sm leading-relaxed italic border-l-4 border-primary/30 pl-4 text-left">
                &ldquo;I grew up watching the mountains be inaccessible to so
                many. PITTHU is my way of making Uttarakhand reachable for
                everyone &mdash; safely, affordably, and with pride. Every
                feature we build is inspired by real challenges I&apos;ve seen
                people face on these roads.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-brand-orange fill-brand-orange"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-montserrat font-bold uppercase tracking-[0.25em] text-xs mb-2">
              What Drives Us
            </p>
            <h2 className="font-montserrat font-extrabold uppercase text-3xl md:text-4xl text-foreground">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card text-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${val.bg} flex items-center justify-center mx-auto mb-4`}
                >
                  <val.icon className={`w-6 h-6 ${val.color}`} />
                </div>
                <h3 className="font-montserrat font-black text-foreground text-lg mb-2">
                  {val.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-montserrat font-bold uppercase tracking-[0.25em] text-xs mb-2">
              Get in Touch
            </p>
            <h2 className="font-montserrat font-extrabold uppercase text-3xl text-foreground">
              Contact Us
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
            {[
              {
                label: "Email",
                value: "support@pitthu.in",
                icon: "\ud83d\udce7",
              },
              {
                label: "Phone",
                value: "+91-98765-43210",
                icon: "\ud83d\udcde",
              },
              {
                label: "Address",
                value: "Dehradun, Uttarakhand",
                icon: "\ud83d\udccd",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card rounded-2xl p-6 text-center border border-border shadow-card"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-montserrat font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="font-semibold text-foreground text-sm">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/book-ride">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full px-8 shadow-orange-glow"
                data-ocid="about.primary_button"
              >
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
