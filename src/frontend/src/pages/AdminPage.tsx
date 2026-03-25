import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Car,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Search,
  Star,
  TrendingUp,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

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
    time: "10:24 AM",
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
    time: "10:18 AM",
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
    time: "10:05 AM",
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
    time: "09:50 AM",
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
    time: "09:32 AM",
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
    time: "09:15 AM",
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
    time: "08:58 AM",
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
    time: "08:42 AM",
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
    time: "08:20 AM",
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
    time: "07:55 AM",
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
    time: "07:30 AM",
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
    time: "07:10 AM",
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
    time: "06:45 AM",
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
    time: "06:20 AM",
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
    time: "05:50 AM",
  },
];

const MOCK_USERS = [
  {
    name: "Rahul Sharma",
    phone: "98765 43210",
    rides: 24,
    spent: 8420,
    lastActive: "2 min ago",
    status: "active",
  },
  {
    name: "Priya Negi",
    phone: "98123 45678",
    rides: 18,
    spent: 12600,
    lastActive: "8 min ago",
    status: "active",
  },
  {
    name: "Vikram Rawat",
    phone: "97654 32109",
    rides: 9,
    spent: 3890,
    lastActive: "1 hr ago",
    status: "active",
  },
  {
    name: "Anjali Bisht",
    phone: "96543 21098",
    rides: 31,
    spent: 15200,
    lastActive: "3 hrs ago",
    status: "active",
  },
  {
    name: "Neeraj Joshi",
    phone: "95432 10987",
    rides: 6,
    spent: 1840,
    lastActive: "1 day ago",
    status: "inactive",
  },
  {
    name: "Sunita Panwar",
    phone: "94321 09876",
    rides: 42,
    spent: 28900,
    lastActive: "5 min ago",
    status: "active",
  },
  {
    name: "Arun Kumar",
    phone: "93210 98765",
    rides: 15,
    spent: 5670,
    lastActive: "30 min ago",
    status: "active",
  },
  {
    name: "Meera Devi",
    phone: "92109 87654",
    rides: 3,
    spent: 980,
    lastActive: "2 days ago",
    status: "inactive",
  },
  {
    name: "Sudhir Pokhriyal",
    phone: "91098 76543",
    rides: 28,
    spent: 11400,
    lastActive: "15 min ago",
    status: "active",
  },
  {
    name: "Kavita Chamoli",
    phone: "90987 65432",
    rides: 11,
    spent: 4320,
    lastActive: "45 min ago",
    status: "active",
  },
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
    status: "online",
  },
  {
    name: "Mohan Bisht",
    vehicle: "Innova Crysta (UK-07 CD 5678)",
    rating: 4.8,
    todayRides: 4,
    todayEarnings: 2448,
    totalRides: 621,
    totalEarnings: 218900,
    status: "online",
  },
  {
    name: "Suresh Rana",
    vehicle: "Maruti Alto (UK-07 EF 9012)",
    rating: 4.7,
    todayRides: 5,
    todayEarnings: 1241,
    totalRides: 503,
    totalEarnings: 178600,
    status: "online",
  },
  {
    name: "Ramesh Tiwari",
    vehicle: "Tata Nexon EV (UK-07 GH 3456)",
    rating: 4.9,
    todayRides: 3,
    todayEarnings: 1479,
    totalRides: 389,
    totalEarnings: 142300,
    status: "online",
  },
  {
    name: "Kamal Singh",
    vehicle: "Hero Splendor (UK-07 IJ 7890)",
    rating: 4.6,
    todayRides: 7,
    todayEarnings: 892,
    totalRides: 1204,
    totalEarnings: 198700,
    status: "online",
  },
  {
    name: "Prakash Negi",
    vehicle: "Maruti Ertiga (UK-07 KL 1234)",
    rating: 4.5,
    todayRides: 0,
    todayEarnings: 0,
    totalRides: 276,
    totalEarnings: 98400,
    status: "offline",
  },
  {
    name: "Girish Bhatt",
    vehicle: "Activa 6G (UK-07 MN 5678)",
    rating: 4.8,
    todayRides: 0,
    todayEarnings: 0,
    totalRides: 432,
    totalEarnings: 134200,
    status: "offline",
  },
  {
    name: "Vinod Juyal",
    vehicle: "Baleno Sigma (UK-07 OP 9012)",
    rating: 4.7,
    todayRides: 2,
    todayEarnings: 578,
    totalRides: 187,
    totalEarnings: 64800,
    status: "online",
  },
];

