import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, Mountain, User, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Explore", href: "/" },
  { label: "Ride Booking", href: "/book-ride" },
  { label: "Drone Delivery", href: "/drone-delivery" },
  { label: "My Bookings", href: "/my-bookings" },
];

export default function Header({ overlay = false }: { overlay?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`w-full z-50 ${
        overlay
          ? "absolute top-0 left-0 bg-gradient-to-b from-black/50 to-transparent"
          : "sticky top-0 bg-brand-blue shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <span className="font-montserrat font-black text-white text-xl tracking-widest uppercase">
            PITTHU
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-white/85 hover:text-white font-montserrat text-sm uppercase tracking-wider transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/book-ride">
            <Button
              className="hidden md:flex bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider text-xs rounded-full px-5"
              data-ocid="nav.primary_button"
            >
              Book Now
            </Button>
          </Link>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <User className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-brand-blue-dark px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block py-2 text-white/85 hover:text-white font-montserrat text-sm uppercase tracking-wider"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/book-ride" onClick={() => setMobileOpen(false)}>
            <Button className="mt-2 w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase text-xs rounded-full">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
