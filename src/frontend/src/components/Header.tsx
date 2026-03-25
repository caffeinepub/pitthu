import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Mountain, Share2, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import NotificationCenter from "./NotificationCenter";

const navLinks = [
  { labelKey: "home" as const, href: "/" },
  { label: "Ride Booking", href: "/book-ride" },
  { label: "Drone Delivery", href: "/drone-delivery" },
  { label: "My Bookings", href: "/my-bookings" },
];

async function handleShare() {
  const shareData = {
    title: "PITTHU - Travel Across Uttarakhand",
    text: "Book cars, buses & drone delivery across Uttarakhand. Your mountain travel partner!",
    url: window.location.origin,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // user cancelled
    }
  } else {
    await navigator.clipboard.writeText(window.location.origin);
    toast.success("Link copied to clipboard!");
  }
}

export default function Header({ overlay = false }: { overlay?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

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
              {link.label || t(link.labelKey!)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="hidden md:flex items-center text-white/80 hover:text-white font-montserrat text-xs uppercase tracking-wider transition-colors px-2"
            data-ocid="header.toggle"
            aria-label="Toggle language"
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            data-ocid="header.toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Share button */}
          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Share PITTHU"
            data-ocid="header.share_button"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <NotificationCenter />

          <Link to="/book-ride">
            <Button
              className="hidden md:flex bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider text-xs rounded-full px-5"
              data-ocid="nav.primary_button"
            >
              {t("bookNow")}
            </Button>
          </Link>
          <Link to="/profile">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Profile"
            >
              <User className="w-4 h-4" />
            </button>
          </Link>
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
              {link.label || t(link.labelKey!)}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-3">
            <button
              type="button"
              onClick={toggleLang}
              className="text-white/80 font-montserrat text-xs uppercase tracking-wider"
              data-ocid="header.toggle"
            >
              {lang === "en" ? "हिं" : "EN"}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="text-white/80 hover:text-white"
              data-ocid="header.toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
          <Button
            className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white font-montserrat font-bold uppercase text-xs rounded-full"
            onClick={() => {
              setMobileOpen(false);
              handleShare();
            }}
            data-ocid="header.share_button"
          >
            <Share2 className="w-4 h-4 mr-2" /> Share PITTHU
          </Button>
          <Link to="/book-ride" onClick={() => setMobileOpen(false)}>
            <Button className="mt-2 w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase text-xs rounded-full">
              {t("bookNow")}
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
