import { c as createLucideIcon, g as getAllBookings, o as useNavigate, p as useAuth, r as reactExports, j as jsxRuntimeExports, n as Button, q as ChevronLeft, s as RefreshCw, e as Card, f as CardContent, t as CircleCheck, U as User, d as Car, v as Clock, M as MapPin, N as Navigation, w as updateBookingStatus, Z as Zap, x as getAllUsers } from "./index-BdPBuX-3.js";
import { P as Phone } from "./phone-CwNK4gQ5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function getEarningsSummary() {
  const completed = getAllBookings().filter((b) => b.status === "completed");
  let totalRevenue = 0;
  let totalAdminEarnings = 0;
  let totalDriverEarnings = 0;
  let totalCommission = 0;
  let totalConvenienceFees = 0;
  for (const booking of completed) {
    const commissionFee = booking.commissionFee ?? Math.round(booking.fare * 0.15);
    const convenienceFee = booking.convenienceFee ?? 10;
    const driverEarnings = booking.driverEarnings ?? booking.fare - commissionFee;
    const adminEarnings = booking.adminEarnings ?? commissionFee + convenienceFee;
    totalRevenue += booking.fare + convenienceFee;
    totalCommission += commissionFee;
    totalConvenienceFees += convenienceFee;
    totalAdminEarnings += adminEarnings;
    totalDriverEarnings += driverEarnings;
  }
  return {
    totalRevenue,
    totalAdminEarnings,
    totalDriverEarnings,
    totalCommission,
    totalConvenienceFees,
    completedRides: completed.length
  };
}
const STATUS_LABELS = {
  pending: "Pending",
  accepted: "Accepted",
  ongoing: "Ongoing",
  completed: "Completed"
};
const STATUS_COLORS = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  accepted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ongoing: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
};
const NEXT_STATUS = {
  pending: "accepted",
  accepted: "ongoing",
  ongoing: "completed"
};
const ACTION_LABELS = {
  pending: "Accept",
  accepted: "Start Ride",
  ongoing: "Complete Ride"
};
const ACTION_COLORS = {
  pending: "bg-blue-600 hover:bg-blue-500",
  accepted: "bg-orange-500 hover:bg-orange-400",
  ongoing: "bg-emerald-600 hover:bg-emerald-500"
};
const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" }
];
function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return iso;
  }
}
function AdminPage() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [bookings, setBookings] = reactExports.useState([]);
  const [filter, setFilter] = reactExports.useState("all");
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [updating, setUpdating] = reactExports.useState(null);
  const load = reactExports.useCallback(() => setBookings(getAllBookings()), []);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  reactExports.useEffect(() => {
    const id = setInterval(load, 5e3);
    return () => clearInterval(id);
  }, [load]);
  reactExports.useEffect(() => {
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [load]);
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center gap-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-16 h-16 text-red-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-center", children: "You don't have permission to view this page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => navigate({ to: "/" }),
          className: "bg-blue-600 hover:bg-blue-500 text-white rounded-xl",
          children: "Go Home"
        }
      )
    ] });
  }
  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    ongoing: bookings.filter((b) => b.status === "ongoing").length,
    completed: bookings.filter((b) => b.status === "completed").length
  };
  const handleStatusUpdate = async (bookingId, current) => {
    const next = NEXT_STATUS[current];
    if (!next) return;
    setUpdating(bookingId);
    updateBookingStatus(bookingId, next);
    load();
    setUpdating(null);
  };
  const tabs = [
    { label: "Overview", value: "overview", activeColor: "bg-violet-600" },
    { label: "Bookings", value: "bookings", activeColor: "bg-blue-600" },
    { label: "Earnings", value: "earnings", activeColor: "bg-emerald-600" },
    { label: "Users", value: "users", activeColor: "bg-blue-500" },
    { label: "Drivers", value: "drivers", activeColor: "bg-orange-500" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/" }),
              className: "w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-white text-lg leading-tight", children: "Admin Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 text-xs", children: [
              bookings.length,
              " total booking",
              bookings.length !== 1 ? "s" : ""
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: load,
            className: "w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors",
            "aria-label": "Refresh",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 flex gap-1", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab.value),
          "data-ocid": "admin.tab",
          className: `px-5 py-2 text-sm font-semibold rounded-t-lg transition-all ${activeTab === tab.value ? `${tab.activeColor} text-white` : "bg-white/10 text-slate-300 hover:bg-white/20"}`,
          children: tab.label
        },
        tab.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 space-y-6", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, { bookings, counts }),
      activeTab === "earnings" && /* @__PURE__ */ jsxRuntimeExports.jsx(EarningsTab, {}),
      (activeTab === "users" || activeTab === "drivers") && /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, { filterDrivers: activeTab === "drivers" }),
      activeTab === "bookings" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
          "pending",
          "accepted",
          "ongoing",
          "completed"
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: `border cursor-pointer transition-all ${filter === s ? "ring-2 ring-blue-500 border-blue-500/50" : "border-white/10 hover:border-white/20"} bg-white/5`,
            onClick: () => setFilter(s),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs uppercase tracking-wider", children: STATUS_LABELS[s] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-2xl font-bold mt-1", children: counts[s] })
            ] })
          },
          s
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none", children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setFilter(tab.value),
            className: `flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === tab.value ? "bg-blue-600 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"}`,
            children: [
              tab.label,
              counts[tab.value] > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === tab.value ? "bg-white/20" : "bg-white/10"}`,
                  children: counts[tab.value]
                }
              )
            ]
          },
          tab.value
        )) }),
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 gap-3",
            "data-ocid": "admin.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-slate-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400", children: [
                "No ",
                filter === "all" ? "" : filter,
                " bookings yet"
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border border-white/10 bg-white/5 hover:bg-white/8 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_COLORS[booking.status]}`,
                      children: STATUS_LABELS[booking.status]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 text-xs", children: [
                    "#",
                    booking.bookingId
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-slate-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: booking.userName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-slate-300", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-slate-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: booking.phone })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-slate-300", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-3.5 h-3.5 text-slate-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: booking.vehicle })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-slate-300", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-slate-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(booking.time) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-3 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 uppercase tracking-wider", children: "Pickup" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white", children: booking.pickup })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 uppercase tracking-wider", children: "Drop" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white", children: booking.drop })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-sm", children: "Fare" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-semibold", children: [
                    "₹",
                    booking.fare.toLocaleString("en-IN")
                  ] })
                ] })
              ] }),
              NEXT_STATUS[booking.status] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex sm:flex-col gap-2 sm:min-w-[120px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => handleStatusUpdate(
                      booking.bookingId,
                      booking.status
                    ),
                    disabled: updating === booking.bookingId,
                    "data-ocid": "admin.primary_button",
                    className: `flex-1 sm:flex-none text-white rounded-xl text-sm font-semibold ${ACTION_COLORS[booking.status]}`,
                    children: ACTION_LABELS[booking.status]
                  }
                ),
                (booking.status === "accepted" || booking.status === "ongoing") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => navigate({
                      to: "/trip-tracking",
                      search: { bookingId: booking.bookingId }
                    }),
                    "data-ocid": "admin.secondary_button",
                    className: "flex-1 sm:flex-none rounded-xl text-sm font-semibold border border-blue-500 text-blue-400 bg-transparent hover:bg-blue-500/10",
                    variant: "outline",
                    children: "Track"
                  }
                )
              ] })
            ] }) })
          },
          booking.bookingId
        )) })
      ] })
    ] })
  ] });
}
function OverviewTab({
  bookings,
  counts
}) {
  const summary = getEarningsSummary();
  const activeCount = counts.pending + counts.accepted + counts.ongoing;
  const statCards = [
    {
      label: "Total Earnings",
      value: `₹${summary.totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
      border: "border-emerald-500/20"
    },
    {
      label: "Total Rides",
      value: bookings.length.toString(),
      icon: Car,
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
      border: "border-blue-500/20"
    },
    {
      label: "Active Bookings",
      value: activeCount.toString(),
      icon: Activity,
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-400",
      border: "border-orange-500/20"
    },
    {
      label: "Completed Rides",
      value: counts.completed.toString(),
      icon: CircleCheck,
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-400",
      border: "border-purple-500/20"
    }
  ];
  const recentBookings = [...bookings].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: statCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border ${card.border} bg-white/5`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: `w-4 h-4 ${card.iconColor}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs leading-tight", children: card.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-black ${card.iconColor}`, children: card.value })
    ] }) }, card.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-white/10 bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm uppercase tracking-wider", children: "Earnings Snapshot" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mb-1", children: "Total Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-emerald-400 text-xl font-black", children: [
            "₹",
            summary.totalRevenue.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mb-1", children: "Platform Commission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-400 text-xl font-black", children: [
            "₹",
            summary.totalCommission.toLocaleString("en-IN")
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-slate-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm uppercase tracking-wider", children: "Recent Bookings" })
      ] }),
      recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-12 gap-3",
          "data-ocid": "admin.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-10 h-10 text-slate-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "No bookings yet" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recentBookings.map((b, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border border-white/10 bg-white/5",
          "data-ocid": `admin.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-sm font-medium truncate", children: b.userName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${STATUS_COLORS[b.status]}`,
                    children: STATUS_LABELS[b.status]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 text-xs truncate", children: [
                b.pickup,
                " → ",
                b.drop
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs capitalize", children: b.vehicle })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-bold text-sm", children: [
              "₹",
              b.fare.toLocaleString("en-IN")
            ] }) })
          ] }) })
        },
        b.bookingId
      )) })
    ] })
  ] });
}
function UsersTab({ filterDrivers }) {
  const users = getAllUsers().filter(
    (u) => !filterDrivers || u.role === "driver"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white font-montserrat font-bold text-lg mb-4", children: [
      filterDrivers ? "Drivers" : "All Users",
      " (",
      users.length,
      ")"
    ] }),
    users.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-slate-400 text-center py-10",
        "data-ocid": "admin.empty_state",
        children: [
          "No ",
          filterDrivers ? "drivers" : "users",
          " found."
        ]
      }
    ),
    users.map((u, i) => {
      var _a;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "bg-slate-800 border-white/10",
          "data-ocid": `admin.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm", children: ((_a = u.name) == null ? void 0 : _a.slice(0, 2).toUpperCase()) || "?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold", children: u.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 text-sm flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                  " ",
                  u.phone
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `px-2 py-1 rounded text-xs font-bold ${u.role === "admin" ? "bg-violet-600 text-white" : u.role === "driver" ? "bg-orange-500 text-white" : "bg-blue-500 text-white"}`,
                  children: u.role.toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs mt-1", children: new Date(u.createdAt).toLocaleDateString() })
            ] })
          ] }) })
        },
        u.userId
      );
    })
  ] });
}
function EarningsTab() {
  const summary = getEarningsSummary();
  const completedBookings = getAllBookings().filter(
    (b) => b.status === "completed"
  );
  const cards = [
    {
      label: "Total Revenue",
      value: summary.totalRevenue,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      label: "Platform Commission",
      value: summary.totalCommission,
      icon: DollarSign,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      label: "Driver Payouts",
      value: summary.totalDriverEarnings,
      icon: Car,
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20"
    },
    {
      label: "Convenience Fees",
      value: summary.totalConvenienceFees,
      icon: CircleCheck,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border ${c.bg} bg-white/5`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: `w-4 h-4 ${c.color}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: c.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-xl font-black ${c.color}`, children: [
        "₹",
        c.value.toLocaleString("en-IN")
      ] })
    ] }) }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-300 text-sm font-semibold", children: [
      "Completed Rides: ",
      summary.completedRides
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-3 uppercase tracking-wider", children: "Per-Ride Breakdown" }),
      completedBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 gap-3",
          "data-ocid": "admin.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-12 h-12 text-slate-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "No completed rides yet" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: completedBookings.map((b, idx) => {
        const commission = b.commissionFee ?? Math.round(b.fare * 0.15);
        const convenience = b.convenienceFee ?? 10;
        const driver = b.driverEarnings ?? b.fare - commission - convenience;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border border-white/10 bg-white/5",
            "data-ocid": `admin.row.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: b.userName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 text-xs", children: [
                    "#",
                    b.bookingId
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs text-slate-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: b.vehicle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    b.pickup,
                    " → ",
                    b.drop
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: "Fare Paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-bold", children: [
                    "₹",
                    b.fare + convenience
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: "Commission" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-400 font-bold", children: [
                    "₹",
                    commission
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: "Driver Gets" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-emerald-400 font-bold", children: [
                    "₹",
                    driver
                  ] })
                ] })
              ] })
            ] }) })
          },
          b.bookingId
        );
      }) })
    ] })
  ] });
}
export {
  AdminPage as default
};
