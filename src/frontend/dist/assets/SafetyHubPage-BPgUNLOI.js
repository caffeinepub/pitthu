import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, S as Shield, A as AnimatePresence, w as TriangleAlert, e as Card, f as CardContent, B as Badge, x as Select, y as SelectTrigger, z as SelectValue, D as SelectContent, E as SelectItem, M as MapPin, F as Clock, l as Button, i as ue } from "./index-hZrb6ubp.js";
import { U as Users } from "./users-DPXJiKuX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode);
const roadConditions = [
  {
    route: "Rishikesh → Badrinath",
    score: 78,
    status: "Caution",
    note: "Light ice patches at Chamoli. Drive slow.",
    color: "amber"
  },
  {
    route: "Nainital → Almora",
    score: 91,
    status: "Clear",
    note: "All clear. Visibility good.",
    color: "emerald"
  },
  {
    route: "Dehradun → Mussoorie",
    score: 85,
    status: "Clear",
    note: "Slight fog at Camel's Back Road.",
    color: "emerald"
  },
  {
    route: "Rudraprayag → Kedarnath",
    score: 42,
    status: "Danger",
    note: "Heavy slush at Khairna Bend. Avoid if possible.",
    color: "red"
  },
  {
    route: "Haridwar → Rishikesh",
    score: 95,
    status: "Clear",
    note: "Perfect driving conditions.",
    color: "emerald"
  }
];
const landslideZones = [
  {
    name: "Garur Valley",
    risk: "Low",
    forecast: "Stable for 6h+",
    color: "emerald",
    x: 20,
    y: 30
  },
  {
    name: "Chamoli Sector",
    risk: "Medium",
    forecast: "Monitor in 2h",
    color: "amber",
    x: 55,
    y: 45
  },
  {
    name: "Uttarkashi Pass",
    risk: "High",
    forecast: "High risk in 2h",
    color: "red",
    x: 70,
    y: 20
  }
];
const wildlifeAlerts = [
  {
    animal: "🐆",
    name: "Leopard",
    location: "Corbett Buffer Zone, Ramnagar",
    timeAgo: "2h ago"
  },
  {
    animal: "🐻",
    name: "Himalayan Bear",
    location: "Chopta-Tungnath Trail",
    timeAgo: "4h ago"
  },
  {
    animal: "🦅",
    name: "Musk Deer",
    location: "Kedarnath Wildlife Sanctuary",
    timeAgo: "1h ago"
  },
  {
    animal: "🐆",
    name: "Snow Leopard",
    location: "Milam Glacier Trek Path",
    timeAgo: "6h ago"
  },
  {
    animal: "🐘",
    name: "Wild Elephant",
    location: "Rajaji National Park Entry",
    timeAgo: "30min ago"
  }
];
const dialectPhrases = {
  Kumaoni: {
    phrase: "बाँयो मुड़ी जा, थोड़ा आगे",
    meaning: "Turn left, a little ahead"
  },
  Garhwali: {
    phrase: "सीधा जा, गढ़ तरफ",
    meaning: "Go straight, towards the fort"
  },
  Hindi: {
    phrase: "बाईं ओर मुड़ें, 500 मीटर आगे",
    meaning: "Turn left in 500 metres"
  },
  English: {
    phrase: "Turn left, destination in 500m",
    meaning: "Standard navigation prompt"
  }
};
const groupPoolers = [
  {
    initials: "RS",
    name: "Ravi S.",
    from: "Haldwani",
    date: "Dec 28",
    seats: 1
  },
  {
    initials: "PM",
    name: "Priya M.",
    from: "Nainital",
    date: "Dec 28",
    seats: 2
  },
  {
    initials: "AK",
    name: "Ankit K.",
    from: "Almora",
    date: "Dec 29",
    seats: 1
  }
];
const vehicleETACoeff = {
  Hatchback: 1.28,
  SUV: 1.22,
  Tempo: 1.35
};
function SafetyHubPage() {
  const [selectedDialect, setSelectedDialect] = reactExports.useState("Kumaoni");
  const [etaVehicle, setEtaVehicle] = reactExports.useState("SUV");
  const [etaRoute, setEtaRoute] = reactExports.useState("Rishikesh-Badrinath");
  const baseEtaMins = 360;
  const pahadi = Math.round(baseEtaMins * vehicleETACoeff[etaVehicle]);
  const pahadiH = Math.floor(pahadi / 60);
  const pahadiM = pahadi % 60;
  const hasHighRisk = landslideZones.some((z) => z.risk === "High");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-muted pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-brand-blue-dark via-primary to-purple-800 py-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 opacity-10",
          style: {
            backgroundImage: "url('/assets/generated/hero-uttarakhand.dim_1400x700.jpg')",
            backgroundSize: "cover"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-amber-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-400 font-montserrat font-bold uppercase tracking-[0.2em] text-xs", children: "PITTHU AI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-montserrat font-black text-white text-3xl uppercase", children: "AI Safety Hub" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm max-w-lg", children: "Real-time mountain intelligence powered by crowdsourced data, AI vision & geological analysis." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasHighRisk && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          className: "bg-red-50 dark:bg-red-900/20 border border-red-300 rounded-xl p-4 flex items-center gap-3",
          "data-ocid": "safety.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-red-500 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-red-700 dark:text-red-400 text-sm", children: "HIGH LANDSLIDE RISK DETECTED" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600 dark:text-red-300 text-xs", children: "Uttarkashi Pass — High risk in next 2 hours. Avoid travel in this zone." })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" }),
          "Visual Road Health"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: roadConditions.map((rc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.07 },
            "data-ocid": `safety.road.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card border border-border h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-xs text-foreground leading-tight flex-1 mr-2", children: rc.route }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs shrink-0 ${rc.color === "emerald" ? "bg-emerald-100 text-emerald-700" : rc.color === "amber" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`,
                    children: rc.status
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-2 rounded-full transition-all ${rc.color === "emerald" ? "bg-emerald-500" : rc.color === "amber" ? "bg-amber-500" : "bg-red-500"}`,
                    style: { width: `${rc.score}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-montserrat font-black text-sm text-foreground", children: rc.score })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: rc.note }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Live" })
              ] })
            ] }) })
          },
          rc.route
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: "⛰️ Landslide Predictor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "AI-analyzed geological + weather data — 2-hour forecast" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "relative bg-gradient-to-br from-green-900/20 via-amber-900/10 to-red-900/20 rounded-xl overflow-hidden border border-border",
              style: { height: 200 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  viewBox: "0 0 100 60",
                  className: "w-full h-full",
                  preserveAspectRatio: "none",
                  role: "img",
                  "aria-label": "Landslide risk map",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Landslide risk map" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M0 60 L10 40 L20 45 L30 30 L40 35 L50 20 L60 25 L70 15 L80 22 L90 18 L100 28 L100 60 Z",
                        fill: "#1e3a1e",
                        opacity: "0.4"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "ellipse",
                      {
                        cx: 22,
                        cy: 42,
                        rx: 15,
                        ry: 10,
                        fill: "#10b981",
                        opacity: 0.35
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "ellipse",
                      {
                        cx: 55,
                        cy: 38,
                        rx: 14,
                        ry: 9,
                        fill: "#f59e0b",
                        opacity: 0.4
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "ellipse",
                      {
                        cx: 74,
                        cy: 22,
                        rx: 12,
                        ry: 8,
                        fill: "#ef4444",
                        opacity: 0.45
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: 22,
                        y: 43,
                        textAnchor: "middle",
                        fontSize: "4",
                        fill: "#065f46",
                        fontWeight: "bold",
                        children: "LOW RISK"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: 55,
                        y: 39,
                        textAnchor: "middle",
                        fontSize: "4",
                        fill: "#92400e",
                        fontWeight: "bold",
                        children: "MEDIUM"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: 74,
                        y: 23,
                        textAnchor: "middle",
                        fontSize: "4",
                        fill: "#7f1d1d",
                        fontWeight: "bold",
                        children: "HIGH ⚠"
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: landslideZones.map((zone) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center p-3 rounded-xl bg-muted border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `mb-1 text-xs ${zone.color === "emerald" ? "bg-emerald-100 text-emerald-700" : zone.color === "amber" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`,
                    children: zone.risk
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-xs text-foreground", children: zone.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: zone.forecast })
              ]
            },
            zone.name
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: "🏔️ Pahadi ETA Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Vehicle Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: etaVehicle, onValueChange: setEtaVehicle, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "safety.eta.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Hatchback", "SUV", "Tempo"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: v, children: v }, v)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Route" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: etaRoute, onValueChange: setEtaRoute, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "safety.route.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [
                  "Rishikesh-Badrinath",
                  "Nainital-Ranikhet",
                  "Haridwar-Kedarnath",
                  "Dehradun-Chakrata"
                ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-4 text-center border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Standard GPS ETA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-black text-2xl text-foreground", children: "6h 0m" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Flat terrain assumption" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 rounded-xl p-4 text-center border border-primary/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary uppercase tracking-wider mb-1 font-bold", children: "Pahadi ETA ⛰️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-montserrat font-black text-2xl text-primary", children: [
                pahadiH,
                "h ",
                pahadiM,
                "m"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Hill terrain + vehicle torque" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3 text-center", children: [
            "Pahadi ETA accounts for steep inclines, hairpin bends, and",
            " ",
            etaVehicle,
            " hill-climbing speed."
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: "🦁 Wildlife Alert Feed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: wildlifeAlerts.map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.08 },
            "data-ocid": `safety.wildlife.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: alert.animal }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-sm text-foreground", children: alert.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-700 text-[10px]", children: "Reported by locals" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                  " ",
                  alert.location
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                " ",
                alert.timeAgo
              ] })
            ] }) })
          },
          alert.location
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: "🗣️ Offline Dialect Navigation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Navigation in your mountain dialect — reduces screen distraction for local drivers." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: Object.keys(dialectPhrases).map((dialect) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedDialect(dialect),
              className: `py-2.5 px-3 rounded-xl border-2 font-montserrat font-bold text-sm transition-all ${selectedDialect === dialect ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`,
              "data-ocid": "safety.dialect.tab",
              children: dialect
            },
            dialect
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              className: "bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-5 border border-primary/20",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5 text-primary mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-lg leading-snug", children: dialectPhrases[selectedDialect].phrase }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                    'English: "',
                    dialectPhrases[selectedDialect].meaning,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mt-2 bg-primary/10 text-primary text-xs", children: [
                    selectedDialect,
                    " Navigation"
                  ] })
                ] })
              ] })
            },
            selectedDialect
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-montserrat font-extrabold uppercase text-xl text-foreground mb-4", children: "🚗 Smart Group Pooling" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl p-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-amber-800 dark:text-amber-300", children: "🛕 Going to Jageshwar Temple?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-700 dark:text-amber-400", children: "3 travelers heading there on Dec 28-29. Join the pool and save up to ₹800!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: groupPoolers.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 bg-muted rounded-xl",
              "data-ocid": `safety.pooler.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-montserrat font-bold text-sm", children: p.initials }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "From ",
                    p.from,
                    " · ",
                    p.date,
                    " · ",
                    p.seats,
                    " seat",
                    p.seats > 1 ? "s" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "bg-primary text-primary-foreground font-montserrat font-bold uppercase text-xs rounded-full",
                    onClick: () => ue.success("Pool request sent!"),
                    "data-ocid": "safety.pool.button",
                    children: "Join"
                  }
                )
              ]
            },
            p.name
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-emerald-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-montserrat font-bold text-emerald-700 dark:text-emerald-400 text-sm", children: "Cost Split Calculator" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Solo fare" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-foreground", children: "₹2,400" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pool fare" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-emerald-600", children: "₹600" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You save" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-emerald-600", children: "₹1,800 🎉" })
              ] })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  SafetyHubPage as default
};
