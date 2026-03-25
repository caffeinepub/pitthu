import { c as createLucideIcon, p as useAuth, r as reactExports, n as getAllBookings, j as jsxRuntimeExports, a9 as Link, s as RefreshCw, ag as Wallet, d as Car, h as Star, m as motion, A as AnimatePresence, B as Badge, l as Button, M as MapPin, i as ue, y as TriangleAlert, w as updateBookingStatus } from "./index-Db1Rp7NX.js";
import { A as ArrowLeft } from "./arrow-left-Dwr1tnMi.js";
import { C as CircleCheckBig } from "./circle-check-big-BcP4BYH-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function DriverDashboardPage() {
  var _a;
  const { user } = useAuth();
  const [tab, setTab] = reactExports.useState("available");
  const [pendingBookings, setPendingBookings] = reactExports.useState([]);
  const [activeBookings, setActiveBookings] = reactExports.useState([]);
  const [rejectedIds, setRejectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const loadBookings = reactExports.useCallback(() => {
    const all = getAllBookings();
    const pending = all.filter(
      (b) => b.status === "pending" && !rejectedIds.has(b.bookingId)
    );
    const active = all.filter(
      (b) => b.status === "accepted" || b.status === "ongoing"
    );
    setPendingBookings(pending);
    setActiveBookings(active);
  }, [rejectedIds]);
  reactExports.useEffect(() => {
    loadBookings();
  }, [loadBookings]);
  const handleAccept = (booking) => {
    updateBookingStatus(booking.bookingId, "accepted");
    ue.success(`Ride accepted! Heading to ${booking.pickup}`);
    loadBookings();
    setTab("myrides");
  };
  const handleReject = (bookingId) => {
    setRejectedIds((prev) => /* @__PURE__ */ new Set([...prev, bookingId]));
    ue.info("Ride rejected.");
  };
  const handleStartRide = (bookingId) => {
    updateBookingStatus(bookingId, "ongoing");
    ue.success("Ride started! Drive safely 🚗");
    loadBookings();
  };
  const handleCompleteRide = (booking) => {
    updateBookingStatus(booking.bookingId, "completed");
    ue.success(
      `Ride completed! You earned ₹${Math.round(booking.fare * 0.85)} 🎉`
    );
    loadBookings();
  };
  const driverName = (user == null ? void 0 : user.name) || `Driver ${((_a = user == null ? void 0 : user.phone) == null ? void 0 : _a.slice(-4)) || ""}`;
  const initials = driverName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "DR";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: driverName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: loadBookings,
          className: "p-2 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white",
          "data-ocid": "driver_dashboard.button",
          "aria-label": "Refresh bookings",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold text-sm", children: initials })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 grid grid-cols-3 gap-3", children: [
      {
        icon: Wallet,
        label: "Today (After 15% fee)",
        value: "₹0",
        color: "text-green-400"
      },
      {
        icon: Car,
        label: "Available",
        value: String(pendingBookings.length),
        color: "text-blue-400"
      },
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-4 flex gap-2", children: ["available", "myrides"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setTab(t),
        "data-ocid": "driver_dashboard.tab",
        className: `flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg" : "bg-white/10 text-white/60 hover:bg-white/15"}`,
        children: t === "available" ? `Available (${pendingBookings.length})` : `My Rides (${activeBookings.length})`
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
          children: pendingBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
          ) : pendingBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: booking.userName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: booking.phone })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-400 font-bold text-lg", children: [
                      "₹",
                      booking.fare
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs capitalize", children: booking.vehicle })
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
                      onClick: () => handleReject(booking.bookingId),
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
            booking.bookingId
          ))
        },
        "available"
      ),
      tab === "myrides" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20 },
          className: "space-y-3",
          children: activeBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center",
              "data-ocid": "driver_dashboard.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-12 h-12 mx-auto mb-3 text-white/30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50", children: "No active rides" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm mt-1", children: "Accept a ride to see it here" })
              ]
            }
          ) : activeBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              className: "space-y-3",
              "data-ocid": `driver_dashboard.card.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-sm px-4 py-1.5 ${booking.status === "ongoing" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-orange-500/20 text-orange-300 border-orange-500/30"}`,
                    children: booking.status === "ongoing" ? "🚗 Ride In Progress" : "⏳ Heading to Pickup"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base", children: booking.userName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs capitalize", children: booking.vehicle })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          window.location.href = `tel:${booking.phone}`;
                        },
                        className: "w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center",
                        "data-ocid": `driver_dashboard.button.${idx + 1}`,
                        "aria-label": `Call ${booking.userName}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-green-400" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: booking.pickup })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-[5px] h-4 border-l border-dashed border-white/20" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: booking.drop })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs font-semibold uppercase tracking-wide mb-2", children: "Fare Breakdown" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Rider Pays" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-medium", children: [
                      "₹",
                      booking.fare + 10
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Platform Fee (15%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-orange-400 text-xs", children: [
                      "-₹",
                      Math.round(booking.fare * 0.15)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/20 pt-2 flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-300 font-bold", children: "Your Earning" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-black text-xl", children: [
                      "₹",
                      Math.round(booking.fare * 0.85)
                    ] })
                  ] })
                ] }),
                booking.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => handleStartRide(booking.bookingId),
                    className: "w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-2xl py-4 h-auto",
                    "data-ocid": `driver_dashboard.primary_button.${idx + 1}`,
                    children: "🚗 Start Ride"
                  }
                ),
                booking.status === "ongoing" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => handleCompleteRide(booking),
                    className: "w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl py-4 h-auto",
                    "data-ocid": `driver_dashboard.primary_button.${idx + 1}`,
                    children: "✅ Complete Ride"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => ue.error("🚨 SOS alert sent to emergency contacts!"),
                    className: "w-full bg-red-600/20 border border-red-500/40 text-red-400 font-bold rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-red-600/30 transition-colors",
                    "data-ocid": `driver_dashboard.button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
                      " SOS Emergency"
                    ]
                  }
                )
              ]
            },
            booking.bookingId
          ))
        },
        "myrides"
      )
    ] }) })
  ] });
}
export {
  DriverDashboardPage as default
};
