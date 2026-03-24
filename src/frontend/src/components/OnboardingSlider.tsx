import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useHaptic } from "../hooks/useHaptic";

const slides = [
  {
    id: 1,
    title: "Book Cars",
    subtitle:
      "Private & shared rides across the Himalayas. Door-to-door comfort for every mountain journey.",
    color: "from-orange-600 to-orange-400",
    bgColor: "bg-orange-500",
    icon: (
      <svg
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-32"
        role="img"
        aria-label="Vehicle illustration"
      >
        <rect
          x="10"
          y="30"
          width="100"
          height="35"
          rx="8"
          fill="white"
          fillOpacity="0.3"
        />
        <rect
          x="25"
          y="18"
          width="55"
          height="25"
          rx="6"
          fill="white"
          fillOpacity="0.4"
        />
        <circle cx="30" cy="68" r="10" fill="white" fillOpacity="0.8" />
        <circle cx="90" cy="68" r="10" fill="white" fillOpacity="0.8" />
        <rect
          x="15"
          y="40"
          width="20"
          height="3"
          rx="1.5"
          fill="white"
          fillOpacity="0.6"
        />
        <rect
          x="85"
          y="40"
          width="20"
          height="3"
          rx="1.5"
          fill="white"
          fillOpacity="0.6"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Book Buses",
    subtitle:
      "Budget-friendly group travel with 3D seat selection. Pick your perfect window or aisle seat.",
    color: "from-emerald-600 to-emerald-400",
    bgColor: "bg-emerald-500",
    icon: (
      <svg
        viewBox="0 0 140 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-32"
        role="img"
        aria-label="Bus illustration"
      >
        <rect
          x="5"
          y="15"
          width="130"
          height="55"
          rx="8"
          fill="white"
          fillOpacity="0.3"
        />
        <rect
          x="5"
          y="15"
          width="130"
          height="22"
          rx="8"
          fill="white"
          fillOpacity="0.2"
        />
        <rect
          x="15"
          y="25"
          width="18"
          height="10"
          rx="3"
          fill="white"
          fillOpacity="0.7"
        />
        <rect
          x="40"
          y="25"
          width="18"
          height="10"
          rx="3"
          fill="white"
          fillOpacity="0.7"
        />
        <rect
          x="65"
          y="25"
          width="18"
          height="10"
          rx="3"
          fill="white"
          fillOpacity="0.7"
        />
        <rect
          x="90"
          y="25"
          width="18"
          height="10"
          rx="3"
          fill="white"
          fillOpacity="0.7"
        />
        <circle cx="30" cy="73" r="9" fill="white" fillOpacity="0.8" />
        <circle cx="110" cy="73" r="9" fill="white" fillOpacity="0.8" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Drone Delivery",
    subtitle:
      "Revolutionary deliveries to remote Himalayan locations. Medicines, supplies & more — anywhere.",
    color: "from-blue-600 to-blue-400",
    bgColor: "bg-blue-500",
    icon: (
      <svg
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-32"
        role="img"
        aria-label="Vehicle illustration"
      >
        <rect
          x="45"
          y="30"
          width="30"
          height="20"
          rx="4"
          fill="white"
          fillOpacity="0.4"
        />
        <circle
          cx="25"
          cy="28"
          r="12"
          fill="white"
          fillOpacity="0.2"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <circle
          cx="95"
          cy="28"
          r="12"
          fill="white"
          fillOpacity="0.2"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <circle
          cx="25"
          cy="52"
          r="12"
          fill="white"
          fillOpacity="0.2"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <circle
          cx="95"
          cy="52"
          r="12"
          fill="white"
          fillOpacity="0.2"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <line
          x1="25"
          y1="28"
          x2="45"
          y2="38"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <line
          x1="95"
          y1="28"
          x2="75"
          y2="38"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <line
          x1="25"
          y1="52"
          x2="45"
          y2="42"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <line
          x1="95"
          y1="52"
          x2="75"
          y2="42"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <rect
          x="52"
          y="50"
          width="16"
          height="20"
          rx="3"
          fill="white"
          fillOpacity="0.5"
        />
      </svg>
    ),
  },
];

interface Props {
  onComplete: () => void;
}

export default function OnboardingSlider({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();
  const { tap, success } = useHaptic();

  const handleNext = () => {
    tap();
    if (current < slides.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      success();
      onComplete();
    }
  };

  const handleSkip = () => {
    tap();
    onComplete();
  };

  const slide = slides[current];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.color} flex flex-col items-center justify-center px-8 text-white`}
        >
          {/* Skip */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 text-white/70 hover:text-white font-montserrat text-sm uppercase tracking-wider"
            data-ocid="onboarding.cancel_button"
          >
            {t("skip")}
          </button>

          {/* Illustration */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-10"
          >
            {slide.icon}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-center max-w-sm"
          >
            <h1 className="font-montserrat font-black uppercase text-4xl mb-4">
              {slide.title}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              {slide.subtitle}
            </p>
          </motion.div>

          {/* Dots */}
          <div className="flex gap-2 mt-10">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  tap();
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 w-full max-w-xs"
          >
            <Button
              onClick={handleNext}
              className="w-full bg-white text-gray-900 hover:bg-white/90 font-montserrat font-bold uppercase tracking-wider rounded-full py-3 text-base"
              data-ocid="onboarding.primary_button"
            >
              {current === slides.length - 1 ? t("getStarted") : t("next")}
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
