import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  Navigation,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { type StoredBooking, getAllBookings } from "../lib/bookingStorage";

const STATUS_STEPS = [
  { key: "pending", label: "Pending", icon: Clock, desc: "Waiting for driver" },
  { key: "accepted", label: "Accepted", icon: Car, desc: "Driver on the way" },
  {
    key: "ongoing",
    label: "Ongoing",
    icon: Navigation,
    desc: "Ride in progress",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    desc: "Arrived safely",
  },
] as const;

const STATUS_ORDER = ["pending", "accepted", "ongoing", "completed"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  accepted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  ongoing: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  completed: "bg-green-500/20 text-green-300 border-green-500/30",
};

export default function BookingStatusPage() {
  const { bookingId } = useSearch({ from: "/booking-status" });
  // BUG B FIX: redirect if no bookingId
  const navigate = useNavigate();
  const [booking, setBooking] = useState<StoredBooking | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      navigate({ to: "/my-bookings" });
    }
  }, [bookingId, navigate]);

  useEffect(() => {
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
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, [bookingId]);

  const currentStepIndex = booking ? STATUS_ORDER.indexOf(booking.status) : -1;

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Circle className="w-10 h-10 text-white/30" />
          </div>
          <h2 className="text-xl font-bold mb-2">Booking Not Found</h2>
          <p className="text-white/50 mb-6">
            We couldn't find booking{" "}
            <span className="font-mono text-white/80">{bookingId}</span>
          </p>
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-white/50 text-sm animate-pulse">Loading...</div>
      </div>
    );
  }

  const date = new Date(booking.time).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white pb-12">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4 flex items-center gap-3">
        <Link to="/my-bookings">
          <button
            type="button"
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            data-ocid="booking_status.button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold tracking-tight">Booking Status</h1>
          <p className="text-white/50 text-xs font-mono">{booking.bookingId}</p>
        </div>
        <Badge
          className={`text-xs capitalize ${statusColors[booking.status] || ""}`}
        >
          {booking.status}
        </Badge>
      </div>

      <div className="px-4 pt-6 space-y-4 max-w-md mx-auto">
        {/* Route Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
          data-ocid="booking_status.card"
        >
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">
            Route
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">Pickup</p>
                <p className="font-semibold">{booking.pickup}</p>
              </div>
            </div>
            <div className="ml-4 h-4 border-l-2 border-dashed border-white/20" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-white/40">Drop-off</p>
                <p className="font-semibold">{booking.drop}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-white/40 text-xs mb-1">Vehicle</p>
              <p className="font-bold capitalize text-sm">{booking.vehicle}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Fare</p>
              <p className="font-bold text-green-400 text-sm">
                ₹{booking.fare}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Rider</p>
              <p className="font-bold text-sm truncate">{booking.userName}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
            <p className="text-white/40 text-xs">{date}</p>
            {booking.paymentStatus === "paid" ? (
              <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                ✓ Payment Received
              </span>
            ) : (
              <a
                href={`/payment?bookingId=${booking.bookingId}&fare=${booking.fare}`}
                className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full px-2.5 py-0.5 text-xs font-semibold hover:bg-amber-500/30 transition-colors"
                data-ocid="booking_status.secondary_button"
              >
                ⏳ Pay Now
              </a>
            )}
          </div>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
          data-ocid="booking_status.panel"
        >
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-5">
            Live Status
          </p>
          <div className="space-y-0">
            {STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isFuture = idx > currentStepIndex;
              const Icon = step.icon;
              const isLast = idx === STATUS_STEPS.length - 1;

              return (
                <div key={step.key}>
                  <div className="flex items-center gap-4">
                    {/* Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "bg-orange-500 text-white ring-4 ring-orange-500/30"
                            : "bg-white/10 text-white/30"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon
                          className={`w-5 h-5 ${isFuture ? "opacity-40" : ""}`}
                        />
                      )}
                    </div>
                    {/* Label */}
                    <div className="flex-1">
                      <p
                        className={`font-semibold text-sm ${
                          isCompleted
                            ? "text-green-300"
                            : isCurrent
                              ? "text-orange-300"
                              : "text-white/30"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p
                        className={`text-xs ${
                          isCompleted
                            ? "text-green-300/60"
                            : isCurrent
                              ? "text-orange-300/70"
                              : "text-white/20"
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                    {isCurrent && (
                      <div className="flex gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    )}
                  </div>
                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className={`ml-5 h-6 w-0.5 ${
                        idx < currentStepIndex ? "bg-green-500" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Live update note */}
        <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
          <Zap className="w-3 h-3" />
          <span>Status updates automatically every 3 seconds</span>
        </div>

        <Link to="/my-bookings">
          <Button
            variant="outline"
            className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl"
            data-ocid="booking_status.secondary_button"
          >
            View All Bookings
          </Button>
        </Link>
      </div>
    </div>
  );
}
