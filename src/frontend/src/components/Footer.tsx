import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Mountain, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "pitthu")}`;

  return (
    <footer className="bg-brand-teal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="font-montserrat font-black text-xl tracking-widest uppercase">
                PITTHU
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted mountain travel partner across the divine land of
              Uttarakhand.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-montserrat font-bold uppercase tracking-wider text-sm mb-4 text-white/90">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/book-ride"
                  className="hover:text-white transition-colors"
                >
                  Ride Booking
                </Link>
              </li>
              <li>
                <Link
                  to="/drone-delivery"
                  className="hover:text-white transition-colors"
                >
                  Drone Delivery
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Trekking Packages
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Experiences
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-montserrat font-bold uppercase tracking-wider text-sm mb-4 text-white/90">
              Destinations
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Kedarnath</li>
              <li>Badrinath</li>
              <li>Valley of Flowers</li>
              <li>Rishikesh</li>
              <li>Nainital</li>
              <li>Mussoorie</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-bold uppercase tracking-wider text-sm mb-4 text-white/90">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" /> +91 1234 567890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" /> hello@pitthu.in
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> 12 Mall
                Road, Dehradun, Uttarakhand
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-white/50">
          <span>© {year} PITTHU. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
