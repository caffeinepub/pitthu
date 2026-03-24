import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        {/* Mountain SVG */}
        <svg
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-sm mx-auto mb-8"
          aria-label="Mountain silhouette"
          role="img"
        >
          {/* Sky */}
          <rect
            width="400"
            height="200"
            fill="oklch(0.97 0.005 240)"
            className="dark:fill-[oklch(0.15_0.01_240)]"
          />
          {/* Mist */}
          <ellipse
            cx="200"
            cy="160"
            rx="200"
            ry="40"
            fill="oklch(0.92 0.01 230)"
            fillOpacity="0.5"
            className="dark:fill-[oklch(0.2_0.01_230)]"
          />
          {/* Far mountains */}
          <polygon
            points="0,160 80,60 160,160"
            fill="oklch(0.78 0.05 230)"
            fillOpacity="0.5"
          />
          <polygon
            points="120,160 220,40 320,160"
            fill="oklch(0.65 0.07 230)"
            fillOpacity="0.6"
          />
          <polygon
            points="260,160 340,80 400,160"
            fill="oklch(0.72 0.06 230)"
            fillOpacity="0.5"
          />
          {/* Near dark mountain */}
          <polygon points="40,200 150,70 260,200" fill="oklch(0.35 0.05 230)" />
          <polygon
            points="160,200 280,50 400,200"
            fill="oklch(0.28 0.04 230)"
          />
          {/* Snow cap */}
          <polygon
            points="150,70 165,100 135,100"
            fill="white"
            fillOpacity="0.9"
          />
          <polygon
            points="280,50 298,85 262,85"
            fill="white"
            fillOpacity="0.9"
          />
          {/* Fog overlay */}
          <rect
            x="0"
            y="140"
            width="400"
            height="60"
            fill="oklch(0.97 0.005 240)"
            fillOpacity="0.6"
            className="dark:fill-[oklch(0.13_0.01_240)]"
          />
        </svg>

        <h1 className="font-montserrat font-black uppercase text-4xl text-foreground mb-3">
          Lost in the Hills?
        </h1>
        <p className="text-muted-foreground text-lg mb-2">
          The page you're looking for got lost in the fog.
        </p>
        <p className="text-muted-foreground/60 text-sm mb-8">
          Even the best trekkers take a wrong turn sometimes.
        </p>
        <Link to="/">
          <Button
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-montserrat font-bold uppercase tracking-wider rounded-full px-8"
            data-ocid="notfound.primary_button"
          >
            Back to Base Camp
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
