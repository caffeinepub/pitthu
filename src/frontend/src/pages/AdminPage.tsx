import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import {
  Car,
  CheckCircle2,
  ChevronLeft,
  Clock,
  DollarSign,
  MapPin,
  Navigation,
  Phone,
  RefreshCw,
  ShieldAlert,
  TrendingUp,
  User,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  type BookingStatus,
  type StoredBooking,
  getAllBookings,
  updateBookingStatus,
} from "../lib/bookingStorage";
import { getEarningsSummary } from "../lib/earningsStorage";

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  ongoing: "Ongoing",
  completed: "Completed",
};

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  accepted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ongoing: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const NEXT_STATUS: Partial<Record<BookingStatus, BookingStatus>> = {
  pending: "accepted",
  accepted: "ongoing",
  ongoing: "completed",
};

const ACTION_LABELS: Partial<Record<BookingStatus, string>> = {
  pending: "Accept",
  accepted: "Start Ride",
  ongoing: "Complete Ride",
};

const ACTION_COLORS: Partial<Record<BookingStatus, string>> = {
  pending: "bg-blue-600 hover:bg-blue-500",
  accepted: "bg-orange-500 hover:bg-orange-400",
  ongoing: "bg-emerald-600 hover:bg-emerald-500",
};

type FilterTab = "all" | BookingStatus;

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
];

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [activeTab, setActiveTab] = useState<"bookings" | "earnings">(
    "bookings",
  );
  // BUG H FIX: track which booking is being updated to prevent double-click
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(() => setBookings(getAllBookings()), []);

  // BUG G FIX: initial load
  useEffect(() => {
    load();
  }, [load]);

  // BUG G FIX: poll every 5 seconds for fresh data
  useEffect(() => {
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, [load]);

  // BUG G FIX: also reload when another tab/window writes to localStorage
  useEffect(() => {
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [load]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center gap-4 px-4">
        <ShieldAlert className="w-16 h-16 text-red-400" />
        <h2 className="text-2xl font-bold text-white">Access Denied</h2>
        <p className="text-slate-400 text-center">
          You don't have permission to view this page.
        </p>
        <Button
          onClick={() => navigate({ to: "/" })}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl"
        >
          Go Home
        </Button>
      </div>
    );
  }

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const counts: Record<FilterTab, number> = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    ongoing: bookings.filter((b) => b.status === "ongoing").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  // BUG H FIX: guard against double-click by tracking updating state
  const handleStatusUpdate = async (
    bookingId: string,
    current: BookingStatus,
  ) => {
    const next = NEXT_STATUS[current];
    if (!next) return;
    setUpdating(bookingId);
    updateBookingStatus(bookingId, next);
    load();
    setUpdating(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-slate-400 text-xs">
                {bookings.length} total booking
                {bookings.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={load}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        {/* Tab nav */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            data-ocid="admin.tab"
            className={`px-5 py-2 text-sm font-semibold rounded-t-lg transition-all ${activeTab === "bookings" ? "bg-blue-600 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}
          >
            Bookings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("earnings")}
            data-ocid="admin.tab"
            className={`px-5 py-2 text-sm font-semibold rounded-t-lg transition-all ${activeTab === "earnings" ? "bg-emerald-600 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}
          >
            Earnings
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {activeTab === "earnings" ? (
          <EarningsTab />
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  "pending",
                  "accepted",
                  "ongoing",
                  "completed",
                ] as BookingStatus[]
              ).map((s) => (
                <Card
                  key={s}
                  className={`border cursor-pointer transition-all ${
                    filter === s
                      ? "ring-2 ring-blue-500 border-blue-500/50"
                      : "border-white/10 hover:border-white/20"
                  } bg-white/5`}
                  onClick={() => setFilter(s)}
                >
                  <CardContent className="p-4">
                    <p className="text-slate-400 text-xs uppercase tracking-wider">
                      {STATUS_LABELS[s]}
                    </p>
                    <p className="text-white text-2xl font-bold mt-1">
                      {counts[s]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setFilter(tab.value)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filter === tab.value
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  {tab.label}
                  {counts[tab.value] > 0 && (
                    <span
                      className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                        filter === tab.value ? "bg-white/20" : "bg-white/10"
                      }`}
                    >
                      {counts[tab.value]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Bookings list */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <CheckCircle2 className="w-12 h-12 text-slate-600" />
                <p className="text-slate-400">
                  No {filter === "all" ? "" : filter} bookings yet
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((booking) => (
                  <Card
                    key={booking.bookingId}
                    className="border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        {/* Left: info */}
                        <div className="flex-1 space-y-3">
                          {/* Top row: name, status, time */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${
                                STATUS_COLORS[booking.status]
                              }`}
                            >
                              {STATUS_LABELS[booking.status]}
                            </span>
                            <span className="text-slate-400 text-xs">
                              #{booking.bookingId}
                            </span>
                          </div>

                          {/* User info */}
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <div className="flex items-center gap-1.5 text-sm text-white">
                              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{booking.userName}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-slate-300">
                              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{booking.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-slate-300">
                              <Car className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="capitalize">
                                {booking.vehicle}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-slate-300">
                              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{formatTime(booking.time)}</span>
                            </div>
                          </div>

                          {/* Route */}
                          <div className="bg-white/5 rounded-xl p-3 space-y-2">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                  Pickup
                                </p>
                                <p className="text-sm text-white">
                                  {booking.pickup}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Navigation className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                  Drop
                                </p>
                                <p className="text-sm text-white">
                                  {booking.drop}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Fare */}
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Fare</span>
                            <span className="text-white font-semibold">
                              ₹{booking.fare.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        {/* Right: action button */}
                        {NEXT_STATUS[booking.status] && (
                          <div className="flex sm:flex-col gap-2 sm:min-w-[120px]">
                            <Button
                              onClick={() =>
                                handleStatusUpdate(
                                  booking.bookingId,
                                  booking.status,
                                )
                              }
                              // BUG H FIX: disable while this booking is being updated
                              disabled={updating === booking.bookingId}
                              className={`flex-1 sm:flex-none text-white rounded-xl text-sm font-semibold ${
                                ACTION_COLORS[booking.status]
                              }`}
                            >
                              {ACTION_LABELS[booking.status]}
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EarningsTab() {
  const summary = getEarningsSummary();
  const completedBookings = getAllBookings().filter(
    (b) => b.status === "completed",
  );

  const cards = [
    {
      label: "Total Revenue",
      value: summary.totalRevenue,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Platform Commission",
      value: summary.totalCommission,
      icon: DollarSign,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Driver Payouts",
      value: summary.totalDriverEarnings,
      icon: Car,
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
    },
    {
      label: "Convenience Fees",
      value: summary.totalConvenienceFees,
      icon: CheckCircle2,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="admin.panel">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <Card key={c.label} className={`border ${c.bg} bg-white/5`}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <c.icon className={`w-4 h-4 ${c.color}`} />
                <p className="text-slate-400 text-xs">{c.label}</p>
              </div>
              <p className={`text-xl font-black ${c.color}`}>
                ₹{c.value.toLocaleString("en-IN")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <p className="text-slate-300 text-sm font-semibold">
          Completed Rides: {summary.completedRides}
        </p>
      </div>

      {/* Per-ride breakdown */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
          Per-Ride Breakdown
        </h3>
        {completedBookings.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="admin.empty_state"
          >
            <DollarSign className="w-12 h-12 text-slate-600" />
            <p className="text-slate-400">No completed rides yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedBookings.map((b, idx) => {
              const commission = b.commissionFee ?? Math.round(b.fare * 0.15);
              const convenience = b.convenienceFee ?? 10;
              const driver =
                b.driverEarnings ?? b.fare - commission - convenience;
              return (
                <Card
                  key={b.bookingId}
                  className="border border-white/10 bg-white/5"
                  data-ocid={`admin.row.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">
                            {b.userName}
                          </span>
                          <span className="text-slate-500 text-xs">
                            #{b.bookingId}
                          </span>
                        </div>
                        <div className="flex gap-3 text-xs text-slate-400">
                          <span className="capitalize">{b.vehicle}</span>
                          <span>
                            {b.pickup} → {b.drop}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-slate-400 text-xs">Fare Paid</p>
                          <p className="text-white font-bold">
                            ₹{b.fare + convenience}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-400 text-xs">Commission</p>
                          <p className="text-blue-400 font-bold">
                            ₹{commission}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-400 text-xs">Driver Gets</p>
                          <p className="text-emerald-400 font-bold">
                            ₹{driver}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
