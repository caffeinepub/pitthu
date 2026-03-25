import { r as reactExports, j as jsxRuntimeExports, L as Link, ae as Wallet, d as Car, h as Star, m as motion, A as AnimatePresence, B as Badge, l as Button, M as MapPin, i as ue, w as TriangleAlert } from "./index-hZrb6ubp.js";
import { A as ArrowLeft } from "./arrow-left-DLIXcLlj.js";
import { C as CircleX } from "./circle-x-C_TT87I_.js";
import { C as CircleCheckBig } from "./circle-check-big-CFFkneeh.js";
import { P as Phone } from "./phone-Whwi7IBs.js";
const MOCK_BOOKINGS = [
  {
    id: "BK001",
    rider: "Rahul Sharma",
    phone: "9876543210",
    pickup: "Rishikesh Bus Stand",
    drop: "Haridwar Railway Station",
    vehicle: "Sedan",
    fare: 380,
    distance: "24 km",
    eta: "8 min away"
  },
  {
    id: "BK002",
    rider: "Priya Negi",
    phone: "9812345678",
    pickup: "Mussoorie Mall Road",
    drop: "Dehradun Airport",
    vehicle: "SUV",
    fare: 850,
    distance: "34 km",
    eta: "12 min away"
  },
  {
    id: "BK003",
    rider: "Vikram Rawat",
    phone: "9765432109",
    pickup: "AIIMS Rishikesh",
    drop: "Jolly Grant Airport",
    vehicle: "Hatchback",
    fare: 420,
    distance: "19 km",
    eta: "5 min away"
  },
  {
    id: "BK004",
    rider: "Anjali Bisht",
    phone: "9654321098",
    pickup: "Kedarnath Temple Road",
    drop: "Guptkashi",
    vehicle: "Alto",
    fare: 310,
    distance: "15 km",
    eta: "18 min away"
  }
];
function DriverDashboardPage() {
  const [tab, setTab] = reactExports.useState("available");
  const [bookings, setBookings] = reactExports.useState(MOCK_BOOKINGS);
  const [activeRide, setActiveRide] = reactExports.useState(null);
  const handleAccept = (booking) => {
    setActiveRide({ ...booking, status: "accepted" });
    setBookings((prev) => prev.filter((b) => b.id !== booking.id));
    setTab("active");
    ue.success(`Ride accepted! Heading to ${booking.pickup}`);
  };
  const handleReject = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    ue.info("Ride rejected.");
  };
  const handleStartRide = () => {
    if (!activeRide) return;
    setActiveRide({ ...activeRide, status: "ongoing" });
    ue.success("Ride started! Drive safely 🚗");
  };
  const handleCompleteRide = () => {
    if (!activeRide) return;
    setActiveRide({ ...activeRide, status: "completed" });
    ue.success(`Ride completed! You earned ₹${activeRide.fare} 🎉`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "p-2 rounded-xl hover:bg-white/10 transition-colors",
          "data-ocid": "driver_dashboard.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold tracking-tight", children: "Driver Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: "Rajan Bisht" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold text-sm", children: "RB" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 grid grid-cols-3 gap-3", children: [
      {
        icon: Wallet,
        label: "Today (After 15% fee)",
        value: "₹1,054",
        color: "text-green-400"
      },
      { icon: Car, label: "Rides", value: "8", color: "text-blue-400" },
      {
        icon: Star,
        label: "Rating",
        value: "4.8★",
        color: "text-orange-400"
      }
    ].map(({ icon: Icon, label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 mx-auto mb-1 ${color}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-bold ${color}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-4 flex gap-2", children: ["available", "active"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setTab(t),
        "data-ocid": "driver_dashboard.tab",
        className: `flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg" : "bg-white/10 text-white/60 hover:bg-white/15"}`,
        children: t === "available" ? `Available Rides (${bookings.length})` : "Active Ride"
      },
      t
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-4 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      tab === "available" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          className: "space-y-3",
          children: bookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center",
              "data-ocid": "driver_dashboard.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-12 h-12 mx-auto mb-3 text-white/30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50", children: "No available rides right now" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm mt-1", children: "New bookings will appear here" })
              ]
            }
          ) : bookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, scale: 0.9 },
              transition: { delay: idx * 0.05 },
              className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4",
              "data-ocid": `driver_dashboard.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: booking.rider }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: booking.eta })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-400 font-bold text-lg", children: [
                      "₹",
                      booking.fare
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: booking.distance })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 truncate", children: booking.pickup })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-orange-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 truncate", children: booking.drop })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs mb-3", children: booking.vehicle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => handleReject(booking.id),
                      variant: "outline",
                      size: "sm",
                      className: "flex-1 border-red-400/40 text-red-400 hover:bg-red-500/10 rounded-xl",
                      "data-ocid": `driver_dashboard.delete_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mr-1" }),
                        " Reject"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => handleAccept(booking),
                      size: "sm",
                      className: "flex-1 bg-green-600 hover:bg-green-500 text-white rounded-xl",
                      "data-ocid": `driver_dashboard.primary_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-1" }),
                        " Accept"
                      ]
                    }
                  )
                ] })
              ]
            },
            booking.id
          ))
        },
        "available"
      ),
      tab === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20 },
          children: !activeRide ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center",
              "data-ocid": "driver_dashboard.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-12 h-12 mx-auto mb-3 text-white/30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50", children: "No active ride" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm mt-1", children: "Accept a ride to see it here" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              className: "space-y-3",
              "data-ocid": "driver_dashboard.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-sm px-4 py-1.5 ${activeRide.status === "completed" ? "bg-green-500/20 text-green-300 border-green-500/30" : activeRide.status === "ongoing" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-orange-500/20 text-orange-300 border-orange-500/30"}`,
                    children: activeRide.status === "completed" ? "✅ Ride Completed" : activeRide.status === "ongoing" ? "🚗 Ride In Progress" : "⏳ Heading to Pickup"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base", children: activeRide.rider }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: activeRide.vehicle })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:+91${activeRide.phone}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center",
                        "data-ocid": "driver_dashboard.button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-green-400" })
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: activeRide.pickup })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-[5px] h-4 border-l border-dashed border-white/20" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: activeRide.drop })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs font-semibold uppercase tracking-wide mb-2", children: "Fare Breakdown" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Rider Pays" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-medium", children: [
                      "₹",
                      activeRide.fare + 10
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Platform Fee (15%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-orange-400 text-xs", children: [
                      "-₹",
                      Math.round(activeRide.fare * 0.15)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/20 pt-2 flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-300 font-bold", children: "Your Earning" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-black text-xl", children: [
                      "₹",
                      Math.round(activeRide.fare * 0.85)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs", children: "After 15% platform fee deducted" })
                ] }),
                activeRide.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleStartRide,
                    className: "w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-2xl py-4 h-auto",
                    "data-ocid": "driver_dashboard.primary_button",
                    children: "🚗 Start Ride"
                  }
                ),
                activeRide.status === "ongoing" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleCompleteRide,
                    className: "w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl py-4 h-auto",
                    "data-ocid": "driver_dashboard.primary_button",
                    children: "✅ Complete Ride"
                  }
                ),
                activeRide.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center",
                    "data-ocid": "driver_dashboard.success_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-green-400 mx-auto mb-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-green-300", children: "Ride Completed!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm mt-1", children: "Earnings added to your wallet" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => ue.error("🚨 SOS alert sent to emergency contacts!"),
                    className: "w-full bg-red-600/20 border border-red-500/40 text-red-400 font-bold rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-red-600/30 transition-colors",
                    "data-ocid": "driver_dashboard.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
                      " SOS Emergency"
                    ]
                  }
                )
              ]
            }
          )
        },
        "active"
      )
    ] }) })
  ] });
}
export {
  DriverDashboardPage as default
};
