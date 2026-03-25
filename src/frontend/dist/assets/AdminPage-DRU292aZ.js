import { c as createLucideIcon, n as useActor, r as reactExports, o as useQuery, j as jsxRuntimeExports, p as Skeleton, m as motion, L as Link, l as Button, q as BookOpen, d as Car, Z as Zap, s as CircleCheck, I as Input, t as ChevronDown, h as Star } from "./index-hZrb6ubp.js";
import { C as CircleX } from "./circle-x-C_TT87I_.js";
import { A as ArrowLeft } from "./arrow-left-DLIXcLlj.js";
import { U as Users } from "./users-DPXJiKuX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$3);
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
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
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
const COMMISSION_RATE = 0.15;
const CONVENIENCE_FEE = 10;
const MOCK_BOOKINGS = [
  {
    id: "PIT-1042",
    rider: "Rahul Sharma",
    phone: "98765 43210",
    pickup: "Rishikesh Bus Stand",
    drop: "Haridwar Railway Station",
    vehicle: "Sedan",
    baseFare: 380,
    status: "completed",
    driver: "Deepak Rawat",
    time: "10:24 AM"
  },
  {
    id: "PIT-1041",
    rider: "Priya Negi",
    phone: "98123 45678",
    pickup: "Mussoorie Mall Road",
    drop: "Dehradun Airport",
    vehicle: "SUV",
    baseFare: 850,
    status: "ongoing",
    driver: "Mohan Bisht",
    time: "10:18 AM"
  },
  {
    id: "PIT-1040",
    rider: "Vikram Rawat",
    phone: "97654 32109",
    pickup: "AIIMS Rishikesh",
    drop: "Jolly Grant Airport",
    vehicle: "Hatchback",
    baseFare: 420,
    status: "pending",
    driver: null,
    time: "10:05 AM"
  },
  {
    id: "PIT-1039",
    rider: "Anjali Bisht",
    phone: "96543 21098",
    pickup: "Kedarnath Temple Road",
    drop: "Guptkashi",
    vehicle: "Alto",
    baseFare: 310,
    status: "completed",
    driver: "Suresh Rana",
    time: "09:50 AM"
  },
  {
    id: "PIT-1038",
    rider: "Neeraj Joshi",
    phone: "95432 10987",
    pickup: "Nainital Bus Stand",
    drop: "Kathgodam Station",
    vehicle: "Bike",
    baseFare: 180,
    status: "cancelled",
    driver: null,
    time: "09:32 AM"
  },
  {
    id: "PIT-1037",
    rider: "Sunita Panwar",
    phone: "94321 09876",
    pickup: "Badrinath Temple",
    drop: "Joshimath",
    vehicle: "SUV",
    baseFare: 920,
    status: "completed",
    driver: "Ramesh Tiwari",
    time: "09:15 AM"
  },
  {
    id: "PIT-1036",
    rider: "Arun Kumar",
    phone: "93210 98765",
    pickup: "Haridwar Har ki Pauri",
    drop: "Rishikesh Laxman Jhula",
    vehicle: "Scooty",
    baseFare: 150,
    status: "ongoing",
    driver: "Kamal Singh",
    time: "08:58 AM"
  },
  {
    id: "PIT-1035",
    rider: "Meera Devi",
    phone: "92109 87654",
    pickup: "Dehradun Clock Tower",
    drop: "Sahastradhara",
    vehicle: "Hatchback",
    baseFare: 280,
    status: "pending",
    driver: null,
    time: "08:42 AM"
  },
  {
    id: "PIT-1034",
    rider: "Sudhir Pokhriyal",
    phone: "91098 76543",
    pickup: "Lansdowne Market",
    drop: "Kotdwar",
    vehicle: "Sedan",
    baseFare: 450,
    status: "completed",
    driver: "Deepak Rawat",
    time: "08:20 AM"
  },
  {
    id: "PIT-1033",
    rider: "Kavita Chamoli",
    phone: "90987 65432",
    pickup: "Almora Bus Stand",
    drop: "Ranikhet",
    vehicle: "Alto",
    baseFare: 340,
    status: "completed",
    driver: "Suresh Rana",
    time: "07:55 AM"
  },
  {
    id: "PIT-1032",
    rider: "Bhavesh Uniyal",
    phone: "89876 54321",
    pickup: "Pithoragarh Town",
    drop: "Munsyari",
    vehicle: "SUV",
    baseFare: 1200,
    status: "completed",
    driver: "Mohan Bisht",
    time: "07:30 AM"
  },
  {
    id: "PIT-1031",
    rider: "Ritu Gusain",
    phone: "88765 43210",
    pickup: "Tehri Dam View",
    drop: "New Tehri Town",
    vehicle: "Sedan",
    baseFare: 320,
    status: "cancelled",
    driver: null,
    time: "07:10 AM"
  },
  {
    id: "PIT-1030",
    rider: "Dinesh Nautiyal",
    phone: "87654 32109",
    pickup: "Uttarkashi Bus Stand",
    drop: "Gangotri Temple",
    vehicle: "SUV",
    baseFare: 780,
    status: "ongoing",
    driver: "Ramesh Tiwari",
    time: "06:45 AM"
  },
  {
    id: "PIT-1029",
    rider: "Pooja Kandpal",
    phone: "86543 21098",
    pickup: "Bageshwar Town",
    drop: "Kausani Viewpoint",
    vehicle: "Sedan",
    baseFare: 490,
    status: "completed",
    driver: "Kamal Singh",
    time: "06:20 AM"
  },
  {
    id: "PIT-1028",
    rider: "Harish Semwal",
    phone: "85432 10987",
    pickup: "Chamoli Bus Stand",
    drop: "Valley of Flowers",
    vehicle: "Hatchback",
    baseFare: 620,
    status: "completed",
    driver: "Deepak Rawat",
    time: "05:50 AM"
  }
];
const MOCK_USERS = [
  {
    name: "Rahul Sharma",
    phone: "98765 43210",
    rides: 24,
    spent: 8420,
    lastActive: "2 min ago",
    status: "active"
  },
  {
    name: "Priya Negi",
    phone: "98123 45678",
    rides: 18,
    spent: 12600,
    lastActive: "8 min ago",
    status: "active"
  },
  {
    name: "Vikram Rawat",
    phone: "97654 32109",
    rides: 9,
    spent: 3890,
    lastActive: "1 hr ago",
    status: "active"
  },
  {
    name: "Anjali Bisht",
    phone: "96543 21098",
    rides: 31,
    spent: 15200,
    lastActive: "3 hrs ago",
    status: "active"
  },
  {
    name: "Neeraj Joshi",
    phone: "95432 10987",
    rides: 6,
    spent: 1840,
    lastActive: "1 day ago",
    status: "inactive"
  },
  {
    name: "Sunita Panwar",
    phone: "94321 09876",
    rides: 42,
    spent: 28900,
    lastActive: "5 min ago",
    status: "active"
  },
  {
    name: "Arun Kumar",
    phone: "93210 98765",
    rides: 15,
    spent: 5670,
    lastActive: "30 min ago",
    status: "active"
  },
  {
    name: "Meera Devi",
    phone: "92109 87654",
    rides: 3,
    spent: 980,
    lastActive: "2 days ago",
    status: "inactive"
  },
  {
    name: "Sudhir Pokhriyal",
    phone: "91098 76543",
    rides: 28,
    spent: 11400,
    lastActive: "15 min ago",
    status: "active"
  },
  {
    name: "Kavita Chamoli",
    phone: "90987 65432",
    rides: 11,
    spent: 4320,
    lastActive: "45 min ago",
    status: "active"
  }
];
const MOCK_DRIVERS = [
  {
    name: "Deepak Rawat",
    vehicle: "Swift Dzire (UK-07 AB 1234)",
    rating: 4.9,
    todayRides: 6,
    todayEarnings: 1854,
    totalRides: 842,
    totalEarnings: 287400,
    status: "online"
  },
  {
    name: "Mohan Bisht",
    vehicle: "Innova Crysta (UK-07 CD 5678)",
    rating: 4.8,
    todayRides: 4,
    todayEarnings: 2448,
    totalRides: 621,
    totalEarnings: 218900,
    status: "online"
  },
  {
    name: "Suresh Rana",
    vehicle: "Maruti Alto (UK-07 EF 9012)",
    rating: 4.7,
    todayRides: 5,
    todayEarnings: 1241,
    totalRides: 503,
    totalEarnings: 178600,
    status: "online"
  },
  {
    name: "Ramesh Tiwari",
    vehicle: "Tata Nexon EV (UK-07 GH 3456)",
    rating: 4.9,
    todayRides: 3,
    todayEarnings: 1479,
    totalRides: 389,
    totalEarnings: 142300,
    status: "online"
  },
  {
    name: "Kamal Singh",
    vehicle: "Hero Splendor (UK-07 IJ 7890)",
    rating: 4.6,
    todayRides: 7,
    todayEarnings: 892,
    totalRides: 1204,
    totalEarnings: 198700,
    status: "online"
  },
  {
    name: "Prakash Negi",
    vehicle: "Maruti Ertiga (UK-07 KL 1234)",
    rating: 4.5,
    todayRides: 0,
    todayEarnings: 0,
    totalRides: 276,
    totalEarnings: 98400,
    status: "offline"
  },
  {
    name: "Girish Bhatt",
    vehicle: "Activa 6G (UK-07 MN 5678)",
    rating: 4.8,
    todayRides: 0,
    todayEarnings: 0,
    totalRides: 432,
    totalEarnings: 134200,
    status: "offline"
  },
  {
    name: "Vinod Juyal",
    vehicle: "Baleno Sigma (UK-07 OP 9012)",
    rating: 4.7,
    todayRides: 2,
    todayEarnings: 578,
    totalRides: 187,
    totalEarnings: 64800,
    status: "online"
  }
];
const REVENUE_7DAYS = [
  { day: "Mon", amount: 8420 },
  { day: "Tue", amount: 11200 },
  { day: "Wed", amount: 9800 },
  { day: "Thu", amount: 14600 },
  { day: "Fri", amount: 18200 },
  { day: "Sat", amount: 22400 },
  { day: "Sun", amount: 16800 }
];
const DRIVERS_LIST = MOCK_DRIVERS.map((d) => d.name);
const statusConfig = {
  pending: {
    color: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    label: "Pending"
  },
  ongoing: {
    color: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    label: "Ongoing"
  },
  completed: {
    color: "bg-green-500/20 text-green-300 border border-green-500/30",
    label: "Completed"
  },
  cancelled: {
    color: "bg-red-500/20 text-red-300 border border-red-500/30",
    label: "Cancelled"
  }
};
function calcFare(baseFare) {
  const commission = Math.round(baseFare * COMMISSION_RATE);
  const driverPayout = baseFare - commission;
  const riderPays = baseFare + CONVENIENCE_FEE;
  return { commission, driverPayout, riderPays };
}
function AdminPage() {
  const { actor, isFetching } = useActor();
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [assigningBooking, setAssigningBooking] = reactExports.useState(null);
  const [assignments, setAssignments] = reactExports.useState({});
  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching
  });
  if (checkingAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 max-w-5xl space-y-4",
        "data-ocid": "admin.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 bg-white/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl bg-white/10" })
        ]
      }
    ) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center max-w-md w-full",
        "data-ocid": "admin.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-16 h-16 text-red-400 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-2xl text-white mb-2", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60", children: "You don't have admin privileges to view this page." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "mt-6 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-xl",
              "data-ocid": "admin.button",
              children: "Go Home"
            }
          ) })
        ]
      }
    ) });
  }
  const filteredBookings = MOCK_BOOKINGS.filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchSearch = !searchQuery || b.id.toLowerCase().includes(searchQuery.toLowerCase()) || b.pickup.toLowerCase().includes(searchQuery.toLowerCase()) || b.drop.toLowerCase().includes(searchQuery.toLowerCase()) || b.rider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });
  const totalCommission = MOCK_BOOKINGS.filter(
    (b) => b.status === "completed"
  ).reduce((s, b) => s + Math.round(b.baseFare * COMMISSION_RATE), 0);
  const totalConvFees = MOCK_BOOKINGS.filter((b) => b.status === "completed").length * CONVENIENCE_FEE;
  const totalDriverPayouts = MOCK_BOOKINGS.filter(
    (b) => b.status === "completed"
  ).reduce((s, b) => s + Math.round(b.baseFare * (1 - COMMISSION_RATE)), 0);
  const maxBar = Math.max(...REVENUE_7DAYS.map((d) => d.amount));
  const TABS = [
    { id: "overview", label: "Overview", icon: ChartColumn },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "users", label: "Users", icon: Users },
    { id: "drivers", label: "Drivers", icon: Car },
    { id: "earnings", label: "Earnings", icon: DollarSign }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors",
            "data-ocid": "admin.link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 text-white" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-black tracking-tight", children: "PITTHU Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full", children: "ADMIN PANEL" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-400 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/60", children: "Live" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 pb-3 flex gap-1 overflow-x-auto scrollbar-hide", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab.id),
          "data-ocid": "admin.tab",
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-orange-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "w-3.5 h-3.5" }),
            tab.label
          ]
        },
        tab.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 pt-5", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
                "data-ocid": "admin.panel",
                children: [
                  {
                    label: "Total Bookings",
                    value: "1,284",
                    sub: "↑12% this week",
                    color: "text-blue-400",
                    icon: BookOpen
                  },
                  {
                    label: "Active Rides",
                    value: "23",
                    sub: "Live now",
                    color: "text-green-400",
                    icon: Zap
                  },
                  {
                    label: "Total Revenue",
                    value: "₹4,82,650",
                    sub: "Gross",
                    color: "text-orange-400",
                    icon: DollarSign
                  },
                  {
                    label: "Total Users",
                    value: "3,847",
                    sub: "Registered",
                    color: "text-purple-400",
                    icon: Users
                  },
                  {
                    label: "Total Drivers",
                    value: "142",
                    sub: "On platform",
                    color: "text-cyan-400",
                    icon: Car
                  },
                  {
                    label: "Completed Today",
                    value: "156",
                    sub: "Rides done",
                    color: "text-emerald-400",
                    icon: CircleCheck
                  },
                  {
                    label: "Platform Revenue",
                    value: "₹72,480",
                    sub: "15% commissions",
                    color: "text-orange-400",
                    icon: TrendingUp
                  },
                  {
                    label: "Pending Payouts",
                    value: "₹18,200",
                    sub: "To drivers",
                    color: "text-yellow-400",
                    icon: ChartColumn
                  }
                ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: i * 0.05 },
                    className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4",
                    "data-ocid": "admin.card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `w-4 h-4 mb-2 ${stat.color}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-black ${stat.color}`, children: stat.value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-xs font-medium mt-0.5", children: stat.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mt-0.5", children: stat.sub })
                    ]
                  },
                  stat.label
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-orange-400 font-semibold text-xs uppercase tracking-wide mb-3", children: "Recent Activity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin.list", children: MOCK_BOOKINGS.slice(0, 5).map((b, i) => {
                var _a, _b;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between py-2 border-b border-white/10 last:border-0",
                    "data-ocid": `admin.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-xs font-bold", children: b.rider.charAt(0) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-white", children: b.rider }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/50", children: [
                            b.pickup,
                            " → ",
                            b.drop
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `text-xs px-2 py-0.5 rounded-full ${((_a = statusConfig[b.status]) == null ? void 0 : _a.color) || ""}`,
                            children: (_b = statusConfig[b.status]) == null ? void 0 : _b.label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-orange-400 font-bold text-sm mt-0.5", children: [
                          "₹",
                          b.baseFare + CONVENIENCE_FEE
                        ] })
                      ] })
                    ]
                  },
                  b.id
                );
              }) })
            ] })
          ]
        }
      ),
      activeTab === "bookings" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["all", "pending", "ongoing", "completed", "cancelled"].map(
              (s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setStatusFilter(s),
                  "data-ocid": "admin.toggle",
                  className: `px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${statusFilter === s ? "bg-orange-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15"}`,
                  children: s
                },
                s
              )
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search by ID, rider, or location...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl",
                  "data-ocid": "admin.search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "admin.list", children: [
              filteredBookings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center text-white/50",
                  "data-ocid": "admin.empty_state",
                  children: "No bookings found"
                }
              ),
              filteredBookings.map((b, i) => {
                var _a, _b;
                const { commission, riderPays } = calcFare(b.baseFare);
                const assignedDriver = assignments[b.id] || b.driver;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: i * 0.04 },
                    className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4",
                    "data-ocid": `admin.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-orange-400 font-bold text-sm", children: [
                            "#",
                            b.id
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `ml-2 text-xs px-2 py-0.5 rounded-full ${(_a = statusConfig[b.status]) == null ? void 0 : _a.color}`,
                              children: (_b = statusConfig[b.status]) == null ? void 0 : _b.label
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-orange-400 font-black text-lg", children: [
                            "₹",
                            riderPays
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/40 text-xs", children: [
                            "Commission: ₹",
                            commission
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-white/70 mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Rider" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: b.rider }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50", children: b.phone })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Vehicle" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: b.vehicle }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50", children: b.time })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Route" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-medium truncate", children: [
                            b.pickup,
                            " → ",
                            b.drop
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: assignedDriver ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-medium", children: [
                          "👤 ",
                          assignedDriver
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Unassigned" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => setAssigningBooking(
                                assigningBooking === b.id ? null : b.id
                              ),
                              className: "flex items-center gap-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl",
                              "data-ocid": "admin.button",
                              children: [
                                "Assign Driver ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                              ]
                            }
                          ),
                          assigningBooking === b.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute right-0 top-full mt-1 bg-slate-800 border border-white/20 rounded-xl shadow-2xl z-50 min-w-[180px]",
                              "data-ocid": "admin.dropdown_menu",
                              children: DRIVERS_LIST.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    setAssignments((prev) => ({
                                      ...prev,
                                      [b.id]: d
                                    }));
                                    setAssigningBooking(null);
                                  },
                                  className: "w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 first:rounded-t-xl last:rounded-b-xl",
                                  "data-ocid": "admin.button",
                                  children: d
                                },
                                d
                              ))
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  b.id
                );
              })
            ] })
          ]
        }
      ),
      activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-orange-400 font-semibold text-xs uppercase tracking-wide", children: [
              "All Users (",
              MOCK_USERS.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin.list", children: MOCK_USERS.map((u, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.05 },
                className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4",
                "data-ocid": `admin.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold", children: u.name.charAt(0) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white", children: u.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: u.phone })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs px-2 py-0.5 rounded-full font-medium ${u.status === "active" ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-white/10 text-white/40 border border-white/20"}`,
                        children: u.status
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-2 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold", children: u.rides }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: "Rides" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-2 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-orange-400 font-bold", children: [
                        "₹",
                        u.spent.toLocaleString()
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: "Spent" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-2 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs font-medium", children: u.lastActive }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: "Last Active" })
                    ] })
                  ] })
                ]
              },
              u.phone
            )) })
          ]
        }
      ),
      activeTab === "drivers" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-orange-400 font-semibold text-xs uppercase tracking-wide", children: [
              "All Drivers (",
              MOCK_DRIVERS.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin.list", children: MOCK_DRIVERS.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.05 },
                className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4",
                "data-ocid": `admin.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center font-bold text-sm", children: d.name.charAt(0) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white", children: d.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs", children: d.vehicle })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs px-2 py-0.5 rounded-full font-medium ${d.status === "online" ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-white/10 text-white/40 border border-white/20"}`,
                          children: d.status === "online" ? "🟢 Online" : "⚪ Offline"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1 mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-orange-400 fill-orange-400" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400 font-bold text-sm", children: d.rating })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mb-1", children: "Today" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-400 font-bold", children: [
                        "₹",
                        d.todayEarnings.toLocaleString()
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-xs", children: [
                        d.todayRides,
                        " rides"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mb-1", children: "All Time" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-orange-400 font-bold", children: [
                        "₹",
                        d.totalEarnings.toLocaleString()
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-xs", children: [
                        d.totalRides,
                        " rides"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "mt-3 w-full py-2 rounded-xl bg-white/5 text-white/60 text-xs font-medium hover:bg-white/10 transition-colors",
                      "data-ocid": "admin.button",
                      children: "View Details"
                    }
                  )
                ]
              },
              d.name
            )) })
          ]
        }
      ),
      activeTab === "earnings" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
              {
                label: "Platform Revenue",
                value: `₹${totalCommission.toLocaleString()}`,
                sub: "15% commissions",
                color: "text-orange-400"
              },
              {
                label: "Convenience Fees",
                value: `₹${totalConvFees.toLocaleString()}`,
                sub: "₹10 per ride",
                color: "text-blue-400"
              },
              {
                label: "Driver Payouts",
                value: `₹${totalDriverPayouts.toLocaleString()}`,
                sub: "85% of base fare",
                color: "text-green-400"
              },
              {
                label: "Pending Payouts",
                value: "₹18,200",
                sub: "Awaiting transfer",
                color: "text-yellow-400"
              }
            ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.06 },
                className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4",
                "data-ocid": "admin.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-black ${s.color}`, children: s.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-xs font-medium mt-0.5", children: s.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: s.sub })
                ]
              },
              s.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-orange-400 font-semibold text-xs uppercase tracking-wide mb-4", children: "Revenue — Last 7 Days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-28", children: REVENUE_7DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex-1 flex flex-col items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/60 text-xs", children: [
                      "₹",
                      (d.amount / 1e3).toFixed(0),
                      "k"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-orange-500",
                        style: { height: `${d.amount / maxBar * 80}px` }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 text-xs", children: d.day })
                  ]
                },
                d.day
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 overflow-x-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-orange-400 font-semibold text-xs uppercase tracking-wide mb-3", children: "Commission Breakdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs min-w-[520px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-orange-400 font-semibold uppercase border-b border-white/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-2", children: "Booking" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2", children: "Base Fare" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2", children: "Commission (15%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2", children: "Conv. Fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-2", children: "Driver Payout" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MOCK_BOOKINGS.slice(0, 10).map((b, i) => {
                  const { commission, driverPayout } = calcFare(b.baseFare);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-white/5 last:border-0",
                      "data-ocid": `admin.row.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 font-mono text-white/70", children: [
                          "#",
                          b.id
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-white/80", children: [
                          "₹",
                          b.baseFare
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-orange-400 font-bold", children: [
                          "₹",
                          commission
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-blue-400", children: [
                          "₹",
                          CONVENIENCE_FEE
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 text-right text-green-400 font-bold", children: [
                          "₹",
                          driverPayout
                        ] })
                      ]
                    },
                    b.id
                  );
                }) })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  AdminPage as default
};
