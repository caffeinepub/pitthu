import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Car,
  ChevronRight,
  Gift,
  MapPin,
  Package,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useHaptic } from "../hooks/useHaptic";

const destinations = [
  {
    name: "Valley of Flowers",
    subtitle: "UNESCO World Heritage",
    img: "/assets/generated/dest-valley-of-flowers.dim_400x300.jpg",
  },
  {
    name: "Kedarnath",
    subtitle: "Sacred Himalayan Shrine",
    img: "/assets/generated/dest-kedarnath.dim_400x300.jpg",
  },
  {
    name: "Rishikesh",
    subtitle: "Yoga & Adventure Capital",
    img: "/assets/generated/dest-rishikesh.dim_400x300.jpg",
  },
  {
    name: "Badrinath",
    subtitle: "Char Dham Pilgrimage",
    img: "/assets/generated/dest-badrinath.dim_400x300.jpg",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    text: "PITTHU made our Char Dham yatra so smooth! The private cab was on time and the driver was very knowledgeable.",
    stars: 5,
  },
  {
    name: "Rahul Verma",
    location: "Mumbai",
    text: "The drone delivery service is a game-changer. We were trekking near Roopkund and they delivered medicines within hours!",
    stars: 5,
  },
  {
    name: "Meera Patel",
    location: "Ahmedabad",
    text: "Booked a shared cab from Rishikesh to Badrinath. Great experience and the 3D seat selection is so cool!",
    stars: 4,
  },
];

const blogs = [
  {
    title: "Top 10 Treks in Uttarakhand",
    excerpt:
      "From Roopkund to Valley of Flowers, discover the most breathtaking trekking routes in Devbhoomi.",
    tag: "Trekking",
    icon: "🏔️",
  },
  {
    title: "Best Time to Visit Kedarnath",
    excerpt:
      "Plan your Kedarnath pilgrimage right. We guide you through weather patterns, crowd season, and ideal months.",
    tag: "Pilgrimage",
    icon: "🛕",
  },
  {
    title: "Nainital: A Complete Travel Guide",
    excerpt:
      "The Lake District of India. Hotels, boating, Mall Road shopping, and everything you need for a perfect trip.",
    tag: "Travel Guide",
    icon: "🌊",
  },
];

const uttarakhandLocations = [
  "Dehradun",
  "Haridwar",
  "Rishikesh",
  "Mussoorie",
  "Nainital",
  "Almora",
  "Ranikhet",
  "Tehri",
  "Uttarkashi",
];

const CARS = [
  {
    id: "hatchback",
    emoji: "🚗",
    label: "Hatchback",
    price: "₹800/hr",
    eta: "~8 min",
  },
  {
    id: "sedan",
    emoji: "🚙",
    label: "Sedan",
    price: "₹1200/hr",
    eta: "~6 min",
  },
  { id: "suv", emoji: "🛻", label: "SUV", price: "₹1800/hr", eta: "~10 min" },
  {
    id: "luxury",
    emoji: "🏎",
    label: "Luxury",
    price: "₹3500/hr",
    eta: "~15 min",
  },
  {
    id: "electric",
    emoji: "⚡",
    label: "Electric",
    price: "₹1500/hr",
    eta: "~12 min",
  },
];

const TWO_WHEELERS = [
  {
    id: "scooty",
    emoji: "🛵",
    label: "Scooty",
    price: "₹300/hr",
    eta: "~4 min",
  },
  { id: "bike", emoji: "🏍", label: "Bike", price: "₹450/hr", eta: "~3 min" },
  {
    id: "ev-scooter",
    emoji: "⚡🛵",
    label: "EV Scooter",
    price: "₹350/hr",
    eta: "~5 min",
  },
];

