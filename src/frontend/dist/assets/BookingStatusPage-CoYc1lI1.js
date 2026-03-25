import { c as createLucideIcon, u as useSearch, o as useNavigate, r as reactExports, j as jsxRuntimeExports, aa as Link, n as Button, B as Badge, m as motion, M as MapPin, v as Clock, d as Car, N as Navigation, t as CircleCheck, Z as Zap, g as getAllBookings } from "./index-Cc0Aimdo.js";
import { A as ArrowLeft } from "./arrow-left-BYLEW8oE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
const STATUS_STEPS = [
  { key: "pending", label: "Pending", icon: Clock, desc: "Waiting for driver" },
  { key: "accepted", label: "Accepted", icon: Car, desc: "Driver on the way" },
  {
    key: "ongoing",
    label: "Ongoing",
    icon: Navigation,
    desc: "Ride in progress"
  },
  {
    key: "completed",
    label: "Completed",
    icon: CircleCheck,
    desc: "Arrived safely"
  }
];
const STATUS_ORDER = ["pending", "accepted", "ongoing", "completed"];
const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  accepted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  ongoing: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  completed: "bg-green-500/20 text-green-300 border-green-500/30"
};
function BookingStatusPage() {
  const { bookingId } = useSearch({ from: "/booking-status" });
  const navigate = useNavigate();
  const [booking, setBooking] = reactExports.useState(null);
  const [notFound, setNotFound] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!bookingId) {
      navigate({ to: "/my-bookings" });
    }
  }, [bookingId, navigate]);
  reactExports.useEffect(() => {
    if (!bookingId) return;
    const load = () => {
      const all = getAllBookings();
      const found = all.find((b) => b.bookingId === bookingId);
      if (found) {
        setBooking(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    };
    load();
    const interval = setInterval(load, 3e3);
    return () => clearInterval(interval);
  }, [bookingId]);
  const currentStepIndex = booking ? STATUS_ORDER.indexOf(booking.status) : -1;
  if (notFound) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-10 h-10 text-white/30" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: "Booking Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 mb-6", children: [
        "We couldn't find booking",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-white/80", children: bookingId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-blue-600 hover:bg-blue-500 text-white rounded-xl", children: "Go Home" }) })
    ] }) });
  }
  if (!booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/50 text-sm animate-pulse", children: "Loading..." }) });
  }
  const date = new Date(booking.time).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/my-bookings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "p-2 rounded-xl hover:bg-white/10 transition-colors",
          "data-ocid": "booking_status.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold tracking-tight", children: "Booking Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs font-mono", children: booking.bookingId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          className: `text-xs capitalize ${statusColors[booking.status] || ""}`,
          children: booking.status
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 space-y-4 max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4",
          "data-ocid": "booking_status.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs font-semibold uppercase tracking-wide mb-3", children: "Route" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-green-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40", children: "Pickup" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: booking.pickup })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-4 h-4 border-l-2 border-dashed border-white/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-orange-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40", children: "Drop-off" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: booking.drop })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mb-1", children: "Vehicle" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold capitalize text-sm", children: booking.vehicle })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mb-1", children: "Fare" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-green-400 text-sm", children: [
                  "₹",
                  booking.fare
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mb-1", children: "Rider" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate", children: booking.userName })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-white/10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: date }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5",
          "data-ocid": "booking_status.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs font-semibold uppercase tracking-wide mb-5", children: "Live Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isFuture = idx > currentStepIndex;
              const Icon = step.icon;
              const isLast = idx === STATUS_STEPS.length - 1;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-orange-500 text-white ring-4 ring-orange-500/30" : "bg-white/10 text-white/30"}`,
                      children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Icon,
                        {
                          className: `w-5 h-5 ${isFuture ? "opacity-40" : ""}`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `font-semibold text-sm ${isCompleted ? "text-green-300" : isCurrent ? "text-orange-300" : "text-white/30"}`,
                        children: step.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-xs ${isCompleted ? "text-green-300/60" : isCurrent ? "text-orange-300/70" : "text-white/20"}`,
                        children: step.desc
                      }
                    )
                  ] }),
                  isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce",
                        style: { animationDelay: "0ms" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce",
                        style: { animationDelay: "150ms" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce",
                        style: { animationDelay: "300ms" }
                      }
                    )
                  ] })
                ] }),
                !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `ml-5 h-6 w-0.5 ${idx < currentStepIndex ? "bg-green-500" : "bg-white/10"}`
                  }
                )
              ] }, step.key);
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-white/30 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status updates automatically every 3 seconds" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/my-bookings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl",
          "data-ocid": "booking_status.secondary_button",
          children: "View All Bookings"
        }
      ) })
    ] })
  ] });
}
export {
  BookingStatusPage as default
};
