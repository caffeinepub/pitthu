import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Car,
  CheckCircle,
  MapPin,
  Phone,
  Star,
  Wallet,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface BookingItem {
  id: string;
  rider: string;
  phone: string;
  pickup: string;
  drop: string;
  vehicle: string;
  fare: number;
  distance: string;
  eta: string;
}

const MOCK_BOOKINGS: BookingItem[] = [
  {
    id: "BK001",
    rider: "Rahul Sharma",
    phone: "9876543210",
    pickup: "Rishikesh Bus Stand",
    drop: "Haridwar Railway Station",
    vehicle: "Sedan",
    fare: 380,
    distance: "24 km",
    eta: "8 min away",
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
    eta: "12 min away",
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
    eta: "5 min away",
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
    eta: "18 min away",
  },
];

type RideStatus = "accepted" | "ongoing" | "completed";

interface ActiveRide extends BookingItem {
  status: RideStatus;
}

export default function DriverDashboardPage() {
  const [tab, setTab] = useState<"available" | "active">("available");
  const [bookings, setBookings] = useState<BookingItem[]>(MOCK_BOOKINGS);
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);

  const handleAccept = (booking: BookingItem) => {
    setActiveRide({ ...booking, status: "accepted" });
    setBookings((prev) => prev.filter((b) => b.id !== booking.id));
    setTab("active");
    toast.success(`Ride accepted! Heading to ${booking.pickup}`);
  };

  const handleReject = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    toast.info("Ride rejected.");
  };

  const handleStartRide = () => {
    if (!activeRide) return;
    setActiveRide({ ...activeRide, status: "ongoing" });
    toast.success("Ride started! Drive safely 🚗");
  };

  const handleCompleteRide = () => {
    if (!activeRide) return;
    setActiveRide({ ...activeRide, status: "completed" });
    toast.success(`Ride completed! You earned ₹${activeRide.fare} 🎉`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-10">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4 flex items-center gap-3">
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
          <h1 className="text-lg font-bold tracking-tight">Driver Dashboard</h1>
          <p className="text-white/50 text-xs">Rajan Bisht</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center font-bold text-sm">
          RB
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pt-4 grid grid-cols-3 gap-3">
        {[
          {
            icon: Wallet,
            label: "Today (After 15% fee)",
            value: "₹1,054",
            color: "text-green-400",
          },
          { icon: Car, label: "Rides", value: "8", color: "text-blue-400" },
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
      <div className="px-4 mt-4 flex gap-2">
        {(["available", "active"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            data-ocid="driver_dashboard.tab"
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === t
                ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg"
                : "bg-white/10 text-white/60 hover:bg-white/15"
            }`}
          >
            {t === "available"
              ? `Available Rides (${bookings.length})`
              : "Active Ride"}
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
              {bookings.length === 0 ? (
                <div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                  data-ocid="driver_dashboard.empty_state"
                >
                  <Car className="w-12 h-12 mx-auto mb-3 text-white/30" />
                  <p className="text-white/50">No available rides right now</p>
                  <p className="text-white/30 text-sm mt-1">
                    New bookings will appear here
                  </p>
                </div>
              ) : (
                bookings.map((booking, idx) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                    data-ocid={`driver_dashboard.item.${idx + 1}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-sm">{booking.rider}</p>
                        <p className="text-white/50 text-xs">{booking.eta}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold text-lg">
                          ₹{booking.fare}
                        </p>
                        <p className="text-white/40 text-xs">
                          {booking.distance}
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
                        onClick={() => handleReject(booking.id)}
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

          {tab === "active" && (
            <motion.div
              key="active"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {!activeRide ? (
                <div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                  data-ocid="driver_dashboard.empty_state"
                >
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-white/30" />
                  <p className="text-white/50">No active ride</p>
                  <p className="text-white/30 text-sm mt-1">
                    Accept a ride to see it here
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                  data-ocid="driver_dashboard.card"
                >
                  {/* Status badge */}
                  <div className="flex justify-center">
                    <Badge
                      className={`text-sm px-4 py-1.5 ${
                        activeRide.status === "completed"
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : activeRide.status === "ongoing"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-orange-500/20 text-orange-300 border-orange-500/30"
                      }`}
                    >
                      {activeRide.status === "completed"
                        ? "✅ Ride Completed"
                        : activeRide.status === "ongoing"
                          ? "🚗 Ride In Progress"
                          : "⏳ Heading to Pickup"}
                    </Badge>
                  </div>

                  {/* Rider info */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-base">
                          {activeRide.rider}
                        </p>
                        <p className="text-white/50 text-xs">
                          {activeRide.vehicle}
                        </p>
                      </div>
                      <a href={`tel:+91${activeRide.phone}`}>
                        <button
                          type="button"
                          className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center"
                          data-ocid="driver_dashboard.button"
                        >
                          <Phone className="w-4 h-4 text-green-400" />
                        </button>
                      </a>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
                        <span className="text-white/80">
                          {activeRide.pickup}
                        </span>
                      </div>
                      <div className="ml-[5px] h-4 border-l border-dashed border-white/20" />
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" />
                        <span className="text-white/80">{activeRide.drop}</span>
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
                        ₹{activeRide.fare + 10}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Platform Fee (15%)</span>
                      <span className="text-orange-400 text-xs">
                        -₹{Math.round(activeRide.fare * 0.15)}
                      </span>
                    </div>
                    <div className="border-t border-white/20 pt-2 flex justify-between items-center">
                      <span className="text-green-300 font-bold">
                        Your Earning
                      </span>
                      <span className="text-green-400 font-black text-xl">
                        ₹{Math.round(activeRide.fare * 0.85)}
                      </span>
                    </div>
                    <p className="text-white/30 text-xs">
                      After 15% platform fee deducted
                    </p>
                  </div>

                  {/* Action buttons */}
                  {activeRide.status === "accepted" && (
                    <Button
                      onClick={handleStartRide}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-2xl py-4 h-auto"
                      data-ocid="driver_dashboard.primary_button"
                    >
                      🚗 Start Ride
                    </Button>
                  )}

                  {activeRide.status === "ongoing" && (
                    <Button
                      onClick={handleCompleteRide}
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-2xl py-4 h-auto"
                      data-ocid="driver_dashboard.primary_button"
                    >
                      ✅ Complete Ride
                    </Button>
                  )}

                  {activeRide.status === "completed" && (
                    <div
                      className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center"
                      data-ocid="driver_dashboard.success_state"
                    >
                      <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                      <p className="font-bold text-green-300">
                        Ride Completed!
                      </p>
                      <p className="text-white/50 text-sm mt-1">
                        Earnings added to your wallet
                      </p>
                    </div>
                  )}

                  {/* SOS */}
                  <button
                    type="button"
                    onClick={() =>
                      toast.error("🚨 SOS alert sent to emergency contacts!")
                    }
                    className="w-full bg-red-600/20 border border-red-500/40 text-red-400 font-bold rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-red-600/30 transition-colors"
                    data-ocid="driver_dashboard.button"
                  >
                    <AlertTriangle className="w-5 h-5" /> SOS Emergency
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
