import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSearch } from "@tanstack/react-router";
import {
  Car,
  MessageCircle,
  Phone,
  Send,
  Share2,
  Shield,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import GeminiRouteHappenings from "../components/GeminiRouteHappenings";
import { useHaptic } from "../hooks/useHaptic";
import { getAllBookings } from "../lib/bookingStorage";

interface ChatMessage {
  id: number;
  sender: "driver" | "user";
  text: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  { id: 1, sender: "driver", text: "Hi, I'm on my way! 👋", time: "10:15 AM" },
  {
    id: 2,
    sender: "driver",
    text: "I'll be there in 10 minutes.",
    time: "10:16 AM",
  },
  {
    id: 3,
    sender: "driver",
    text: "I've arrived at the pickup point.",
    time: "10:24 AM",
  },
];

// Bezier control points for route curve
const P0 = { x: 50, y: 160 };
const P1 = { x: 150, y: 40 };
const P2 = { x: 250, y: 180 };
const P3 = { x: 350, y: 60 };

function bezier(t: number) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return {
    x:
      mt2 * mt * P0.x + 3 * mt2 * t * P1.x + 3 * mt * t2 * P2.x + t2 * t * P3.x,
    y:
      mt2 * mt * P0.y + 3 * mt2 * t * P1.y + 3 * mt * t2 * P2.y + t2 * t * P3.y,
  };
}

