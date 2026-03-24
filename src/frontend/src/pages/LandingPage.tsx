import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Car, ChevronRight, Package, Star } from "lucide-react";
import { motion } from "motion/react";

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
    text: "PITTHU made our Char Dham yatra so smooth! The private cab was on time and the driver was very knowledgeable about the routes.",
    stars: 5,
  },
  {
    name: "Rahul Verma",
    location: "Mumbai",
    text: "The drone delivery service is a game-changer. We were trekking near Roopkund and they delivered medicines to our camp within hours!",
    stars: 5,
  },
  {
    name: "Meera Patel",
    location: "Ahmedabad",
    text: "Booked a shared cab from Rishikesh to Badrinath. Great experience, very affordable and the 3D seat selection feature is so cool!",
    stars: 4,
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

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <img
          src="/assets/generated/hero-uttarakhand.dim_1400x700.jpg"
          alt="Uttarakhand Himalayas"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full px-8"
                  data-ocid="hero.primary_button"
                >
                  Book a Ride
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/drone-delivery">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/60 text-white hover:bg-white/10 font-montserrat font-bold uppercase tracking-wider rounded-full px-8"
                  data-ocid="hero.secondary_button"
                >
                  Drone Delivery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-12 right-8 hidden lg:flex gap-6"
        >
          {[
            { label: "Destinations", value: "50+" },
            { label: "Happy Riders", value: "12K+" },
            { label: "Drone Deliveries", value: "2K+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center text-white border border-white/20"
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
      </section>

      {/* Booking Widget + Drone Promo */}
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
                  >
                    Learn More <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destinations */}
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

      {/* Testimonials */}
      <section className="py-16 bg-background">
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
                  {Array.from({ length: t.stars }, (_, starIdx) => (
                    <Star
                      key={`star-${t.name}-${starIdx}`}
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

      {/* CTA Banner */}
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
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full px-8"
                  data-ocid="cta.primary_button"
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
                >
                  Drone Delivery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
