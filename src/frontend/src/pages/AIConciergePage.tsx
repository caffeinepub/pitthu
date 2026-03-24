import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Bot,
  CheckCircle2,
  FileText,
  MapPin,
  Sparkles,
  Upload,
  Wind,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const vibeItineraries: Record<
  string,
  { title: string; days: { dest: string; desc: string }[] }
> = {
  "🌿 Quiet & Misty": {
    title: "Misty Retreats of Kumaon",
    days: [
      {
        dest: "Mukteshwar",
        desc: "Arrive, check into a pine-nestled homestay. Watch clouds roll over the valley from your balcony.",
      },
      {
        dest: "Binsar Wildlife Sanctuary",
        desc: "Early morning bird-watching walk. 300+ Himalayan species. Absolute silence, just birdsong.",
      },
      {
        dest: "Pangot",
        desc: "Village walk, local Pahadi lunch, depart rejuvenated.",
      },
    ],
  },
  "⛰️ Adventure Seeker": {
    title: "Adrenaline in the Garhwal",
    days: [
      {
        dest: "Rishikesh",
        desc: "River rafting on Class IV rapids of Ganga. High-adrenaline, professional guides.",
      },
      {
        dest: "Har Ki Dun",
        desc: "Trek through ancient glacial valley. Camp under 5,000m peaks.",
      },
      {
        dest: "Auli",
        desc: "Asia's highest ski resort. Cable car ride with panoramic Himalaya views.",
      },
    ],
  },
  "🙏 Pilgrimage": {
    title: "Devbhoomi Char Dham Circuit",
    days: [
      {
        dest: "Yamunotri",
        desc: "First of the Char Dhams. Sacred hot springs, Divya Shila rock worship.",
      },
      {
        dest: "Gangotri",
        desc: "Source of the Holy Ganga. Sunrise aarti with mountain backdrop.",
      },
      {
        dest: "Kedarnath",
        desc: "Most sacred Shiva shrine. Helicopter available. Profound spiritual energy.",
      },
    ],
  },
  "🍛 Local Food Trail": {
    title: "Pahadi Flavours Journey",
    days: [
      {
        dest: "Almora",
        desc: "Bal Mithai and Singori sweets. Local market exploration. Dal-bhaat-roti at a village kitchen.",
      },
      {
        dest: "Lansdowne",
        desc: "Kafuli (spinach gravy), Jhangora kheer, and Rhododendron juice at a forest café.",
      },
      {
        dest: "Chakrata",
        desc: "Wild mushroom curry, fresh trout, and Buransh sharbat at sunset.",
      },
    ],
  },
};

const modalRoutes: Record<
  string,
  { steps: { mode: string; route: string; dist: string; icon: string }[] }
> = {
  "Milam Glacier": {
    steps: [
      { mode: "Car", route: "Dehradun → Munsiari", dist: "310 km", icon: "🚗" },
      {
        mode: "Drone",
        route: "Munsiari → Base Camp",
        dist: "18 km",
        icon: "🚁",
      },
      { mode: "Mule", route: "Base Camp → Milam", dist: "5 km", icon: "🫏" },
    ],
  },
  "Har Ki Dun": {
    steps: [
      { mode: "Car", route: "Dehradun → Sankri", dist: "195 km", icon: "🚗" },
      { mode: "Drone", route: "Sankri → Osla", dist: "14 km", icon: "🚁" },
      { mode: "Trek", route: "Osla → Har Ki Dun", dist: "6 km", icon: "🥾" },
    ],
  },
  Pangarchulla: {
    steps: [
      {
        mode: "Car",
        route: "Rishikesh → Joshimath",
        dist: "265 km",
        icon: "🚗",
      },
      { mode: "Drone", route: "Joshimath → Tugasi", dist: "9 km", icon: "🚁" },
      { mode: "Trek", route: "Tugasi → Summit", dist: "8 km", icon: "🥾" },
    ],
  },
  "Niti Valley": {
    steps: [
      { mode: "Car", route: "Haridwar → Chamoli", dist: "220 km", icon: "🚗" },
      {
        mode: "Drone",
        route: "Chamoli → Inner Zone",
        dist: "22 km",
        icon: "🚁",
      },
      { mode: "Mule", route: "Inner Zone → Niti", dist: "4 km", icon: "🫏" },
    ],
  },
};

