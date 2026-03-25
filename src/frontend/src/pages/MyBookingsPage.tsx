import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  Car,
  LogIn,
  MapPin,
  Navigation,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { type StoredBooking, getAllBookings } from "../lib/bookingStorage";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  accepted: "bg-blue-100 text-blue-800 border-blue-200",
  ongoing: "bg-orange-100 text-orange-800 border-orange-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

function BookingCard({
  booking,
  index,
}: { booking: StoredBooking; index: number }) {
  const date = new Date(booking.time).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      data-ocid={`bookings.item.${index + 1}`}
    >
      <Card className="shadow-card">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-montserrat font-bold text-foreground capitalize">
                    {booking.vehicle} Ride
                  </h3>
                  <Badge
                    className={`text-xs border ${statusColors[booking.status] || ""}`}
                    variant="outline"
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {booking.pickup} → {booking.drop}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs text-muted-foreground/70">
                      ID: {booking.bookingId}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{date}</span>
                  </div>
                  <span className="font-montserrat font-bold text-primary text-sm">
                    ₹{booking.fare}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {(booking.status === "pending" ||
                booking.status === "accepted" ||
                booking.status === "ongoing") && (
                <Link
                  to="/booking-status"
                  search={{ bookingId: booking.bookingId }}
                >
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground font-montserrat font-bold uppercase text-xs rounded-full w-full"
                    data-ocid={`bookings.button.${index + 1}`}
                  >
                    <Navigation className="w-3 h-3 mr-1" /> Track
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<StoredBooking[]>([]);

  useEffect(() => {
    if (!user) return;
    const all = getAllBookings();
    // BUG K NOTE: Guest bookings (userId="guest", phone="N/A") can't be retroactively
    // linked to an account after login — this is an inherent data limitation.
    // Only bookings made while logged in (matching phone or userId) are shown.
    const filtered = all.filter(
      (b) => b.phone === `+91${user.phone}` || b.userId === user.phone,
    );
    setBookings(filtered);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl p-12 text-center shadow-card max-w-md w-full"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-montserrat font-black uppercase text-2xl text-foreground mb-2">
            Sign In Required
          </h2>
          <p className="text-muted-foreground mb-8">
            Please sign in to view your bookings.
          </p>
          <Link to="/login">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-bold uppercase tracking-wider rounded-full w-full"
              data-ocid="bookings.primary_button"
            >
              Sign In
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary font-montserrat font-bold uppercase tracking-[0.2em] text-xs">
                PITTHU
              </p>
              <h1 className="font-montserrat font-black uppercase text-2xl text-foreground">
                My Bookings
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            View and track your ride bookings
          </p>
        </motion.div>

        {bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
            data-ocid="bookings.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-montserrat font-bold uppercase text-xl text-foreground mb-2">
              No Bookings Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              You haven't made any bookings yet. Start your mountain journey
              today!
            </p>
            {/* BUG K: Note about guest bookings not being linked */}
            <p className="text-muted-foreground/60 text-sm mb-8 italic">
              Bookings made as a guest are not linked to your account.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/book-ride">
                <Button
                  className="bg-primary text-primary-foreground rounded-full font-montserrat font-bold uppercase"
                  data-ocid="bookings.primary_button"
                >
                  Book a Ride
                </Button>
              </Link>
              <Link to="/drone-delivery">
                <Button
                  variant="outline"
                  className="rounded-full font-montserrat font-bold uppercase"
                  data-ocid="bookings.secondary_button"
                >
                  Drone Delivery
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking, i) => (
              <BookingCard
                key={booking.bookingId}
                booking={booking}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
