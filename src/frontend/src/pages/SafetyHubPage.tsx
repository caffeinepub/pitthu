import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Clock,
  MapPin,
  Shield,
  Users,
  Volume2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const roadConditions = [
  {
    route: "Rishikesh → Badrinath",
    score: 78,
    status: "Caution",
    note: "Light ice patches at Chamoli. Drive slow.",
    color: "amber",
  },
  {
    route: "Nainital → Almora",
    score: 91,
    status: "Clear",
    note: "All clear. Visibility good.",
    color: "emerald",
  },
  {
    route: "Dehradun → Mussoorie",
    score: 85,
    status: "Clear",
    note: "Slight fog at Camel's Back Road.",
    color: "emerald",
  },
  {
    route: "Rudraprayag → Kedarnath",
    score: 42,
    status: "Danger",
    note: "Heavy slush at Khairna Bend. Avoid if possible.",
    color: "red",
  },
  {
    route: "Haridwar → Rishikesh",
    score: 95,
    status: "Clear",
    note: "Perfect driving conditions.",
    color: "emerald",
  },
];

const landslideZones = [
  {
    name: "Garur Valley",
    risk: "Low",
    forecast: "Stable for 6h+",
    color: "emerald",
    x: 20,
    y: 30,
  },
  {
    name: "Chamoli Sector",
    risk: "Medium",
    forecast: "Monitor in 2h",
    color: "amber",
    x: 55,
    y: 45,
  },
  {
    name: "Uttarkashi Pass",
    risk: "High",
    forecast: "High risk in 2h",
    color: "red",
    x: 70,
    y: 20,
  },
];

const wildlifeAlerts = [
  {
    animal: "🐆",
    name: "Leopard",
    location: "Corbett Buffer Zone, Ramnagar",
    timeAgo: "2h ago",
  },
  {
    animal: "🐻",
    name: "Himalayan Bear",
    location: "Chopta-Tungnath Trail",
    timeAgo: "4h ago",
  },
  {
    animal: "🦅",
    name: "Musk Deer",
    location: "Kedarnath Wildlife Sanctuary",
    timeAgo: "1h ago",
  },
  {
    animal: "🐆",
    name: "Snow Leopard",
    location: "Milam Glacier Trek Path",
    timeAgo: "6h ago",
  },
  {
    animal: "🐘",
    name: "Wild Elephant",
    location: "Rajaji National Park Entry",
    timeAgo: "30min ago",
  },
];

const dialectPhrases: Record<string, { phrase: string; meaning: string }> = {
  Kumaoni: {
    phrase: "बाँयो मुड़ी जा, थोड़ा आगे",
    meaning: "Turn left, a little ahead",
  },
  Garhwali: {
    phrase: "सीधा जा, गढ़ तरफ",
    meaning: "Go straight, towards the fort",
  },
  Hindi: {
    phrase: "बाईं ओर मुड़ें, 500 मीटर आगे",
    meaning: "Turn left in 500 metres",
  },
  English: {
    phrase: "Turn left, destination in 500m",
    meaning: "Standard navigation prompt",
  },
};

const groupPoolers = [
  {
    initials: "RS",
    name: "Ravi S.",
    from: "Haldwani",
    date: "Dec 28",
    seats: 1,
  },
  {
    initials: "PM",
    name: "Priya M.",
    from: "Nainital",
    date: "Dec 28",
    seats: 2,
  },
  {
    initials: "AK",
    name: "Ankit K.",
    from: "Almora",
    date: "Dec 29",
    seats: 1,
  },
];

const vehicleETACoeff: Record<string, number> = {
  Hatchback: 1.28,
  SUV: 1.22,
  Tempo: 1.35,
};