type ChatMessage = {
  role: "user" | "ai";
  text: string;
  itinerary?: (typeof vibeItineraries)[string];
};

export default function AIConciergePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Namaste! 🙏 I'm your AI Mountain Concierge. Tell me your travel vibe, or choose a quick option below, and I'll craft your perfect Uttarakhand itinerary.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [customVibe, setCustomVibe] = useState("");
  const [curvinessMode, setCurvinessMode] = useState<
    "scenic" | "tunnel" | null
  >(null);
  const [selectedDest, setSelectedDest] = useState("Milam Glacier");
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [permitScanning, setPermitScanning] = useState(false);
  const [permitDone, setPermitDone] = useState(false);
  const [permitNum, setPermitNum] = useState("");
  const [memoryDrone, setMemoryDrone] = useState(false);
  const [windSpeed, setWindSpeed] = useState([35]);
  const [altitude, setAltitude] = useState([2500]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll on message changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleVibeChip = (vibe: string) => {
    const userMsg: ChatMessage = { role: "user", text: vibe };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const itinerary = vibeItineraries[vibe];
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Perfect! Based on your "${vibe}" vibe, here's your personalised Uttarakhand itinerary:`,
          itinerary,
        },
      ]);
    }, 1800);
  };

  const handleCustomVibe = () => {
    if (!customVibe.trim()) return;
    const userMsg: ChatMessage = { role: "user", text: customVibe };
    setMessages((prev) => [...prev, userMsg]);
    setCustomVibe("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `I love your vibe! Based on "${userMsg.text}", I'd recommend exploring Chopta (mini Switzerland of India), Lansdowne (colonial hill station), and the ancient Jageshwar temple complex. Want a detailed 3-day itinerary?`,
        },
      ]);
    }, 2000);
  };

  const handleRevealRoute = () => {
    setRevealedSteps(0);
    const steps = modalRoutes[selectedDest].steps;
    steps.forEach((_, i) => {
      setTimeout(() => setRevealedSteps(i + 1), i * 600 + 200);
    });
  };

  const handlePermitScan = () => {
    setPermitScanning(true);
    setPermitDone(false);
    setTimeout(() => {
      setPermitScanning(false);
      setPermitDone(true);
      const num = `ILP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`;
      setPermitNum(num);
      toast.success("Inner Line Permit applied successfully!");
    }, 3000);
  };

  const batteryUsage = Math.min(
    100,
    Math.round((windSpeed[0] / 80) * 60 + (altitude[0] / 5000) * 40),
  );
  const isNoGo = windSpeed[0] > 60;

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-brand-blue-dark py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-uttarakhand.dim_1400x700.jpg')",
            backgroundSize: "cover",
          }}
        />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <p className="text-purple-300 font-montserrat font-bold uppercase tracking-[0.2em] text-xs">
                  PITTHU AI
                </p>
                <h1 className="font-montserrat font-black text-white text-3xl uppercase">
                  AI Concierge
                </h1>
              </div>
            </div>
            <p className="text-white/70 text-sm max-w-lg">
              Plan your mountain journey by vibe, not just destinations.
              AI-powered, hyper-local, Uttarakhand-obsessed.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Trip Architect Chatbot */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-500" /> Trip Architect
          </h2>
          <Card className="shadow-card">
            <CardContent className="p-0">
              {/* Chat messages */}
              <div
                className="h-64 overflow-y-auto p-4 space-y-3 bg-muted/30"
                id="chat-box"
              >
                {messages.map((msg, i) => (
                  <motion.div
                    // biome-ignore lint/suspicious/noArrayIndexKey: chat messages are append-only
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-card text-foreground border border-border rounded-bl-none"
                      }`}
                    >
                      {msg.role === "ai" && (
                        <Bot className="w-3.5 h-3.5 inline mr-1.5 text-purple-500 -mt-0.5" />
                      )}
                      {msg.text}
                      {msg.itinerary && (
                        <div className="mt-3 space-y-2">
                          <p className="font-montserrat font-bold text-xs uppercase tracking-wide">
                            {msg.itinerary.title}
                          </p>
                          {msg.itinerary.days.map((day, di) => (
                            <div
                              key={day.dest}
                              className="bg-muted/50 rounded-lg p-2.5"
                            >
                              <p className="font-bold text-xs">
                                Day {di + 1} — {day.dest}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {day.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-card border border-border rounded-2xl rounded-bl-none px-4 py-3">
                      <div className="flex gap-1">
                        {/* biome-ignore lint/suspicious/noArrayIndexKey: static 3-dot animation */}
                        {[0, 1, 2].map((j) => (
                          <motion.span
                            key={j}
                            className="w-2 h-2 rounded-full bg-purple-400 inline-block"
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 0.8,
                              delay: j * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
              {/* Vibe chips */}
              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  Choose your vibe:
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {Object.keys(vibeItineraries).map((vibe) => (
                    <button
                      key={vibe}
                      type="button"
                      onClick={() => handleVibeChip(vibe)}
                      className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium border border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors"
                      data-ocid="ai.vibe.tab"
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Describe your vibe... (e.g. solo trek, no crowds)"
                    value={customVibe}
                    onChange={(e) => setCustomVibe(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCustomVibe()}
                    className="flex-1 text-sm"
                    data-ocid="ai.chat.input"
                  />
                  <Button
                    onClick={handleCustomVibe}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-montserrat font-bold uppercase text-xs rounded-full px-4"
                    data-ocid="ai.chat.submit_button"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Curviness Filter */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            🌀 Route Curviness Filter
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                id: "scenic" as const,
                icon: "🌀",
                title: "Scenic / Curvy Route",
                desc: "Enjoy the bends, hairpin turns, mountain vistas. Made for those who love the journey.",
                badge: "Recommended for travelers",
              },
              {
                id: "tunnel" as const,
                icon: "🚇",
                title: "Fast / Tunnel Route",
                desc: "Bypass mountain curves via tunnels. Efficient, less scenic, motion-sickness friendly.",
                badge: "Best for motion sickness",
              },
            ].map((option) => (
              <motion.button
                key={option.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurvinessMode(option.id)}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  curvinessMode === option.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/40"
                }`}
                data-ocid={`ai.route.${option.id}.toggle`}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <p className="font-montserrat font-black text-base text-foreground mb-1">
                  {option.title}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {option.desc}
                </p>
                <Badge
                  className={
                    curvinessMode === option.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {option.badge}
                </Badge>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Multi-Modal Hub */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            🗺️ Multi-Modal Route Planner
          </h2>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex gap-3 mb-5 flex-wrap">
                <Select
                  value={selectedDest}
                  onValueChange={(v) => {
                    setSelectedDest(v);
                    setRevealedSteps(0);
                  }}
                >
                  <SelectTrigger
                    className="w-48"
                    data-ocid="ai.destination.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(modalRoutes).map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleRevealRoute}
                  className="bg-primary text-primary-foreground font-montserrat font-bold uppercase text-xs rounded-full"
                  data-ocid="ai.route.primary_button"
                >
                  Plan Route
                </Button>
              </div>
              <div className="space-y-3">
                {modalRoutes[selectedDest].steps.map((step, i) => (
                  <AnimatePresence key={step.route}>
                    {revealedSteps > i && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 p-3 bg-muted rounded-xl border border-border"
                        data-ocid={`ai.route.item.${i + 1}`}
                      >
                        <span className="text-2xl">{step.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-primary/10 text-primary text-xs">
                              {step.mode}
                            </Badge>
                            <span className="text-sm font-medium text-foreground">
                              {step.route}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {step.dist}
                          </p>
                        </div>
                        {i < modalRoutes[selectedDest].steps.length - 1 && (
                          <div className="text-muted-foreground">→</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Permit Manager */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            <FileText className="w-5 h-5 inline mr-2 text-amber-500" />
            Inner Line Permit Manager
          </h2>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Required for border areas like Milam, Niti Valley, and Munsiari.
                Upload your Aadhaar ID and we'll apply automatically.
              </p>
              {!permitDone ? (
                <button
                  type="button"
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors relative overflow-hidden w-full"
                  onClick={handlePermitScan}
                  data-ocid="ai.permit.upload_button"
                >
                  {permitScanning ? (
                    <div className="relative">
                      <p className="font-montserrat font-bold text-sm text-foreground mb-3">
                        Scanning ID...
                      </p>
                      <div className="relative bg-muted rounded-lg h-2 overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent"
                          animate={{ x: [-48, 300] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.2,
                            ease: "linear",
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        AI analysing document...
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="font-montserrat font-bold text-sm text-foreground">
                        Upload Aadhaar / Passport
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Click to scan and auto-apply for Inner Line Permit
                      </p>
                    </>
                  )}
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 rounded-xl p-5 text-center"
                  data-ocid="ai.permit.success_state"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="font-montserrat font-bold text-emerald-700 dark:text-emerald-400">
                    Permit Applied ✓
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Permit No:{" "}
                    <span className="font-mono font-bold text-foreground">
                      {permitNum}
                    </span>
                  </p>
                  <Badge className="mt-2 bg-emerald-100 text-emerald-700">
                    Processing: 24-48 hours
                  </Badge>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Memory Drone CTA */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url('/assets/generated/hero-uttarakhand.dim_1400x700.jpg')",
                backgroundSize: "cover",
              }}
            />
            <div className="relative p-8">
              <Badge className="mb-3 bg-purple-500/20 text-purple-300 border border-purple-500/30">
                NEW · Post-Trip Experience
              </Badge>
              <h3 className="font-montserrat font-black text-white text-2xl uppercase mb-2">
                Memory Drone
              </h3>
              <p className="text-white/70 text-sm mb-6 max-w-md">
                A drone follows your car for 2 minutes at a scenic mountain spot
                and captures cinematic 4K footage of your drive. Delivered to
                your phone within the hour.
              </p>
              <div className="flex items-center gap-4">
                <Switch
                  checked={memoryDrone}
                  onCheckedChange={(v) => {
                    setMemoryDrone(v);
                    if (v) toast.success("Memory Drone added to your booking!");
                  }}
                  id="memory-drone"
                  data-ocid="ai.memory_drone.switch"
                />
                <p className="text-white font-montserrat font-bold text-sm cursor-pointer">
                  {memoryDrone ? "✓ Added to booking" : "Add to my trip"}
                </p>
                {memoryDrone && (
                  <Badge className="bg-purple-500 text-white">+₹999</Badge>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Battery-Drain Predictor */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            <Zap className="w-5 h-5 inline mr-2 text-yellow-500" />
            Drone Battery Predictor
          </h2>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Wind className="w-4 h-4" /> Wind Speed
                      </p>
                      <span className="font-montserrat font-black text-foreground">
                        {windSpeed[0]} km/h
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={80}
                      step={1}
                      value={windSpeed}
                      onValueChange={setWindSpeed}
                      className="w-full"
                      data-ocid="ai.wind.input"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Calm</span>
                      <span>Storm</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> Altitude
                      </p>
                      <span className="font-montserrat font-black text-foreground">
                        {altitude[0]}m
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={5000}
                      step={100}
                      value={altitude}
                      onValueChange={setAltitude}
                      className="w-full"
                      data-ocid="ai.altitude.input"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0m</span>
                      <span>5,000m</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* Battery gauge */}
                  <div className="relative w-32 h-32">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      role="img"
                      aria-label="Illustration"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={
                          isNoGo
                            ? "#ef4444"
                            : batteryUsage > 60
                              ? "#f59e0b"
                              : "#10b981"
                        }
                        strokeWidth="10"
                        strokeDasharray={`${(batteryUsage / 100) * 264} 264`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-montserrat font-black text-2xl text-foreground">
                        {batteryUsage}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        usage
                      </span>
                    </div>
                  </div>
                  <div
                    className={`mt-4 px-5 py-2 rounded-full font-montserrat font-black text-sm uppercase tracking-wider ${
                      isNoGo
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    }`}
                    data-ocid={
                      isNoGo
                        ? "ai.battery.error_state"
                        : "ai.battery.success_state"
                    }
                  >
                    {isNoGo ? "🚫 NO-GO" : "✅ GO"}
                  </div>
                  {isNoGo && (
                    <p className="text-xs text-red-500 mt-2 text-center">
                      Wind speed exceeds 60 km/h. Drone flight unsafe.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
