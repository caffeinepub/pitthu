import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export default function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  return (
    <footer className={cn("border-t border-border bg-card py-8", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-montserrat font-black text-foreground uppercase tracking-wider text-sm">
              PITTHU
            </span>
            <span className="text-muted-foreground text-xs">
              — Travel Across Uttarakhand
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link
              to="/book-ride"
              className="hover:text-foreground transition-colors"
            >
              Book a Ride
            </Link>
            <Link
              to="/drone-delivery"
              className="hover:text-foreground transition-colors"
            >
              Drone Delivery
            </Link>
            <Link
              to="/about"
              className="hover:text-foreground transition-colors font-medium text-primary"
            >
              About Us
            </Link>
            <Link
              to="/safety-hub"
              className="hover:text-foreground transition-colors"
            >
              Safety Hub
            </Link>
            <Link
              to="/ai-concierge"
              className="hover:text-foreground transition-colors"
            >
              AI Concierge
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
        <div className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
          © {year}. Built with ❤️ using{" "}
          <a
            href={utm}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