export default function SafetyHubPage() {
  const [selectedDialect, setSelectedDialect] = useState("Kumaoni");
  const [etaVehicle, setEtaVehicle] = useState("SUV");
  const [etaRoute, setEtaRoute] = useState("Rishikesh-Badrinath");

  const baseEtaMins = 360; // 6h base
  const pahadi = Math.round(baseEtaMins * vehicleETACoeff[etaVehicle]);
  const pahadiH = Math.floor(pahadi / 60);
  const pahadiM = pahadi % 60;

  const hasHighRisk = landslideZones.some((z) => z.risk === "High");

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-blue-dark via-primary to-purple-800 py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
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
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-amber-400 font-montserrat font-bold uppercase tracking-[0.2em] text-xs">
                  PITTHU AI
                </p>
                <h1 className="font-montserrat font-black text-white text-3xl uppercase">
                  AI Safety Hub
                </h1>
              </div>
            </div>
            <p className="text-white/70 text-sm max-w-lg">
              Real-time mountain intelligence powered by crowdsourced data, AI
              vision & geological analysis.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* High Risk Warning */}
        <AnimatePresence>
          {hasHighRisk && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-300 rounded-xl p-4 flex items-center gap-3"
              data-ocid="safety.error_state"
            >
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-montserrat font-bold text-red-700 dark:text-red-400 text-sm">
                  HIGH LANDSLIDE RISK DETECTED
                </p>
                <p className="text-red-600 dark:text-red-300 text-xs">
                  Uttarkashi Pass — High risk in next 2 hours. Avoid travel in
                  this zone.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Road Condition Vision */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            Visual Road Health
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadConditions.map((rc, i) => (
              <motion.div
                key={rc.route}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                data-ocid={`safety.road.item.${i + 1}`}
              >
                <Card className="shadow-card border border-border h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-montserrat font-bold text-xs text-foreground leading-tight flex-1 mr-2">
                        {rc.route}
                      </p>
                      <Badge
                        className={`text-xs shrink-0 ${
                          rc.color === "emerald"
                            ? "bg-emerald-100 text-emerald-700"
                            : rc.color === "amber"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {rc.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            rc.color === "emerald"
                              ? "bg-emerald-500"
                              : rc.color === "amber"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${rc.score}%` }}
                        />
                      </div>
                      <span className="font-montserrat font-black text-sm text-foreground">
                        {rc.score}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{rc.note}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] text-muted-foreground">
                        Live
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Landslide Predictor */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            ⛰️ Landslide Predictor
          </h2>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                AI-analyzed geological + weather data — 2-hour forecast
              </p>
              {/* Illustrated risk map */}
              <div
                className="relative bg-gradient-to-br from-green-900/20 via-amber-900/10 to-red-900/20 rounded-xl overflow-hidden border border-border"
                style={{ height: 200 }}
              >
                <svg
                  viewBox="0 0 100 60"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Landslide risk map"
                >
                  <title>Landslide risk map</title>
                  {/* Mountain ridgeline */}
                  <path
                    d="M0 60 L10 40 L20 45 L30 30 L40 35 L50 20 L60 25 L70 15 L80 22 L90 18 L100 28 L100 60 Z"
                    fill="#1e3a1e"
                    opacity="0.4"
                  />
                  {/* Risk zones */}
                  <ellipse
                    cx={22}
                    cy={42}
                    rx={15}
                    ry={10}
                    fill="#10b981"
                    opacity={0.35}
                  />
                  <ellipse
                    cx={55}
                    cy={38}
                    rx={14}
                    ry={9}
                    fill="#f59e0b"
                    opacity={0.4}
                  />
                  <ellipse
                    cx={74}
                    cy={22}
                    rx={12}
                    ry={8}
                    fill="#ef4444"
                    opacity={0.45}
                  />
                  {/* Zone labels */}
                  <text
                    x={22}
                    y={43}
                    textAnchor="middle"
                    fontSize="4"
                    fill="#065f46"
                    fontWeight="bold"
                  >
                    LOW RISK
                  </text>
                  <text
                    x={55}
                    y={39}
                    textAnchor="middle"
                    fontSize="4"
                    fill="#92400e"
                    fontWeight="bold"
                  >
                    MEDIUM
                  </text>
                  <text
                    x={74}
                    y={23}
                    textAnchor="middle"
                    fontSize="4"
                    fill="#7f1d1d"
                    fontWeight="bold"
                  >
                    HIGH ⚠
                  </text>
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {landslideZones.map((zone) => (
                  <div
                    key={zone.name}
                    className="text-center p-3 rounded-xl bg-muted border border-border"
                  >
                    <Badge
                      className={`mb-1 text-xs ${
                        zone.color === "emerald"
                          ? "bg-emerald-100 text-emerald-700"
                          : zone.color === "amber"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {zone.risk}
                    </Badge>
                    <p className="font-montserrat font-bold text-xs text-foreground">
                      {zone.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {zone.forecast}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dynamic Pahadi ETA */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            🏔️ Pahadi ETA Calculator
          </h2>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Vehicle Type
                  </p>
                  <Select value={etaVehicle} onValueChange={setEtaVehicle}>
                    <SelectTrigger data-ocid="safety.eta.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Hatchback", "SUV", "Tempo"].map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Route</p>
                  <Select value={etaRoute} onValueChange={setEtaRoute}>
                    <SelectTrigger data-ocid="safety.route.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Rishikesh-Badrinath",
                        "Nainital-Ranikhet",
                        "Haridwar-Kedarnath",
                        "Dehradun-Chakrata",
                      ].map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-xl p-4 text-center border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Standard GPS ETA
                  </p>
                  <p className="font-montserrat font-black text-2xl text-foreground">
                    6h 0m
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Flat terrain assumption
                  </p>
                </div>
                <div className="bg-primary/10 rounded-xl p-4 text-center border border-primary/30">
                  <p className="text-xs text-primary uppercase tracking-wider mb-1 font-bold">
                    Pahadi ETA ⛰️
                  </p>
                  <p className="font-montserrat font-black text-2xl text-primary">
                    {pahadiH}h {pahadiM}m
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hill terrain + vehicle torque
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Pahadi ETA accounts for steep inclines, hairpin bends, and{" "}
                {etaVehicle} hill-climbing speed.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Wildlife Alerts */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            🦁 Wildlife Alert Feed
          </h2>
          <div className="space-y-3">
            {wildlifeAlerts.map((alert, i) => (
              <motion.div
                key={alert.location}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`safety.wildlife.item.${i + 1}`}
              >
                <Card className="shadow-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <span className="text-3xl">{alert.animal}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-montserrat font-bold text-sm text-foreground">
                          {alert.name}
                        </p>
                        <Badge className="bg-amber-100 text-amber-700 text-[10px]">
                          Reported by locals
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" /> {alert.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {alert.timeAgo}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dialect Nav Toggle */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            🗣️ Offline Dialect Navigation
          </h2>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Navigation in your mountain dialect — reduces screen distraction
                for local drivers.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {Object.keys(dialectPhrases).map((dialect) => (
                  <button
                    key={dialect}
                    type="button"
                    onClick={() => setSelectedDialect(dialect)}
                    className={`py-2.5 px-3 rounded-xl border-2 font-montserrat font-bold text-sm transition-all ${
                      selectedDialect === dialect
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                    data-ocid={"safety.dialect.tab"}
                  >
                    {dialect}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDialect}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-5 border border-primary/20"
                >
                  <div className="flex items-start gap-3">
                    <Volume2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-foreground text-lg leading-snug">
                        {dialectPhrases[selectedDialect].phrase}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        English: "{dialectPhrases[selectedDialect].meaning}"
                      </p>
                      <Badge className="mt-2 bg-primary/10 text-primary text-xs">
                        {selectedDialect} Navigation
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </section>

        {/* Smart Group Pooling */}
        <section>
          <h2 className="font-montserrat font-extrabold uppercase text-xl text-foreground mb-4">
            🚗 Smart Group Pooling
          </h2>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl p-4 mb-4">
                <p className="font-montserrat font-bold text-amber-800 dark:text-amber-300">
                  🛕 Going to Jageshwar Temple?
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  3 travelers heading there on Dec 28-29. Join the pool and save
                  up to ₹800!
                </p>
              </div>
              <div className="space-y-3 mb-4">
                {groupPoolers.map((p, i) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 p-3 bg-muted rounded-xl"
                    data-ocid={`safety.pooler.item.${i + 1}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-montserrat font-bold text-sm">
                      {p.initials}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-foreground">
                        {p.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        From {p.from} · {p.date} · {p.seats} seat
                        {p.seats > 1 ? "s" : ""}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground font-montserrat font-bold uppercase text-xs rounded-full"
                      onClick={() => toast.success("Pool request sent!")}
                      data-ocid={"safety.pool.button"}
                    >
                      Join
                    </Button>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <p className="font-montserrat font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                    Cost Split Calculator
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Solo fare</p>
                    <p className="font-black text-foreground">₹2,400</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pool fare</p>
                    <p className="font-black text-emerald-600">₹600</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">You save</p>
                    <p className="font-black text-emerald-600">₹1,800 🎉</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
