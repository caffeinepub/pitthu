import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Car,
  CheckCircle,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  Star,
  Wallet,
  WifiOff,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import {
  type StoredBooking,
  getAllBookings,
  updateBookingStatus,
} from "../lib/bookingStorage";

type TabType = "available" | "myrides" | "completed";

export default function DriverDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  const [tab, setTab] = useState<TabType>("available");
  const [pendingBookings, setPendingBookings] = useState<StoredBooking[]>([]);
  const [activeBookings, setActiveBookings] = useState<StoredBooking[]>([]);
  const [completedBookings, setCompletedBookings] = useState<StoredBooking[]>(
    [],
  );
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());
  const [isOnline, setIsOnline] = useState(true);

  // Driver guard
  useEffect(() => {
    if (!user || (user.role !== "driver" && user.role !== "admin")) {
      navigate({ to: "/login" });
    } else {
      setAuthChecked(true);
    }
  }, [user, navigate]);

  const loadBookings = useCallback(() => {
    const all = getAllBookings();
    const pending = isOnline
      ? all.filter(
          (b) => b.status === "pending" && !rejectedIds.has(b.bookingId),
        )
      : [];
    const active = all.filter(
      (b) => b.status === "accepted" || b.status === "ongoing",
    );
    const completed = all.filter((b) => b.status === "completed");
    setPendingBookings(pending);
    setActiveBookings(active);
    setCompletedBookings(completed);
  }, [rejectedIds, isOnline]);

  // Initial load + auto-refresh every 8 seconds
  useEffect(() => {
    if (!authChecked) return;
    loadBookings();
    const interval = setInterval(loadBookings, 8000);
    return () => clearInterval(interval);
  }, [loadBookings, authChecked]);

  // Cross-tab sync
  useEffect(() => {
    if (!authChecked) return;
    window.addEventListener("storage", loadBookings);
    return () => window.removeEventListener("storage", loadBookings);
  }, [loadBookings, authChecked]);

  const handleAccept = (booking: StoredBooking) => {
    updateBookingStatus(booking.bookingId, "accepted");
    toast.success(`Ride accepted! Heading to ${booking.pickup}`);
    loadBookings();
    setTab("myrides");
  };

  const handleReject = (bookingId: string) => {
    setRejectedIds((prev) => new Set([...prev, bookingId]));
    toast.info("Ride rejected.");
  };

  const handleStartRide = (bookingId: string) => {
    updateBookingStatus(bookingId, "ongoing");
    toast.success("Ride started! Drive safely 🚗");
    loadBookings();
  };

  const handleCompleteRide = (booking: StoredBooking) => {
    updateBookingStatus(booking.bookingId, "completed");
    toast.success(
      `Ride completed! You earned ₹${Math.round(booking.fare * 0.85)} 🎉`,
    );
    loadBookings();
  };

  const todayEarnings = completedBookings.reduce(
    (sum, b) => sum + Math.round(b.fare * 0.85),
    0,
  );

  const driverName = user?.name || `Driver ${user?.phone?.slice(-4) || ""}`;
  const initials =
    driverName
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "DR";

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-white/50 text-sm">Checking access...</div>
      </div>
    );
  }

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "available", label: "Available", count: pendingBookings.length },
    { key: "myrides", label: "My Rides", count: activeBookings.length },
    { key: "completed", label: "Completed", count: completedBookings.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-10">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/">
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              data-ocid="driver_dashboard.button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold tracking-tight">
              Driver Dashboard
            </h1>
            <p className="text-white/50 text-xs">{driverName}</p>
          </div>
          <button
            type="button"
            onClick={loadBookings}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            data-ocid="driver_dashboard.button"
            aria-label="Refresh bookings"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold text-sm shrink-0">
            {initials}
          </div>
        </div>

        {/* Online / Offline toggle */}
        <div className="flex items-center justify-between mt-3 bg-white/5 rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isOnline ? "bg-green-400 animate-pulse" : "bg-gray-500"
              }`}
            />
            <Label
              htmlFor="online-toggle"
              className="text-sm font-medium cursor-pointer text-white"
            >
              {isOnline ? "Online" : "Offline"}
            </Label>
          </div>
          <Switch
            id="online-toggle"
            checked={isOnline}
            onCheckedChange={(val) => {
              setIsOnline(val);
              toast.info(val ? "You're now online" : "You're now offline");
            }}
            data-ocid="driver_dashboard.switch"
          />
        </div>
      </div>

      {/* Offline banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-800/80 border-b border-gray-600/40 overflow-hidden"
            data-ocid="driver_dashboard.error_state"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 text-gray-300 text-sm">
              <WifiOff className="w-4 h-4 text-gray-400 shrink-0" />
              <span>You're offline — new rides won't appear</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="px-4 pt-4 grid grid-cols-3 gap-3">
        {[
          {
            icon: Wallet,
            label: "Today",
            value: `₹${todayEarnings}`,
            color: "text-green-400",
          },
          {
            icon: Car,
            label: "Available",
            value: String(pendingBookings.length),
            color: "text-blue-400",
          },
          {
            icon: Star,
            label: "Rating",
            value: "4.8★",
            color: "text-orange-400",
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center"
          >
            <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-white/50 text-xs">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4 flex gap-2" data-ocid="driver_dashboard.tab">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            data-ocid={"driver_dashboard.tab"}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              tab === t.key
                ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg"
                : "bg-white/10 text-white/60 hover:bg-white/15"
            }`}
          >
            {t.label}
            <span
              className={`ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs ${
                tab === t.key ? "bg-white/20" : "bg-white/10"
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 mt-4 space-y-3">
        <AnimatePresence mode="wait">
          {tab === "available" && (
            <motion.div
              key="available"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {pendingBookings.length === 0 ? (
                <div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                  data-ocid="driver_dashboard.empty_state"
                >
                  <Car className="w-12 h-12 mx-auto mb-3 text-white/30" />
                  <p className="text-white/50">
                    {isOnline
                      ? "No available rides right now"
                      : "You're offline"}
                  </p>
                  <p className="text-white/30 text-sm mt-1">
                    {isOnline
                      ? "New bookings will appear here"
                      : "Go online to see new bookings"}
                  </p>
                </div>
              ) : (
                pendingBookings.map((booking, idx) => (
                  <motion.div
                    key={booking.bookingId}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                    data-ocid={`driver_dashboard.item.${idx + 1}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-sm">
                          {booking.userName}
                        </p>
                        <p className="text-white/50 text-xs">{booking.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold text-lg">
                          ₹{booking.fare}
                        </p>
                        <p className="text-white/40 text-xs capitalize">
                          {booking.vehicle}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                        <span className="text-white/80 truncate">
                          {booking.pickup}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                        <span className="text-white/80 truncate">
                          {booking.drop}
                        </span>
                      </div>
                    </div>

                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs mb-3">
                      {booking.vehicle}
                    </Badge>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleReject(booking.bookingId)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-red-400/40 text-red-400 hover:bg-red-500/10 rounded-xl"
                        data-ocid={`driver_dashboard.delete_button.${idx + 1}`}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                      <Button
                        onClick={() => handleAccept(booking)}
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-xl"
                        data-ocid={`driver_dashboard.primary_button.${idx + 1}`}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Accept
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {tab === "myrides" && (
            <motion.div
              key="myrides"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {activeBookings.length === 0 ? (
                <div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                  data-ocid="driver_dashboard.empty_state"
                >
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-white/30" />
                  <p className="text-white/50">No active rides</p>
                  <p className="text-white/30 text-sm mt-1">
                    Accept a ride to see it here
                  </p>
                </div>
              ) : (
                activeBookings.map((booking, idx) => (
                  <motion.div
                    key={booking.bookingId}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                    data-ocid={`driver_dashboard.card.${idx + 1}`}
                  >
                    {/* Status badge */}
                    <div className="flex justify-center">
                      <Badge
                        className={`text-sm px-4 py-1.5 ${
                          booking.status === "ongoing"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-orange-500/20 text-orange-300 border-orange-500/30"
                        }`}
                      >
                        {booking.status === "ongoing"
                          ? "🚗 Ride In Progress"
                          : "⏳ Heading to Pickup"}
                      </Badge>
                    </div>

                    {/* Rider info */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-bold text-base">
                            {booking.userName}
                          </p>
                          <p className="text-white/50 text-xs capitalize">
                            {booking.vehicle}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            window.location.href = `tel:${booking.phone}`;
                          }}
                          className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center"
                          data-ocid={`driver_dashboard.button.${idx + 1}`}
                          aria-label={`Call ${booking.userName}`}
                        >
                          <MapPin className="w-4 h-4 text-green-400" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
                          <span className="text-white/80">
                            {booking.pickup}
                          </span>
                        </div>
                        <div className="ml-[5px] h-4 border-l border-dashed border-white/20" />
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" />
                          <span className="text-white/80">{booking.drop}</span>
                        </div>
                      </div>
                    </div>

                    {/* Fare Breakdown */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2">
                      <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-2">
                        Fare Breakdown
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Rider Pays</span>
                        <span className="text-white font-medium">
                          ₹{booking.fare + 10}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">
                          Platform Fee (15%)
                        </span>
                        <span className="text-orange-400 text-xs">
                          -₹{Math.round(booking.fare * 0.15)}
                        </span>
                      </div>
                      <div className="border-t border-white/20 pt-2 flex justify-between items-center">
                        <span className="text-green-300 font-bold">
                          Your Earning
                        </span>
                        <span className="text-green-400 font-black text-xl">
                          ₹{Math.round(booking.fare * 0.85)}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    {booking.status === "accepted" && (
                      <Button
                        onClick={() => handleStartRide(booking.bookingId)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-2xl py-4 h-auto"
                        data-ocid={`driver_dashboard.primary_button.${idx + 1}`}
                      >
                        🚗 Start Ride
                      </Button>
                    )}

                    {booking.status === "ongoing" && (
                      <Button
                        onClick={() => handleCompleteRide(booking)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl py-4 h-auto"
                        data-ocid={`driver_dashboard.primary_button.${idx + 1}`}
                      >
                        ✅ Complete Ride
                      </Button>
                    )}

                    {/* SOS */}
                    <button
                      type="button"
                      onClick={() =>
                        toast.error("🚨 SOS alert sent to emergency contacts!")
                      }
                      className="w-full bg-red-600/20 border border-red-500/40 text-red-400 font-bold rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-red-600/30 transition-colors"
                      data-ocid={`driver_dashboard.button.${idx + 1}`}
                    >
                      <AlertTriangle className="w-5 h-5" /> SOS Emergency
                    </button>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {tab === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              {completedBookings.length === 0 ? (
                <div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                  data-ocid="driver_dashboard.empty_state"
                >
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-white/30" />
                  <p className="text-white/50">No completed rides yet</p>
                  <p className="text-white/30 text-sm mt-1">
                    Finished rides will appear here
                  </p>
                </div>
              ) : (
                <>
                  {/* Earnings summary */}
                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/20 border border-green-500/30 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-green-300 text-xs font-semibold uppercase tracking-wide">
                        Total Earned
                      </p>
                      <p className="text-green-400 font-black text-2xl">
                        ₹{todayEarnings}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-xs">
                        {completedBookings.length} rides
                      </p>
                      <Wallet className="w-8 h-8 text-green-400/50 mt-1 ml-auto" />
                    </div>
                  </div>

                  {completedBookings.map((booking, idx) => (
                    <motion.div
                      key={booking.bookingId}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                      data-ocid={`driver_dashboard.item.${idx + 1}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {booking.userName}
                            </p>
                            <p className="text-white/40 text-xs capitalize">
                              {booking.vehicle}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-base">
                            ₹{Math.round(booking.fare * 0.85)}
                          </p>
                          <p className="text-white/30 text-xs">earned</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-white/50 mt-2">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {booking.pickup} → {booking.drop}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-white/30 mt-1">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>
                          {new Date(booking.time).toLocaleString("en-IN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