const REVENUE_7DAYS = [
  { day: "Mon", amount: 8420 },
  { day: "Tue", amount: 11200 },
  { day: "Wed", amount: 9800 },
  { day: "Thu", amount: 14600 },
  { day: "Fri", amount: 18200 },
  { day: "Sat", amount: 22400 },
  { day: "Sun", amount: 16800 },
];

const DRIVERS_LIST = MOCK_DRIVERS.map((d) => d.name);

const statusConfig: Record<string, { color: string; label: string }> = {
  pending: {
    color: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    label: "Pending",
  },
  ongoing: {
    color: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    label: "Ongoing",
  },
  completed: {
    color: "bg-green-500/20 text-green-300 border border-green-500/30",
    label: "Completed",
  },
  cancelled: {
    color: "bg-red-500/20 text-red-300 border border-red-500/30",
    label: "Cancelled",
  },
};

function calcFare(baseFare: number) {
  const commission = Math.round(baseFare * COMMISSION_RATE);
  const driverPayout = baseFare - commission;
  const riderPays = baseFare + CONVENIENCE_FEE;
  return { commission, driverPayout, riderPays };
}

export default function AdminPage() {
  const { actor, isFetching } = useActor();
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "users" | "drivers" | "earnings"
  >("overview");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [assigningBooking, setAssigningBooking] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 py-12">
        <div
          className="container mx-auto px-4 max-w-5xl space-y-4"
          data-ocid="admin.loading_state"
        >
          <Skeleton className="h-8 w-48 bg-white/10" />
          <Skeleton className="h-64 w-full rounded-xl bg-white/10" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center max-w-md w-full"
          data-ocid="admin.error_state"
        >
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="font-bold text-2xl text-white mb-2">Access Denied</h2>
          <p className="text-white/60">
            You don't have admin privileges to view this page.
          </p>
          <Link to="/">
            <Button
              className="mt-6 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-xl"
              data-ocid="admin.button"
            >
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const filteredBookings = MOCK_BOOKINGS.filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchSearch =
      !searchQuery ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.drop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.rider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalCommission = MOCK_BOOKINGS.filter(
    (b) => b.status === "completed",
  ).reduce((s, b) => s + Math.round(b.baseFare * COMMISSION_RATE), 0);
  const totalConvFees =
    MOCK_BOOKINGS.filter((b) => b.status === "completed").length *
    CONVENIENCE_FEE;
  const totalDriverPayouts = MOCK_BOOKINGS.filter(
    (b) => b.status === "completed",
  ).reduce((s, b) => s + Math.round(b.baseFare * (1 - COMMISSION_RATE)), 0);
  const maxBar = Math.max(...REVENUE_7DAYS.map((d) => d.amount));

  const TABS = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "users", label: "Users", icon: Users },
    { id: "drivers", label: "Drivers", icon: Car },
    { id: "earnings", label: "Earnings", icon: DollarSign },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/">
            <button
              type="button"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
              data-ocid="admin.link"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight">
                PITTHU Admin
              </h1>
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                ADMIN PANEL
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/60">Live</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 pb-3 flex gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              data-ocid="admin.tab"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-5">
        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Stats grid */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              data-ocid="admin.panel"
            >
              {[
                {
                  label: "Total Bookings",
                  value: "1,284",
                  sub: "↑12% this week",
                  color: "text-blue-400",
                  icon: BookOpen,
                },
                {
                  label: "Active Rides",
                  value: "23",
                  sub: "Live now",
                  color: "text-green-400",
                  icon: Zap,
                },
                {
                  label: "Total Revenue",
                  value: "₹4,82,650",
                  sub: "Gross",
                  color: "text-orange-400",
                  icon: DollarSign,
                },
                {
                  label: "Total Users",
                  value: "3,847",
                  sub: "Registered",
                  color: "text-purple-400",
                  icon: Users,
                },
                {
                  label: "Total Drivers",
                  value: "142",
                  sub: "On platform",
                  color: "text-cyan-400",
                  icon: Car,
                },
                {
                  label: "Completed Today",
                  value: "156",
                  sub: "Rides done",
                  color: "text-emerald-400",
                  icon: CheckCircle2,
                },
                {
                  label: "Platform Revenue",
                  value: "₹72,480",
                  sub: "15% commissions",
                  color: "text-orange-400",
                  icon: TrendingUp,
                },
                {
                  label: "Pending Payouts",
                  value: "₹18,200",
                  sub: "To drivers",
                  color: "text-yellow-400",
                  icon: BarChart3,
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                  data-ocid="admin.card"
                >
                  <stat.icon className={`w-4 h-4 mb-2 ${stat.color}`} />
                  <p className={`text-xl font-black ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-white/80 text-xs font-medium mt-0.5">
                    {stat.label}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{stat.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <h3 className="text-orange-400 font-semibold text-xs uppercase tracking-wide mb-3">
                Recent Activity
              </h3>
              <div className="space-y-2" data-ocid="admin.list">
                {MOCK_BOOKINGS.slice(0, 5).map((b, i) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-xs font-bold">
                        {b.rider.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {b.rider}
                        </p>
                        <p className="text-xs text-white/50">
                          {b.pickup} → {b.drop}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[b.status]?.color || ""}`}
                      >
                        {statusConfig[b.status]?.label}
                      </span>
                      <p className="text-orange-400 font-bold text-sm mt-0.5">
                        ₹{b.baseFare + CONVENIENCE_FEE}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── BOOKINGS TAB ── */}
        {activeTab === "bookings" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {["all", "pending", "ongoing", "completed", "cancelled"].map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    data-ocid="admin.toggle"
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                      statusFilter === s
                        ? "bg-orange-500 text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/15"
                    }`}
                  >
                    {s}
                  </button>
                ),
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search by ID, rider, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl"
                data-ocid="admin.search_input"
              />
            </div>

            {/* Booking cards */}
            <div className="space-y-3" data-ocid="admin.list">
              {filteredBookings.length === 0 && (
                <div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center text-white/50"
                  data-ocid="admin.empty_state"
                >
                  No bookings found
                </div>
              )}
              {filteredBookings.map((b, i) => {
                const { commission, riderPays } = calcFare(b.baseFare);
                const assignedDriver = assignments[b.id] || b.driver;
                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-mono text-orange-400 font-bold text-sm">
                          #{b.id}
                        </span>
                        <span
                          className={`ml-2 text-xs px-2 py-0.5 rounded-full ${statusConfig[b.status]?.color}`}
                        >
                          {statusConfig[b.status]?.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 font-black text-lg">
                          ₹{riderPays}
                        </p>
                        <p className="text-white/40 text-xs">
                          Commission: ₹{commission}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/70 mb-3">
                      <div>
                        <span className="text-white/40">Rider</span>
                        <p className="text-white font-medium">{b.rider}</p>
                        <p className="text-white/50">{b.phone}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Vehicle</span>
                        <p className="text-white font-medium">{b.vehicle}</p>
                        <p className="text-white/50">{b.time}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-white/40">Route</span>
                        <p className="text-white font-medium truncate">
                          {b.pickup} → {b.drop}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs">
                        {assignedDriver ? (
                          <span className="text-green-400 font-medium">
                            👤 {assignedDriver}
                          </span>
                        ) : (
                          <span className="text-white/40">Unassigned</span>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setAssigningBooking(
                              assigningBooking === b.id ? null : b.id,
                            )
                          }
                          className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl"
                          data-ocid="admin.button"
                        >
                          Assign Driver <ChevronDown className="w-3 h-3" />
                        </button>
                        {assigningBooking === b.id && (
                          <div
                            className="absolute right-0 top-full mt-1 bg-slate-800 border border-white/20 rounded-xl shadow-2xl z-50 min-w-[180px]"
                            data-ocid="admin.dropdown_menu"
                          >
                            {DRIVERS_LIST.map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => {
                                  setAssignments((prev) => ({
                                    ...prev,
                                    [b.id]: d,
                                  }));
                                  setAssigningBooking(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 first:rounded-t-xl last:rounded-b-xl"
                                data-ocid="admin.button"
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-orange-400 font-semibold text-xs uppercase tracking-wide">
              All Users ({MOCK_USERS.length})
            </h2>
            <div className="space-y-3" data-ocid="admin.list">
              {MOCK_USERS.map((u, i) => (
                <motion.div
                  key={u.phone}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{u.name}</p>
                        <p className="text-white/50 text-xs">{u.phone}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        u.status === "active"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : "bg-white/10 text-white/40 border border-white/20"
                      }`}
                    >
                      {u.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-white/5 rounded-xl p-2 text-center">
                      <p className="text-white font-bold">{u.rides}</p>
                      <p className="text-white/40 text-xs">Rides</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2 text-center">
                      <p className="text-orange-400 font-bold">
                        ₹{u.spent.toLocaleString()}
                      </p>
                      <p className="text-white/40 text-xs">Spent</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2 text-center">
                      <p className="text-white/70 text-xs font-medium">
                        {u.lastActive}
                      </p>
                      <p className="text-white/40 text-xs">Last Active</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── DRIVERS TAB ── */}
        {activeTab === "drivers" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-orange-400 font-semibold text-xs uppercase tracking-wide">
              All Drivers ({MOCK_DRIVERS.length})
            </h2>
            <div className="space-y-3" data-ocid="admin.list">
              {MOCK_DRIVERS.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center font-bold text-sm">
                        {d.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{d.name}</p>
                        <p className="text-white/50 text-xs">{d.vehicle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          d.status === "online"
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-white/10 text-white/40 border border-white/20"
                        }`}
                      >
                        {d.status === "online" ? "🟢 Online" : "⚪ Offline"}
                      </span>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                        <span className="text-orange-400 font-bold text-sm">
                          {d.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-white/40 text-xs mb-1">Today</p>
                      <p className="text-green-400 font-bold">
                        ₹{d.todayEarnings.toLocaleString()}
                      </p>
                      <p className="text-white/60 text-xs">
                        {d.todayRides} rides
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-white/40 text-xs mb-1">All Time</p>
                      <p className="text-orange-400 font-bold">
                        ₹{d.totalEarnings.toLocaleString()}
                      </p>
                      <p className="text-white/60 text-xs">
                        {d.totalRides} rides
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-3 w-full py-2 rounded-xl bg-white/5 text-white/60 text-xs font-medium hover:bg-white/10 transition-colors"
                    data-ocid="admin.button"
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── EARNINGS TAB ── */}
        {activeTab === "earnings" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Platform Revenue",
                  value: `₹${totalCommission.toLocaleString()}`,
                  sub: "15% commissions",
                  color: "text-orange-400",
                },
                {
                  label: "Convenience Fees",
                  value: `₹${totalConvFees.toLocaleString()}`,
                  sub: "₹10 per ride",
                  color: "text-blue-400",
                },
                {
                  label: "Driver Payouts",
                  value: `₹${totalDriverPayouts.toLocaleString()}`,
                  sub: "85% of base fare",
                  color: "text-green-400",
                },
                {
                  label: "Pending Payouts",
                  value: "₹18,200",
                  sub: "Awaiting transfer",
                  color: "text-yellow-400",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                  data-ocid="admin.card"
                >
                  <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-white/80 text-xs font-medium mt-0.5">
                    {s.label}
                  </p>
                  <p className="text-white/40 text-xs">{s.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Revenue chart */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <h3 className="text-orange-400 font-semibold text-xs uppercase tracking-wide mb-4">
                Revenue — Last 7 Days
              </h3>
              <div className="flex items-end gap-2 h-28">
                {REVENUE_7DAYS.map((d) => (
                  <div
                    key={d.day}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-white/60 text-xs">
                      ₹{(d.amount / 1000).toFixed(0)}k
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-orange-500"
                      style={{ height: `${(d.amount / maxBar) * 80}px` }}
                    />
                    <span className="text-white/50 text-xs">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commission breakdown table */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 overflow-x-auto">
              <h3 className="text-orange-400 font-semibold text-xs uppercase tracking-wide mb-3">
                Commission Breakdown
              </h3>
              <table className="w-full text-xs min-w-[520px]">
                <thead>
                  <tr className="text-orange-400 font-semibold uppercase border-b border-white/10">
                    <th className="text-left pb-2">Booking</th>
                    <th className="text-right pb-2">Base Fare</th>
                    <th className="text-right pb-2">Commission (15%)</th>
                    <th className="text-right pb-2">Conv. Fee</th>
                    <th className="text-right pb-2">Driver Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_BOOKINGS.slice(0, 10).map((b, i) => {
                    const { commission, driverPayout } = calcFare(b.baseFare);
                    return (
                      <tr
                        key={b.id}
                        className="border-b border-white/5 last:border-0"
                        data-ocid={`admin.row.${i + 1}`}
                      >
                        <td className="py-2 font-mono text-white/70">
                          #{b.id}
                        </td>
                        <td className="py-2 text-right text-white/80">
                          ₹{b.baseFare}
                        </td>
                        <td className="py-2 text-right text-orange-400 font-bold">
                          ₹{commission}
                        </td>
                        <td className="py-2 text-right text-blue-400">
                          ₹{CONVENIENCE_FEE}
                        </td>
                        <td className="py-2 text-right text-green-400 font-bold">
                          ₹{driverPayout}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