function partialBezierPath(tEnd: number, steps = 40): string {
  if (tEnd <= 0) return `M ${P0.x} ${P0.y}`;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * tEnd;
    const p = bezier(t);
    pts.push(`${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const STARS = [
  { cx: 30, cy: 15 },
  { cx: 80, cy: 8 },
  { cx: 130, cy: 20 },
  { cx: 200, cy: 5 },
  { cx: 260, cy: 18 },
  { cx: 310, cy: 10 },
  { cx: 360, cy: 22 },
  { cx: 390, cy: 7 },
  { cx: 55, cy: 30 },
  { cx: 170, cy: 12 },
];

interface AnimatedRouteMapProps {
  progress: number;
  from: string;
  to: string;
  eta: number;
}

function AnimatedRouteMap({ progress, from, to, eta }: AnimatedRouteMapProps) {
  const t = progress / 100;
  const carPos = bezier(t);
  const fullPath = "M 50 160 C 150 40 250 180 350 60";
  const donePath = partialBezierPath(t);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950">
      <svg
        viewBox="0 0 400 220"
        width="100%"
        className="block"
        role="img"
        aria-label="Animated route map showing driver position"
      >
        <title>Animated route map showing driver position</title>
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1a2e" />
            <stop offset="100%" stopColor="#0f2240" />
          </linearGradient>
          <linearGradient id="routeDone" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="400" height="220" fill="url(#skyGrad)" />

        {STARS.map((star, idx) => (
          <circle
            key={`star-${star.cx}-${star.cy}`}
            cx={star.cx}
            cy={star.cy}
            r="0.8"
            fill="white"
            opacity={0.4 + (idx % 3) * 0.2}
          />
        ))}

        <polygon
          points="0,220 0,170 40,130 80,155 120,100 160,140 200,115 240,135 280,90 320,125 360,105 400,130 400,220"
          fill="#0d2e1a"
          opacity="0.85"
        />
        <polygon
          points="0,220 0,190 60,160 100,175 150,155 190,168 230,148 270,162 310,145 350,160 400,150 400,220"
          fill="#0a1f12"
          opacity="0.7"
        />

        {[80, 120, 160, 200].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="white"
            strokeOpacity="0.03"
            strokeWidth="0.5"
          />
        ))}

        <path
          d={fullPath}
          fill="none"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        {t > 0 && (
          <path
            d={donePath}
            fill="none"
            stroke="url(#routeDone)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        )}

        {/* Pickup marker */}
        <circle cx={P0.x} cy={P0.y} r="8" fill="#22c55e" opacity="0.9" />
        <circle cx={P0.x} cy={P0.y} r="12" fill="#22c55e" opacity="0.2" />
        <text
          x={P0.x}
          y={P0.y + 4}
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="bold"
        >
          P
        </text>
        <text
          x={P0.x}
          y={P0.y + 22}
          textAnchor="middle"
          fill="#86efac"
          fontSize="7"
          fontWeight="600"
        >
          {from.length > 8 ? `${from.slice(0, 8)}…` : from}
        </text>

        {/* Drop marker */}
        <circle cx={P3.x} cy={P3.y} r="8" fill="#f97316" opacity="0.9" />
        <circle cx={P3.x} cy={P3.y} r="12" fill="#f97316" opacity="0.2" />
        <text
          x={P3.x}
          y={P3.y + 4}
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="bold"
        >
          D
        </text>
        <text
          x={P3.x}
          y={P3.y + 22}
          textAnchor="middle"
          fill="#fdba74"
          fontSize="7"
          fontWeight="600"
        >
          {to.length > 8 ? `${to.slice(0, 8)}…` : to}
        </text>

        {/* Car */}
        <g
          transform={`translate(${carPos.x}, ${carPos.y})`}
          filter="url(#glow)"
        >
          <rect x="-10" y="-6" width="20" height="10" rx="3" fill="#3b82f6" />
          <rect x="-6" y="-10" width="12" height="6" rx="2" fill="#60a5fa" />
          <rect
            x="-5"
            y="-9"
            width="4"
            height="4"
            rx="1"
            fill="#bfdbfe"
            opacity="0.8"
          />
          <rect
            x="1"
            y="-9"
            width="4"
            height="4"
            rx="1"
            fill="#bfdbfe"
            opacity="0.8"
          />
          <circle cx="-6" cy="4" r="3" fill="#1e293b" />
          <circle cx="-6" cy="4" r="1.5" fill="#94a3b8" />
          <circle cx="6" cy="4" r="3" fill="#1e293b" />
          <circle cx="6" cy="4" r="1.5" fill="#94a3b8" />
          <circle cx="10" cy="-2" r="1.5" fill="#fde047" opacity="0.9" />
          <circle cx="10" cy="2" r="1.5" fill="#fde047" opacity="0.9" />
        </g>

        {/* ETA pill */}
        <rect
          x="8"
          y="8"
          width="90"
          height="24"
          rx="12"
          fill="black"
          fillOpacity="0.6"
        />
        <text
          x="53"
          y="24"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="bold"
        >
          ETA: {Math.ceil(eta)} min
        </text>

        {/* Progress pill */}
        <rect
          x="302"
          y="8"
          width="90"
          height="24"
          rx="12"
          fill="black"
          fillOpacity="0.6"
        />
        <text x="347" y="24" textAnchor="middle" fill="#94a3b8" fontSize="9">
          {Math.round(progress)}% done
        </text>
      </svg>
    </div>
  );
}

export default function TripTrackingPage() {
  const { bookingId } = useSearch({ from: "/trip-tracking" });
  const booking = getAllBookings().find((b) => b.bookingId === bookingId);
  const fromCity = booking?.pickup ?? "Pickup";
  const toCity = booking?.drop ?? "Drop";
  const vehicleLabel = booking?.vehicle ?? "";
  const fareLabel = booking?.fare ? `₹${booking.fare}` : "";

  const [eta, setEta] = useState(12);
  const [progress, setProgress] = useState(0);
  const [sosOpen, setSosOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const { sos: hapticSos, tap } = useHaptic();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 0.5;
      });
      setEta((e) => Math.max(0, e - 0.1));
    }, 300);
    return () => clearInterval(timer);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally scroll when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSOS = () => {
    hapticSos();
    setSosOpen(true);
    toast.error("SOS alert sent to emergency contacts!");
  };

  const handleShareTrip = () => {
    tap();
    const fakeLink = `https://pitthu.ai/track/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    navigator.clipboard
      .writeText(fakeLink)
      .then(() => toast.success("Trip link copied! Share with loved ones."))
      .catch(() => toast.info(`Trip link: ${fakeLink}`));
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    tap();
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: input.trim(),
        time: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

  if (!bookingId || !booking) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-montserrat font-black uppercase text-xl text-foreground mb-2">
            Booking Not Found
          </h2>
          <p className="text-muted-foreground text-sm">
            {bookingId
              ? "This booking could not be found."
              : "No booking ID provided."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pb-24">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-montserrat font-black uppercase text-xl text-foreground">
                Live Trip Tracking
              </h1>
              <p className="text-muted-foreground text-sm">
                {fromCity} → {toCity}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 text-xs font-montserrat font-bold uppercase">
                Live
              </span>
            </div>
          </div>

          {/* Animated SVG Route Map */}
          <Card className="shadow-glass mb-4 overflow-hidden">
            <CardContent className="p-0">
              <div data-ocid="tracking.canvas_target">
                <AnimatedRouteMap
                  progress={progress}
                  from={fromCity}
                  to={toCity}
                  eta={eta}
                />
              </div>
              <div className="h-2 bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <GeminiRouteHappenings from={fromCity} to={toCity} />

          {/* Driver ETA Card */}
          <Card className="shadow-card mb-6">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-montserrat font-black text-xl flex-shrink-0">
                  RS
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-montserrat font-bold text-foreground">
                      Ramesh Singh
                    </h3>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                      <Shield className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "w-3.5 h-3.5",
                          s <= 4
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-yellow-400/40",
                        )}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      4.8 (203 trips)
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {vehicleLabel || "Tata Sumo Gold"} · UP07-AB-1234
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    onClick={() => {
                      tap();
                      toast.info("Calling driver...");
                    }}
                    aria-label="Call driver"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    onClick={() => {
                      tap();
                      setChatOpen(true);
                    }}
                    aria-label="Chat with driver"
                    data-ocid="tracking.open_modal_button"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 bg-primary/8 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-primary font-montserrat font-black text-2xl">
                    Arrives in {Math.ceil(eta)} min
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {fromCity} → {toCity}
                    {fareLabel ? ` · ${fareLabel}` : ""}
                  </p>
                </div>
                <Car className="w-8 h-8 text-primary/40" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={handleSOS}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-montserrat font-black uppercase tracking-wider rounded-2xl py-4 text-sm transition-all active:scale-95 shadow-card"
              data-ocid="tracking.button"
            >
              🆘 SOS Emergency
            </button>
            <button
              type="button"
              onClick={handleShareTrip}
              className="flex items-center justify-center gap-2 bg-card hover:bg-muted border border-border text-foreground font-montserrat font-bold uppercase tracking-wider rounded-2xl py-4 text-sm transition-all active:scale-95 shadow-card"
              data-ocid="tracking.secondary_button"
            >
              <Share2 className="w-4 h-4" /> Share Trip
            </button>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={handleSOS}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-red-600 text-white font-montserrat font-black text-sm shadow-lg z-40 hover:bg-red-700 flex items-center justify-center"
        data-ocid="tracking.button"
        aria-label="SOS"
      >
        SOS
      </motion.button>

      {sosOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.02, 1], opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl border-2 border-red-500"
            data-ocid="tracking.modal"
          >
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 font-black text-2xl">SOS</span>
            </div>
            <h3 className="font-montserrat font-black uppercase text-xl text-foreground mb-2">
              Emergency Alert Sent!
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Your location has been sent to emergency contacts:
            </p>
            <div className="bg-muted rounded-lg px-4 py-2 mb-6">
              <p className="font-mono text-sm text-foreground">
                +91-XXXXXXXXXX
              </p>
              <p className="font-mono text-sm text-foreground">
                +91-XXXXXXXXXX
              </p>
            </div>
            <Button
              onClick={() => setSosOpen(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-montserrat font-bold uppercase rounded-full"
              data-ocid="tracking.close_button"
            >
              Close
            </Button>
          </motion.div>
        </div>
      )}

      <Sheet open={chatOpen} onOpenChange={setChatOpen}>
        <SheetContent
          side="bottom"
          className="h-[70vh] flex flex-col p-0"
          data-ocid="tracking.sheet"
        >
          <SheetHeader className="px-4 py-3 border-b border-border flex-shrink-0">
            <SheetTitle className="font-montserrat uppercase text-base flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Chat with Driver
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.sender === "user"
                        ? "text-primary-foreground/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex-shrink-0 px-4 py-3 border-t border-border flex gap-2">
            <input
              className="flex-1 border border-input rounded-full px-4 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              data-ocid="tracking.input"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90"
              data-ocid="tracking.primary_button"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
