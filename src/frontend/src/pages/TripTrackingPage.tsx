import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { GOOGLE_MAPS_API_KEY } from "@/lib/apiConfig";
import { cn } from "@/lib/utils";
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

export default function TripTrackingPage() {
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                Rishikesh → Kedarnath
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 text-xs font-montserrat font-bold uppercase">
                Live
              </span>
            </div>
          </div>

          {/* Google Maps Embed */}
          <Card className="shadow-glass mb-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative" data-ocid="tracking.canvas_target">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=Rishikesh,Uttarakhand&destination=Kedarnath,Uttarakhand&mode=driving`}
                  width="100%"
                  height="224"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Trip route map"
                />

                {/* ETA overlay */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
                  <p className="text-white font-montserrat font-black text-sm uppercase">
                    ETA: {Math.ceil(eta)} min
                  </p>
                  <p className="text-white/60 text-[10px]">
                    Rishikesh → Kedarnath
                  </p>
                </div>

                {/* Route info overlay */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-xl px-2 py-1.5">
                  <p className="text-white/80 text-[10px] font-medium">
                    {Math.round(progress)}% complete
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <GeminiRouteHappenings from="Rishikesh" to="Kedarnath" />

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
                    Tata Sumo Gold · UP07-AB-1234
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

              {/* Arrives in callout */}
              <div className="mt-4 bg-primary/8 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-primary font-montserrat font-black text-2xl">
                    Arrives in {Math.ceil(eta)} min
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Rishikesh → Kedarnath · 156 km
                  </p>
                </div>
                <Car className="w-8 h-8 text-primary/40" />
              </div>
            </CardContent>
          </Card>

          {/* Safety Buttons */}
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

      {/* SOS floating button */}
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

      {/* SOS Modal */}
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

      {/* Chat Sheet */}
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
                    className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}
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