export default function LandingPage() {
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftName, setGiftName] = useState("");
  const [giftPhone, setGiftPhone] = useState("");
  const [giftAmount, setGiftAmount] = useState("500");
  const [giftCode, setGiftCode] = useState("");
  const [heroPickup, setHeroPickup] = useState("");
  const [heroDrop, setHeroDrop] = useState("");
  const [vehicleTab, setVehicleTab] = useState<"cars" | "two-wheelers">("cars");
  const [selectedVehicle, setSelectedVehicle] = useState("sedan");
  const { tap, success } = useHaptic();

  const handleGiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftName || !giftPhone) {
      toast.error("Please fill all fields");
      return;
    }
    const code = `GIFT-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setGiftCode(code);
    success();
    toast.success(`Gift voucher ${code} created!`);
  };

  const vehicleList = vehicleTab === "cars" ? CARS : TWO_WHEELERS;

  return (
    <div className="bg-background">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src="/assets/generated/hero-uttarakhand.dim_1400x700.jpg"
          alt="Uttarakhand Himalayas"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 pb-44">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-brand-orange font-montserrat font-bold uppercase tracking-[0.25em] text-sm mb-4">
              Uttarakhand Awaits You
            </p>
            <h1 className="font-montserrat font-black text-white text-5xl md:text-7xl uppercase leading-tight mb-6">
              Travel The
              <br />
              <span className="text-brand-orange">Himalayas</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
              Book private cars, shared cabs, and buses across Uttarakhand.
              Revolutionary drone delivery to the most remote mountain
              locations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book-ride">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full px-8 shadow-orange-glow"
                  data-ocid="hero.primary_button"
                  onClick={() => tap()}
                >
                  Book a Ride <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/drone-delivery">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/60 text-white hover:bg-white/10 font-montserrat font-bold uppercase tracking-wider rounded-full px-8"
                  data-ocid="hero.secondary_button"
                  onClick={() => tap()}
                >
                  Drone Delivery
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-400/60 text-yellow-300 hover:bg-yellow-400/10 font-montserrat font-bold uppercase tracking-wider rounded-full px-8"
                onClick={() => {
                  tap();
                  setGiftOpen(true);
                }}
                data-ocid="hero.button"
              >
                <Gift className="mr-2 w-4 h-4" /> Gift a Ride
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats chips */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-44 right-8 hidden lg:flex gap-6"
        >
          {[
            { label: "Destinations", value: "50+" },
            { label: "Happy Riders", value: "12K+" },
            { label: "Drone Deliveries", value: "2K+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-4 text-center text-white"
            >
              <div className="font-montserrat font-black text-2xl">
                {stat.value}
              </div>
              <div className="text-xs text-white/70 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Glassmorphism Booking Bar — absolute bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass-dark rounded-2xl p-4 max-w-2xl mx-auto shadow-glass"
          >
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <div className="flex items-center gap-2 flex-1 bg-white/10 rounded-xl px-3 py-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <input
                  type="text"
                  className="bg-transparent text-white placeholder-white/50 text-sm flex-1 outline-none"
                  placeholder="📍 Pickup location..."
                  value={heroPickup}
                  onChange={(e) => setHeroPickup(e.target.value)}
                  data-ocid="hero.input"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 bg-white/10 rounded-xl px-3 py-2.5">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                <input
                  type="text"
                  className="bg-transparent text-white placeholder-white/50 text-sm flex-1 outline-none"
                  placeholder="📍 Drop location..."
                  value={heroDrop}
                  onChange={(e) => setHeroDrop(e.target.value)}
                  data-ocid="hero.input"
                />
              </div>
            </div>
            <Link to="/book-ride">
              <button
                type="button"
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider text-sm rounded-xl py-2.5 transition-all flex items-center justify-center gap-2 shadow-orange-glow"
                data-ocid="hero.submit_button"
                onClick={() => tap()}
              >
                🚗 Book a Ride <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== WILDLIFE ALERT TICKER (sibling) ===== */}
      <div className="bg-amber-500/95 text-amber-950 py-2.5 overflow-hidden border-b border-amber-600/30">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 pl-4 flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="font-montserrat font-black text-xs uppercase tracking-wider">
              Live Wildlife
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <motion.div
              animate={{ x: ["100%", "-200%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 22,
                ease: "linear",
              }}
              className="whitespace-nowrap text-xs font-medium"
            >
              🐆 Leopard spotted near Corbett Buffer Zone (2h
              ago)&nbsp;&nbsp;·&nbsp;&nbsp;🐻 Bear sighting on Chopta-Tungnath
              trail (4h ago)&nbsp;&nbsp;·&nbsp;&nbsp;🦅 Musk Deer crossing at
              Kedarnath (1h ago)&nbsp;&nbsp;·&nbsp;&nbsp;🐆 Snow Leopard near
              Milam Glacier (6h ago)&nbsp;&nbsp;·&nbsp;&nbsp;🐘 Wild Elephant at
              Rajaji NP entry (30min ago)
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== WEATHER ALERTS TICKER (sibling) ===== */}
      <div className="bg-blue-700/95 text-white py-2.5 overflow-hidden border-b border-blue-600/30">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 pl-4 flex items-center gap-2">
            <span className="text-lg">🌦️</span>
            <span className="font-montserrat font-black text-xs uppercase tracking-wider">
              Weather
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <motion.div
              animate={{ x: ["100%", "-200%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 26,
                ease: "linear",
              }}
              className="whitespace-nowrap text-xs font-medium text-white/90"
            >
              🌧️ Heavy rain warning on Rishikesh→Badrinath
              corridor&nbsp;&nbsp;·&nbsp;&nbsp;⚠️ Landslide risk at Kedarnath
              approach — drive with caution&nbsp;&nbsp;·&nbsp;&nbsp;🌨️ Snow alert
              above 2500m near Chopta — chains
              required&nbsp;&nbsp;·&nbsp;&nbsp;🌫️ Dense fog on Mussoorie–Dehradun
              highway till 9AM&nbsp;&nbsp;·&nbsp;&nbsp;⛈️ Thunderstorm advisory
              for Nainital district
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== AI ROAD HEALTH STRIP (sibling) ===== */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-montserrat font-extrabold uppercase text-sm text-foreground">
              🛡️ AI Road Health Scores
            </h3>
            <Link to="/safety-hub">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary text-xs font-montserrat font-bold uppercase"
                data-ocid="safety_strip.link"
              >
                View All →
              </Button>
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              {
                route: "Rishikesh→Badrinath",
                score: 78,
                status: "Caution",
                color: "amber",
              },
              {
                route: "Nainital→Almora",
                score: 91,
                status: "Clear",
                color: "emerald",
              },
              {
                route: "Kedarnath Route",
                score: 42,
                status: "Danger",
                color: "red",
              },
              {
                route: "Mussoorie→Tehri",
                score: 85,
                status: "Clear",
                color: "emerald",
              },
            ].map((r) => (
              <div
                key={r.route}
                className="flex-shrink-0 bg-card rounded-xl border border-border p-3 min-w-[160px] shadow-card"
              >
                <p className="font-montserrat font-bold text-xs text-foreground mb-1">
                  {r.route}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        r.color === "emerald"
                          ? "bg-emerald-500"
                          : r.color === "amber"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                  <span className="font-black text-xs text-foreground">
                    {r.score}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    r.color === "emerald"
                      ? "bg-emerald-100 text-emerald-700"
                      : r.color === "amber"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VEHICLE SELECTION CAROUSEL (NEW) ===== */}
      <section className="py-16 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-primary font-montserrat font-bold uppercase tracking-[0.25em] text-xs mb-2">
              Choose Your Ride
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="font-montserrat font-extrabold uppercase text-3xl text-foreground">
                Select a Vehicle
              </h2>
              {/* Tabs */}
              <div className="flex gap-2 bg-card rounded-full p-1 border border-border shadow-card">
                {(["cars", "two-wheelers"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      tap();
                      setVehicleTab(tab);
                      setSelectedVehicle(tab === "cars" ? "sedan" : "scooty");
                    }}
                    className={`px-5 py-2 rounded-full text-xs font-montserrat font-bold uppercase transition-all ${
                      vehicleTab === tab
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-ocid={`vehicles.${tab}.tab`}
                  >
                    {tab === "cars" ? "🚗 Cars" : "🛵 Two Wheelers"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vehicle Cards Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={vehicleTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 xl:grid-cols-5 md:overflow-visible"
            >
              {vehicleList.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => {
                    tap();
                    setSelectedVehicle(v.id);
                  }}
                  className={`flex-shrink-0 w-36 md:w-auto cursor-pointer rounded-2xl border-2 p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-card ${
                    selectedVehicle === v.id
                      ? "border-primary bg-primary/8 shadow-glass"
                      : "border-border bg-card"
                  }`}
                  data-ocid={`vehicles.item.${i + 1}`}
                >
                  <div className="text-5xl mb-3 select-none">{v.emoji}</div>
                  <p className="font-montserrat font-black text-sm text-foreground uppercase tracking-wide">
                    {v.label}
                  </p>
                  <p className="font-jakarta font-semibold text-primary text-sm mt-1">
                    {v.price}
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    {v.eta}
                  </span>
                  {selectedVehicle === v.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 w-5 h-5 rounded-full bg-primary mx-auto flex items-center justify-center"
                    >
                      <span className="text-white text-[10px] font-black">
                        ✓
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center">
            <Link to="/book-ride">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full px-10 shadow-orange-glow"
                data-ocid="vehicles.primary_button"
                onClick={() => tap()}
              >
                Book Selected Vehicle <ChevronRight className="ml-1 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BOOKING WIDGET + DRONE PROMO ===== */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-card p-8 border border-border"
            >
              <h2 className="font-montserrat font-extrabold uppercase text-2xl text-foreground mb-2">
                Book Your Mountain Journey
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                From serene valleys to sacred shrines
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    icon: Car,
                    title: "Private Car",
                    desc: "Exclusive rides at your pace",
                  },
                  {
                    icon: Car,
                    title: "Shared Cab",
                    desc: "Split costs, meet travelers",
                  },
                  {
                    icon: Package,
                    title: "Bus",
                    desc: "Budget-friendly routes",
                  },
                  {
                    icon: Package,
                    title: "Drone Delivery",
                    desc: "Remote location delivery",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-montserrat font-bold text-sm text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/book-ride">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-bold uppercase tracking-wider rounded-full"
                  data-ocid="booking_widget.primary_button"
                  onClick={() => tap()}
                >
                  Start Booking <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden min-h-[300px]"
            >
              <img
                src="/assets/generated/drone-delivery-promo.dim_600x400.jpg"
                alt="Drone Delivery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-brand-orange font-montserrat font-bold uppercase tracking-[0.2em] text-xs mb-2">
                  New Service
                </p>
                <h3 className="font-montserrat font-black text-white text-2xl uppercase mb-3">
                  Drone Delivery to Remote Peaks
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Medicine, supplies, and essentials delivered by drone to any
                  location in Uttarakhand.
                </p>
                <Link to="/drone-delivery">
                  <Button
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase text-xs tracking-wider rounded-full"
                    data-ocid="drone_promo.primary_button"
                    onClick={() => tap()}
                  >
                    Learn More <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-montserrat font-bold uppercase tracking-[0.25em] text-xs mb-2">
              Explore
            </p>
            <h2 className="font-montserrat font-extrabold uppercase text-3xl md:text-4xl text-foreground">
              Top Destinations
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card"
                data-ocid={`destinations.item.${i + 1}`}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-montserrat font-black text-white text-lg uppercase">
                    {dest.name}
                  </h3>
                  <p className="text-white/70 text-xs">{dest.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Also serving: {uttarakhandLocations.slice(0, 6).join(" · ")} and
              more
            </p>
          </div>
        </div>
      </section>

      {/* ===== TRAVEL BLOGS ===== */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-montserrat font-bold uppercase tracking-[0.25em] text-xs mb-2">
              Stories
            </p>
            <h2 className="font-montserrat font-extrabold uppercase text-3xl text-foreground">
              Explore Uttarakhand
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`blogs.item.${i + 1}`}
              >
                <Card className="shadow-card hover:shadow-hero transition-shadow cursor-pointer border border-border h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{blog.icon}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-montserrat font-bold uppercase tracking-wide">
                        {blog.tag}
                      </span>
                      <Tag className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <h3 className="font-montserrat font-black text-foreground text-lg mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {blog.excerpt}
                    </p>
                    <button
                      type="button"
                      className="mt-4 text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-montserrat font-bold uppercase tracking-[0.25em] text-xs mb-2">
              Testimonials
            </p>
            <h2 className="font-montserrat font-extrabold uppercase text-3xl text-foreground">
              What Travelers Say
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((__, si) => (
                    <Star
                      key={`star-${t.name}-${si}`}
                      className="w-4 h-4 text-brand-orange fill-brand-orange"
                    />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div>
                  <p className="font-montserrat font-bold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI CONCIERGE CTA (SIBLING — not nested in testimonials) ===== */}
      <section className="py-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-brand-blue-dark">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-purple-300" />
            </div>
            <p className="text-purple-300 font-montserrat font-bold uppercase tracking-[0.25em] text-xs mb-2">
              AI POWERED
            </p>
            <h2 className="font-montserrat font-black uppercase text-white text-3xl md:text-4xl mb-4">
              Plan by Vibe,
              <br />
              Not Just Destination
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Tell our AI your mood — misty retreat, adventure, pilgrimage, or
              food trail — and get a personalised 3-day Uttarakhand itinerary in
              seconds.
            </p>
            <Link to="/ai-concierge">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-montserrat font-bold uppercase tracking-wider rounded-full px-8"
                data-ocid="ai_cta.primary_button"
              >
                <Sparkles className="mr-2 w-4 h-4" /> Chat with AI Concierge
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 bg-brand-blue">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-montserrat font-black uppercase text-white text-3xl md:text-5xl mb-4">
              Ready to Explore Devbhoomi?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Book your journey across the land of gods. Safe, comfortable, and
              unforgettable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/book-ride">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full px-8 shadow-orange-glow"
                  data-ocid="cta.primary_button"
                  onClick={() => tap()}
                >
                  Book a Ride Now
                </Button>
              </Link>
              <Link to="/drone-delivery">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/60 text-white hover:bg-white/10 font-montserrat font-bold uppercase tracking-wider rounded-full px-8"
                  data-ocid="cta.secondary_button"
                  onClick={() => tap()}
                >
                  Drone Delivery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== GIFT A RIDE MODAL ===== */}
      <Dialog open={giftOpen} onOpenChange={setGiftOpen}>
        <DialogContent className="sm:max-w-sm" data-ocid="gift.dialog">
          <DialogHeader>
            <DialogTitle className="font-montserrat uppercase flex items-center gap-2">
              <Gift className="w-5 h-5 text-brand-orange" /> Gift a Ride
            </DialogTitle>
          </DialogHeader>
          {giftCode ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                <Gift className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-muted-foreground text-sm">
                Gift voucher created for <strong>{giftName}</strong>!
              </p>
              <div className="bg-muted rounded-xl p-4">
                <p className="font-montserrat font-black text-2xl text-foreground tracking-widest">
                  {giftCode}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Share this code with your friend
                </p>
              </div>
              <Button
                className="w-full bg-brand-orange text-white font-montserrat font-bold uppercase rounded-full"
                onClick={() => {
                  setGiftOpen(false);
                  setGiftCode("");
                  setGiftName("");
                  setGiftPhone("");
                }}
                data-ocid="gift.close_button"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleGiftSubmit} className="space-y-4 py-2">
              <div className="space-y-1">
                <Label>Recipient Name</Label>
                <Input
                  placeholder="e.g., Rahul Sharma"
                  value={giftName}
                  onChange={(e) => setGiftName(e.target.value)}
                  data-ocid="gift.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+91-XXXXXXXXXX"
                  value={giftPhone}
                  onChange={(e) => setGiftPhone(e.target.value)}
                  data-ocid="gift.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Amount</Label>
                <select
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                  value={giftAmount}
                  onChange={(e) => setGiftAmount(e.target.value)}
                  data-ocid="gift.select"
                >
                  {["500", "1000", "1500", "2000"].map((a) => (
                    <option key={a} value={a}>
                      ₹{a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 font-montserrat font-bold uppercase rounded-full"
                  onClick={() => setGiftOpen(false)}
                  data-ocid="gift.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-brand-orange text-white font-montserrat font-bold uppercase rounded-full"
                  onClick={() => tap()}
                  data-ocid="gift.submit_button"
                >
                  Create Gift
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
