import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Package, ShieldCheck, Sparkles, User } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Safety", path: "/safety-hub", icon: ShieldCheck },
  { label: "Drone", path: "/drone-delivery", icon: Package },
  { label: "AI", path: "/ai-concierge", icon: Sparkles },
  { label: "Profile", path: "/profile", icon: User },
];

export default function BottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive =
            path === "/" ? currentPath === "/" : currentPath.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              data-ocid={`nav.${label.toLowerCase()}.link`}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 transition-colors",
                isActive ? "text-brand-orange" : "text-muted-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-montserrat uppercase text-[9px] tracking-wider">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
